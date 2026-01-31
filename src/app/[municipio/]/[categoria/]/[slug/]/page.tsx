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
    };
}

export default async function CourseDetailPage({ params }: Props) {
    const { municipio, categoria, slug } = await params;
    const course = COURSES.find(c => c.slug === slug);

    if (!course) notFound();

    const related = COURSES.filter(c => c.category === course.category && c.id !== course.id).slice(0, 3);

    return (
        <div className="hero-gradient" style={{ paddingBottom: '120px' }}>
            {/* Mobile Sticky CTA */}
            <div className="mobile-action-bar">
                <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Precio total</span>
                    <strong style={{ fontSize: '1.2rem' }}>${course.price.toLocaleString()} MXN</strong>
                </div>
                <a
                    href={`https://wa.me/526563230397?text=Hola,%20me%20interesa%20inscribirme%20al%20curso%20${encodeURIComponent(course.title)}`}
                    className="btn btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Apartar lugar
                </a>
            </div>

            <div className="container" style={{ paddingTop: '40px' }}>
                {/* Header Section */}
                <div style={styles.header} className="animate-fade-in">
                    <Link href={`/${municipio}/${categoria}`} style={styles.backLink}>← Volver a {categoria}</Link>
                    <h1 style={styles.title}>{course.title}</h1>
                    <div style={styles.meta}>
                        <span style={styles.badge}>{course.modality}</span>
                        <span>📍 {course.location}</span>
                        <span>⭐ 4.9 (42 reseñas)</span>
                    </div>
                </div>

                <div className="detail-grid">
                    {/* Main Column */}
                    <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                        <div style={styles.imageContainer}>
                            <img src={course.image} alt={course.title} style={styles.image} />
                        </div>

                        <div style={styles.contentSection}>
                            <h2 style={styles.subTitle}>Descripción del taller</h2>
                            <p style={styles.text}>{course.description}</p>

                            <div style={styles.infoGrid}>
                                <div style={styles.infoCard}>
                                    <strong>Instructor</strong>
                                    <p>{course.instructor}</p>
                                </div>
                                <div style={styles.infoCard}>
                                    <strong>Duración</strong>
                                    <p>{course.duration}</p>
                                </div>
                                <div style={styles.infoCard}>
                                    <strong>Municipio</strong>
                                    <p>{course.municipio}</p>
                                </div>
                            </div>

                            <h2 style={styles.subTitle}>¿Qué incluye?</h2>
                            <ul style={styles.list}>
                                <li>✓ Acceso a todos los materiales de práctica.</li>
                                <li>✓ Constancia de participación digital.</li>
                                <li>✓ Grupo de soporte por WhatsApp.</li>
                                <li>✓ Material didáctico descargable.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Sidebar Column (Desktop Only) */}
                    <aside className="hide-on-mobile animate-fade-in" style={{ animationDelay: '0.2s', position: 'sticky', top: '100px' }}>
                        <div className="glass-card" style={styles.priceCard}>
                            <div style={{ marginBottom: '24px' }}>
                                <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>Inversión</span>
                                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)' }}>
                                    ${course.price.toLocaleString()} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>MXN</span>
                                </div>
                            </div>

                            <a
                                href={`https://wa.me/526563230397?text=Hola,%20me%20interesa%20inscribirme%20al%20curso%20${encodeURIComponent(course.title)}`}
                                className="btn btn-primary"
                                style={{ width: '100%', display: 'inline-block', textAlign: 'center', marginBottom: '16px' }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Inscribirme ahora
                            </a>

                            <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                🔒 Pago 100% seguro y directo al instructor.
                            </p>

                            <div style={styles.guarantee}>
                                <strong>Garantía queaprendo</strong>
                                <p>Si el curso no cumple con lo prometido, te ayudamos con la mediación.</p>
                            </div>
                        </div>
                    </aside>
                </div>

                {/* Related Section */}
                <section style={{ marginTop: '80px' }}>
                    <h2 style={styles.subTitle}>Cursos similares que te pueden gustar</h2>
                    <div style={styles.relatedGrid}>
                        {related.map(c => <CourseCard key={c.id} course={c} />)}
                    </div>
                </section>
            </div>

            <WhatsAppButton message={`Me interesa el curso "${course.title}". ¿Me pueden dar informes?`} />
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    header: {
        marginBottom: '32px',
    },
    backLink: {
        color: 'var(--primary)',
        fontWeight: 600,
        fontSize: '0.9rem',
        display: 'block',
        marginBottom: '16px',
        textTransform: 'uppercase',
    },
    title: {
        fontSize: 'clamp(2rem, 5vw, 3rem)',
        lineHeight: '1.2',
        marginBottom: '16px',
        color: 'var(--dark-bg)',
    },
    meta: {
        display: 'flex',
        gap: '24px',
        color: 'var(--text-muted)',
        fontSize: '0.95rem',
        flexWrap: 'wrap',
    },
    badge: {
        backgroundColor: 'var(--primary)',
        color: 'white',
        padding: '2px 12px',
        borderRadius: '12px',
        fontWeight: 700,
        fontSize: '0.8rem',
    },
    imageContainer: {
        width: '100%',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-xl)',
        marginBottom: '40px',
    },
    image: {
        width: '100%',
        height: 'auto',
        display: 'block',
    },
    contentSection: {
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
    },
    subTitle: {
        fontSize: '1.8rem',
        marginBottom: '24px',
        color: 'var(--dark-bg)',
    },
    text: {
        fontSize: '1.1rem',
        color: 'var(--text-muted)',
        marginBottom: '32px',
        lineHeight: '1.8',
    },
    infoGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '20px',
        marginBottom: '40px',
    },
    infoCard: {
        padding: '20px',
        backgroundColor: 'var(--background)',
        borderRadius: '16px',
        textAlign: 'center',
    },
    list: {
        listStyle: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        color: 'var(--text)',
        fontSize: '1.05rem',
    },
    priceCard: {
        padding: '32px',
        backgroundColor: 'white',
    },
    guarantee: {
        marginTop: '32px',
        paddingTop: '24px',
        borderTop: '1px solid #eee',
        fontSize: '0.85rem',
    },
    relatedGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px',
    }
};
