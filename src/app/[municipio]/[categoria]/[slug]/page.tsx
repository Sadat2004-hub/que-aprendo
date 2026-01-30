import { COURSES, CATEGORIES } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import WhatsAppButton from '@/components/WhatsAppButton';
import CourseCard from '@/components/CourseCard';
import Link from 'next/link';

interface Props {
    params: Promise<{ municipio: string; categoria: string; slug: string }>;
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { municipio, categoria, slug } = await params;
    const course = COURSES.find(c => c.slug === slug);

    if (!course) return { title: 'Curso no encontrado' };

    const title = `${course.title} en ${course.municipio.charAt(0).toUpperCase() + course.municipio.slice(1)} | ${course.category.charAt(0).toUpperCase() + course.category.slice(1)} - queaprendo`;
    const description = `${course.description.substring(0, 120)}. Aprende ${course.title} en ${course.municipio}. Encuentra horarios, precios y contacta directamente al profesor en queaprendo.com.`.substring(0, 160);

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [course.image],
        },
    };
}

export default async function CourseDetailPage({ params }: Props) {
    const { municipio, categoria, slug } = await params;
    const course = COURSES.find(c => c.slug === slug);

    if (!course) {
        notFound();
    }

    // Structured Data (JSON-LD)
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": course.title,
        "description": course.description,
        "provider": {
            "@type": "EducationalOrganization",
            "name": course.instructor,
            "url": `https://queaprendo.com/${municipio}/${categoria}/${slug}`
        },
        "offers": {
            "@type": "Offer",
            "price": course.price,
            "priceCurrency": course.currency,
            "availability": "https://schema.org/InStock"
        },
        "hasCourseInstance": {
            "@type": "CourseInstance",
            "courseMode": course.modality,
            "location": {
                "@type": "Place",
                "name": course.location,
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": course.municipio,
                    "addressRegion": "Oaxaca",
                    "addressCountry": "MX"
                }
            }
        }
    };

    const relatedCourses = COURSES.filter(c => c.category === course.category && c.id !== course.id).slice(0, 3);

    return (
        <div style={styles.container}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="container">
                <nav style={styles.breadcrumb}>
                    <Link href="/">Inicio</Link> /
                    <Link href={`/${municipio}`}> {municipio} </Link> /
                    <Link href={`/${municipio}/${categoria}`}> {categoria} </Link> /
                    <span> {course.title} </span>
                </nav>

                <div style={styles.contentGrid}>
                    <div style={styles.mainContent}>
                        <div style={styles.imageWrapper}>
                            <img src={course.image} alt={course.title} style={styles.mainImage} />
                        </div>

                        <div style={styles.headerInfo}>
                            <h1 style={styles.title}>{course.title}</h1>
                            <p style={styles.instructor}>Por <strong>{course.instructor}</strong></p>
                        </div>

                        <div style={styles.details}>
                            <h2 style={styles.sectionTitle}>Descripción del curso</h2>
                            <p style={styles.description}>{course.description}</p>

                            <div style={styles.infoBoard}>
                                <div style={styles.infoItem}>
                                    <strong>Duración:</strong> {course.duration}
                                </div>
                                <div style={styles.infoItem}>
                                    <strong>Modalidad:</strong> {course.modality.toUpperCase()}
                                </div>
                                <div style={styles.infoItem}>
                                    <strong>Ubicación:</strong> {course.location}
                                </div>
                            </div>

                            <h2 style={styles.sectionTitle}>Ubicación</h2>
                            <div style={styles.mapPlaceholder}>
                                <p>Google Maps: {course.location}</p>
                                <div style={{ width: '100%', height: '300px', backgroundColor: '#eee', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', borderRadius: '8px' }}>
                                    <span style={{ color: '#888' }}>[Mapa Interactivo de {course.location}]</span>
                                </div>
                            </div>

                            <h2 style={styles.sectionTitle}>Reseñas</h2>
                            <div style={styles.reviewsList}>
                                {course.reviews.length > 0 ? (
                                    course.reviews.map(r => (
                                        <div key={r.id} style={styles.reviewCard}>
                                            <div style={styles.reviewHeader}>
                                                <strong>{r.userName}</strong>
                                                <span>{"⭐️".repeat(r.rating)}</span>
                                            </div>
                                            <p>{r.comment}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p style={{ color: '#888' }}>Aún no hay reseñas. ¡Sé el primero en comentar!</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <aside style={styles.sidebar}>
                        <div style={styles.priceCard}>
                            <div style={styles.priceHeader}>
                                <span style={styles.price}>${course.price.toLocaleString()}</span>
                                <span style={styles.currency}>{course.currency}</span>
                            </div>
                            <a
                                href={`https://wa.me/526563230397?text=Hola,%20me%20interesa%20inscribirme%20al%20curso%20${encodeURIComponent(course.title)}`}
                                className="btn btn-secondary"
                                style={styles.buyBtn}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Inscribirse ahora
                            </a>
                            <p style={styles.guarantee}>Garantía de satisfacción queaprendo</p>
                        </div>

                        <div style={styles.related}>
                            <h3 style={{ marginBottom: '15px' }}>Cursos similares</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                {relatedCourses.map(c => (
                                    <CourseCard key={c.id} course={c} />
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            <WhatsAppButton message={`Hola, me interesa el curso "${course.title}". ¿Me podrían dar más informes?`} />
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        padding: '40px 0 80px',
    },
    breadcrumb: {
        marginBottom: '30px',
        fontSize: '0.9rem',
        color: 'var(--muted)',
    },
    contentGrid: {
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 2fr) 1fr',
        gap: '40px',
    },
    mainContent: {},
    imageWrapper: {
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        marginBottom: '30px',
        boxShadow: 'var(--shadow-md)',
    },
    mainImage: {
        width: '100%',
        height: '400px',
        objectFit: 'cover',
    },
    headerInfo: {
        marginBottom: '30px',
    },
    title: {
        fontSize: '2.5rem',
        marginBottom: '10px',
        lineHeight: '1.2',
    },
    instructor: {
        fontSize: '1.2rem',
        color: 'var(--muted)',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
    },
    sectionTitle: {
        fontSize: '1.5rem',
        borderBottom: '2px solid var(--secondary)',
        paddingBottom: '10px',
        display: 'inline-block',
        marginBottom: '10px',
    },
    description: {
        fontSize: '1.1rem',
        lineHeight: '1.6',
    },
    infoBoard: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        padding: '25px',
        backgroundColor: 'var(--white)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border)',
    },
    infoItem: {
        fontSize: '1rem',
    },
    reviewsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    reviewCard: {
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        border: '1px solid #eee',
    },
    reviewHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px',
    },
    sidebar: {
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
    },
    priceCard: {
        padding: '30px',
        backgroundColor: 'var(--white)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)',
        position: 'sticky',
        top: '100px',
        textAlign: 'center',
    },
    priceHeader: {
        marginBottom: '20px',
    },
    price: {
        fontSize: '2.5rem',
        fontWeight: 800,
        color: 'var(--primary)',
    },
    currency: {
        fontSize: '1rem',
        color: 'var(--muted)',
        marginLeft: '5px',
    },
    buyBtn: {
        width: '100%',
        padding: '18px',
        fontSize: '1.1rem',
        marginBottom: '15px',
        display: 'block',
        textAlign: 'center',
    },
    guarantee: {
        fontSize: '0.8rem',
        color: 'var(--muted)',
    },
    related: {
        marginTop: '40px',
    }
};
