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

    const relatedCourses = COURSES.filter(c => c.category === course.category && c.id !== course.id).slice(0, 3);


    return (
        <div style={styles.pageContainer}>
            <div className="container">
                <nav style={styles.breadcrumb}>
                    <Link href="/">Inicio</Link> /
                    <Link href={`/${municipio}`}> {municipio} </Link> /
                    <Link href={`/${municipio}/${categoria}`}> {categoria} </Link> /
                    <span> {course.title} </span>
                </nav>

                <div className="detail-grid">
                    {/* Main Content Area */}
                    <div className="detail-main">
                        <div style={styles.imageWrapper}>
                            <img src={course.image} alt={course.title} style={styles.mainImage} />
                        </div>

                        <div style={styles.headerInfo}>
                            <h1 style={styles.title}>{course.title}</h1>
                            <p style={styles.instructor}>Por <strong>{course.instructor}</strong></p>
                        </div>

                        {/* Price/Action - ONLY VISIBLE ON MOBILE IN THIS POSITION */}
                        <div className="show-mobile" style={{ marginBottom: '30px' }}>
                            <PriceAction course={course} />
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
                                <div style={{ width: '100%', height: '300px', backgroundColor: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', border: '1px solid var(--border)' }}>
                                    <span style={{ color: '#888' }}>[Mapa de {course.location}]</span>
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

                    {/* Sidebar Area - HIDDEN ON MOBILE */}
                    <aside className="detail-sidebar hide-mobile">
                        <div style={styles.stickySidebar}>
                            <PriceAction course={course} />

                            <div style={styles.relatedSection}>
                                <h3 style={{ marginBottom: '20px' }}>Talleres recomendados</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    {relatedCourses.map(c => (
                                        <CourseCard key={c.id} course={c} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Related Section for Mobile (stacks below everything) */}
                    <div className="show-mobile" style={{ marginTop: '60px' }}>
                        <h2 style={styles.sectionTitle}>Más talleres en {municipio}</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px', marginTop: '24px' }}>
                            {relatedCourses.map(c => (
                                <CourseCard key={c.id} course={c} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <WhatsAppButton message={`Hola, me interesa el curso "${course.title}". ¿Me podrían dar más informes?`} />
        </div>
    );
}

function PriceAction({ course }: { course: any }) {
    return (
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
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    pageContainer: {
        padding: '40px 0 100px',
    },
    breadcrumb: {
        marginBottom: '30px',
        fontSize: '0.9rem',
        color: 'var(--muted)',
    },
    imageWrapper: {
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        marginBottom: '30px',
        boxShadow: 'var(--shadow-md)',
        backgroundColor: '#fff',
    },
    mainImage: {
        width: '100%',
        height: 'auto',
        maxHeight: '450px',
        display: 'block',
        objectFit: 'cover',
    },
    headerInfo: {
        marginBottom: '30px',
    },
    title: {
        fontSize: '2.5rem',
        marginBottom: '10px',
        lineHeight: '1.2',
        color: 'var(--foreground)',
    },
    instructor: {
        fontSize: '1.2rem',
        color: 'var(--muted)',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
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
        lineHeight: '1.7',
        color: '#333',
    },
    infoBoard: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '20px',
        padding: '30px',
        backgroundColor: 'var(--white)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-sm)',
    },
    infoItem: {
        fontSize: '1rem',
    },
    reviewsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    reviewCard: {
        padding: '24px',
        backgroundColor: '#fff',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border)',
    },
    reviewHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '12px',
    },
    stickySidebar: {
        position: 'sticky',
        top: '100px',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
    },
    priceCard: {
        padding: '35px',
        backgroundColor: 'var(--white)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)',
        textAlign: 'center',
        border: '1px solid var(--border)',
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
    },
    guarantee: {
        fontSize: '0.8rem',
        color: 'var(--muted)',
    },
    relatedSection: {
        marginTop: '20px',
    }
};
