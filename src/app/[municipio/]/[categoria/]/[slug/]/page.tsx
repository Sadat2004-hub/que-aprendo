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

    return {
        title: `${course.title} | queaprendo`,
        description: course.description.substring(0, 160),
        openGraph: {
            images: [course.image],
        },
    };
}

export default async function CourseDetailPage({ params }: Props) {
    const { municipio, categoria, slug } = await params;
    const course = COURSES.find(c => c.slug === slug);

    if (!course) notFound();

    const related = COURSES.filter(c => c.category === course.category && c.id !== course.id).slice(0, 3);

    return (
        <div style={styles.page}>
            {/* Dynamic Hero Section */}
            <section style={styles.hero}>
                <div className="container" style={styles.heroGrid}>
                    <div style={styles.heroContent} className="animate-up">
                        <span className="badge-tech" style={{ marginBottom: '16px', display: 'inline-block' }}>
                            {course.category} • {course.modality}
                        </span>
                        <h1 style={styles.title}>{course.title}</h1>
                        <div style={styles.heroMeta}>
                            <div style={styles.instructorInfo}>
                                <div style={styles.avatar}>
                                    {course.instructor.charAt(0)}
                                </div>
                                <span>Impartido por <strong>{course.instructor}</strong></span>
                            </div>
                            <div style={styles.rating}>
                                <span style={{ color: '#F59E0B' }}>★</span> 4.9 (42 reseñas)
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container">
                <div className="detail-grid">
                    {/* Main Content Area */}
                    <div style={styles.main}>
                        <div style={styles.imageBox}>
                            <img src={course.image} alt={course.title} style={styles.mainImage} />
                        </div>

                        <div style={styles.section} className="glass-card" style={{ padding: '40px', borderRadius: '24px', backgroundColor: 'white' }}>
                            <h2 style={styles.sectionTitle}>Sobre este curso</h2>
                            <p style={styles.descriptionText}>{course.description}</p>

                            <div style={styles.highlightsGrid}>
                                <div style={styles.highlight}>
                                    <span style={styles.hIcon}>🕒</span>
                                    <div>
                                        <strong>Duración</strong>
                                        <p>{course.duration}</p>
                                    </div>
                                </div>
                                <div style={styles.highlight}>
                                    <span style={styles.hIcon}>📍</span>
                                    <div>
                                        <strong>Ubicación</strong>
                                        <p>{course.location}</p>
                                    </div>
                                </div>
                                <div style={styles.highlight}>
                                    <span style={styles.hIcon}>🎯</span>
                                    <div>
                                        <strong>Nivel</strong>
                                        <p>Todos los niveles</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={styles.section}>
                            <h2 style={styles.sectionTitle}>Preguntas frecuentes</h2>
                            <div style={styles.faq}>
                                {[
                                    { q: "¿Necesito conocimientos previos?", a: "No, este curso está diseñado para comenzar desde cero." },
                                    { q: "¿Se entrega certificación?", a: "Sí, al finalizar recibirás una constancia de participación." }
                                ].map((item, i) => (
                                    <div key={i} style={styles.faqItem}>
                                        <strong style={{ display: 'block', marginBottom: '8px' }}>{item.q}</strong>
                                        <p style={{ color: 'var(--text-muted)' }}>{item.a}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Area - The "Floating" Price Card */}
                    <aside style={styles.sidebar}>
                        <div style={styles.stickyContainer}>
                            <div style={styles.priceCard} className="glass-card">
                                <div style={styles.priceHeader}>
                                    <div style={styles.priceTag}>
                                        <span style={styles.priceValue}>${course.price.toLocaleString()}</span>
                                        <span style={styles.currency}>{course.currency}</span>
                                    </div>
                                    <span style={styles.offerBadge}>Inscripción abierta</span>
                                </div>

                                <div style={styles.actionGroup}>
                                    <a
                                        href={`https://wa.me/526563230397?text=Hola,%20me%20interesa%20inscribirme%20al%20curso%20${encodeURIComponent(course.title)}`}
                                        className="btn btn-primary"
                                        style={styles.mainBtn}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Inscribirse ahora
                                    </a>
                                    <p style={styles.trustNote}>Pagos seguros y contacto directo</p>
                                </div>

                                <div style={styles.includes}>
                                    <h4 style={{ fontSize: '0.9rem', marginBottom: '16px' }}>Este curso incluye:</h4>
                                    <ul style={styles.featureList}>
                                        <li>✓ Material de estudio</li>
                                        <li>✓ Constancia digital</li>
                                        <li>✓ Acceso a comunidad</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Related/Sidebar Promo */}
                            <div style={styles.sidebarPromo}>
                                <h3>¿Eres una escuela?</h3>
                                <p>Publica tus cursos y llega a más estudiantes.</p>
                                <Link href="/unirse" style={{ fontWeight: 700, color: 'var(--primary)' }}>Saber más →</Link>
                            </div>
                        </div>
                    </aside>
                </div>

                {/* Related Section at Bottom */}
                <section style={styles.relatedSection}>
                    <h2 style={styles.sectionTitle}>Cursos similares que podrían interesarte</h2>
                    <div style={styles.relatedGrid}>
                        {related.map(c => <CourseCard key={c.id} course={c} />)}
                    </div>
                </section>
            </div>

            <WhatsAppButton message={`Hola, me interesa el curso "${course.title}". ¿Me podrían dar más informes?`} />
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    page: {
        paddingBottom: '100px',
    },
    hero: {
        padding: '80px 0 60px',
        background: 'linear-gradient(to bottom, #EEF2FF 0%, var(--background) 100%)',
    },
    heroGrid: {
        maxWidth: '900px',
        margin: '0 auto',
        textAlign: 'center',
    },
    title: {
        fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
        lineHeight: '1.1',
        marginBottom: '24px',
        color: 'var(--dark)',
    },
    heroMeta: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '32px',
        fontSize: '1rem',
        flexWrap: 'wrap',
    },
    instructorInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
    avatar: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: 'var(--primary)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 800,
    },
    main: {
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
    },
    imageBox: {
        width: '100%',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-lg)',
        aspectRatio: '16/9',
    },
    mainImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    section: {
        marginBottom: '20px',
    },
    sectionTitle: {
        fontSize: '1.8rem',
        marginBottom: '24px',
        color: 'var(--dark)',
    },
    descriptionText: {
        fontSize: '1.15rem',
        lineHeight: '1.8',
        color: 'var(--text-muted)',
        marginBottom: '32px',
    },
    highlightsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '24px',
        paddingTop: '32px',
        borderTop: '1px solid var(--border)',
    },
    highlight: {
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
    },
    hIcon: {
        fontSize: '1.5rem',
        width: '48px',
        height: '48px',
        backgroundColor: 'var(--background)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sidebar: {
        position: 'relative',
    },
    stickyContainer: {
        position: 'sticky',
        top: '120px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
    },
    priceCard: {
        padding: '32px',
        backgroundColor: 'white',
        borderRadius: '24px',
    },
    priceHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '24px',
    },
    priceTag: {
        display: 'flex',
        flexDirection: 'column',
    },
    priceValue: {
        fontSize: '2.5rem',
        fontWeight: 800,
        color: 'var(--dark)',
    },
    currency: {
        fontSize: '0.9rem',
        color: 'var(--text-muted)',
        fontWeight: 600,
    },
    offerBadge: {
        backgroundColor: '#DCFCE7',
        color: '#15803D',
        padding: '4px 12px',
        borderRadius: '12px',
        fontSize: '0.75rem',
        fontWeight: 700,
    },
    actionGroup: {
        textAlign: 'center',
        marginBottom: '32px',
    },
    mainBtn: {
        width: '100%',
        padding: '18px',
        fontSize: '1.1rem',
        marginBottom: '12px',
    },
    trustNote: {
        fontSize: '0.8rem',
        color: 'var(--text-muted)',
    },
    featureList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        color: 'var(--text)',
        fontSize: '0.95rem',
    },
    sidebarPromo: {
        padding: '24px',
        backgroundColor: 'var(--dark)',
        color: 'white',
        borderRadius: '24px',
        textAlign: 'center',
    },
    relatedSection: {
        marginTop: '80px',
        paddingTop: '60px',
        borderTop: '1px solid var(--border)',
    },
    relatedGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px',
    },
    faq: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    faqItem: {
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '16px',
        border: '1px solid var(--border)',
    }
};
