import { COURSES, CATEGORIES } from '@/lib/data';
import CourseCard from '@/components/CourseCard';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface Props {
    params: Promise<{ municipio: string; categoria: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { municipio, categoria } = await params;
    const cat = CATEGORIES.find(c => c.id === categoria);

    if (!cat) return { title: 'Categoría no encontrada' };

    const munName = municipio.charAt(0).toUpperCase() + municipio.slice(1);
    return {
        title: `Cursos de ${cat.name} en ${munName} | queaprendo`,
        description: `Los mejores cursos y talleres de ${cat.name} en ${munName}. Encuentra clases presenciales y online con expertos locales.`,
    };
}

export default async function CategoryPage({ params }: Props) {
    const { municipio, categoria } = await params;
    const cat = CATEGORIES.find(c => c.id === categoria);

    if (!cat) notFound();

    const filteredCourses = COURSES.filter(
        c => c.municipio === municipio && c.category === categoria
    );

    return (
        <div style={styles.container}>
            <div className="container">
                <header style={styles.header}>
                    <span style={styles.icon}>{cat.icon}</span>
                    <h1 style={styles.title}>{cat.name} en {municipio.charAt(0).toUpperCase() + municipio.slice(1)}</h1>
                    <p style={styles.subtitle}>
                        Mostrando {filteredCourses.length} curso{filteredCourses.length !== 1 ? 's' : ''} de {cat.name.toLowerCase()} disponibles hoy.
                    </p>
                </header>

                {filteredCourses.length > 0 ? (
                    <div style={styles.grid}>
                        {filteredCourses.map(course => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                ) : (
                    <div style={styles.empty}>
                        <h2>No encontramos cursos en esta categoría por ahora.</h2>
                        <p>Suscríbete para recibir notificaciones cuando haya nuevos talleres en {municipio}.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        padding: '60px 0 100px',
    },
    header: {
        textAlign: 'center',
        marginBottom: '60px',
    },
    icon: {
        fontSize: '4rem',
        display: 'block',
        marginBottom: '20px',
    },
    title: {
        fontSize: '3rem',
        color: 'var(--primary)',
        marginBottom: '15px',
    },
    subtitle: {
        fontSize: '1.2rem',
        color: 'var(--muted)',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px',
    },
    empty: {
        textAlign: 'center',
        padding: '100px 0',
        backgroundColor: 'var(--white)',
        borderRadius: '12px',
    }
};
