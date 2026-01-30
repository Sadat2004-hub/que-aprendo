import { COURSES, CATEGORIES, MUNICIPIOS } from '@/lib/data';
import CourseCard from '@/components/CourseCard';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface Props {
    params: Promise<{ municipio: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { municipio } = await params;
    const mun = MUNICIPIOS.find(m => m.id === municipio);

    if (!mun) return { title: 'Municipio no encontrado' };

    return {
        title: `Cursos y Talleres en ${mun.name} | queaprendo`,
        description: `Encuentra los mejores cursos, talleres y escuelas en ${mun.name}, Oaxaca. Educación presencial y online de alta calidad.`,
    };
}

export default async function MunicipioPage({ params }: Props) {
    const { municipio } = await params;
    const mun = MUNICIPIOS.find(m => m.id === municipio);

    if (!mun) notFound();

    const cityCourses = COURSES.filter(c => c.municipio === municipio);

    return (
        <div style={styles.container}>
            <div className="container">
                <header style={styles.header}>
                    <h1 style={styles.title}>Aprende en {mun.name}</h1>
                    <p style={styles.subtitle}>
                        Explora todas las oportunidades educativas disponibles en tu zona.
                    </p>
                </header>

                <section style={styles.categoriesSection}>
                    <h2 style={styles.sectionTitle}>Categorías en {mun.name}</h2>
                    <div style={styles.categoryGrid}>
                        {CATEGORIES.map(cat => (
                            <Link key={cat.id} href={`/${municipio}/${cat.id}`} style={styles.categoryCard}>
                                <span>{cat.icon} {cat.name}</span>
                            </Link>
                        ))}
                    </div>
                </section>

                <section style={styles.coursesSection}>
                    <h2 style={styles.sectionTitle}>Todos los cursos en {mun.name}</h2>
                    <div style={styles.grid}>
                        {cityCourses.map(course => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        padding: '60px 0',
    },
    header: {
        textAlign: 'center',
        marginBottom: '60px',
    },
    title: {
        fontSize: '3rem',
        color: 'var(--primary)',
    },
    subtitle: {
        fontSize: '1.2rem',
        color: 'var(--muted)',
        marginTop: '10px',
    },
    categoriesSection: {
        marginBottom: '60px',
    },
    sectionTitle: {
        fontSize: '1.5rem',
        marginBottom: '20px',
        color: 'var(--foreground)',
    },
    categoryGrid: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
    },
    categoryCard: {
        backgroundColor: 'var(--white)',
        padding: '12px 20px',
        borderRadius: '30px',
        border: '1px solid var(--border)',
        fontWeight: 600,
        fontSize: '0.9rem',
        transition: 'all 0.2s ease',
    },
    coursesSection: {
        marginTop: '40px',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '30px',
    },
};
