import SearchBar from '@/components/SearchBar';
import CourseCard from '@/components/CourseCard';
import { COURSES, CATEGORIES } from '@/lib/data';
import Link from 'next/link';

export default function Home() {
  const featuredCourses = COURSES.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div className="container" style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Descubre tu próxima <span style={{ color: 'var(--secondary)' }}>pasión</span> en Oaxaca
          </h1>
          <p style={styles.heroSubtitle}>
            La plataforma que conecta el talento local con mentes curiosas. Encuentra cursos presenciales y online.
          </p>
          <div style={styles.heroSearch}>
            <SearchBar prominent={true} />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section style={styles.section}>
        <div className="container">
          <h2 style={styles.sectionTitle}>Explora por categorías</h2>
          <div style={styles.categoryGrid}>
            {CATEGORIES.map((cat) => (
              <Link key={cat.id} href={`/oaxaca/${cat.id}`} style={styles.categoryCard}>
                <span style={styles.categoryIcon}>{cat.icon}</span>
                <span style={styles.categoryName}>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section style={{ ...styles.section, backgroundColor: 'var(--white)' }}>
        <div className="container">
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Cursos destacados</h2>
            <Link href="/oaxaca" style={styles.viewAll}>Ver todos los cursos →</Link>
          </div>
          <div style={styles.courseGrid}>
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section style={styles.section}>
        <div className="container" style={styles.trustContent}>
          <div style={styles.trustText}>
            <h2 style={{ ...styles.sectionTitle, textAlign: 'left' }}>¿Eres instructor o tienes una escuela?</h2>
            <p style={styles.trustDescription}>
              Únete a la comunidad de aprendizaje más grande de Oaxaca. Digitaliza tu oferta educativa y llega a más alumnos de forma directa.
            </p>
            <div style={{ display: 'flex', gap: '15px' }}>
              <Link href="/unirse" className="btn btn-primary">Registrar mi escuela</Link>
              <Link href="/como-funciona" className="btn btn-outline">¿Cómo funciona?</Link>
            </div>
          </div>
          <div style={styles.trustImage}>
            <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800" alt="Teaching" style={{ width: '100%', borderRadius: 'var(--radius-lg)' }} />
          </div>
        </div>
      </section>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  hero: {
    padding: '100px 0 80px',
    backgroundColor: 'var(--light-gray)',
    backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(0, 71, 171, 0.03) 0%, rgba(0, 0, 0, 0) 90%)',
    textAlign: 'center',
  },
  heroContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
  },
  heroTitle: {
    fontSize: '3.5rem',
    maxWidth: '800px',
    color: 'var(--primary)',
    lineHeight: '1.1',
  },
  heroSubtitle: {
    fontSize: '1.25rem',
    color: 'var(--muted)',
    maxWidth: '600px',
  },
  heroSearch: {
    width: '100%',
    maxWidth: '700px',
    marginTop: '20px',
  },
  section: {
    padding: '80px 0',
  },
  sectionTitle: {
    fontSize: '2rem',
    marginBottom: '2rem',
    textAlign: 'center',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: '2rem',
  },
  viewAll: {
    color: 'var(--primary)',
    fontWeight: 600,
    fontSize: '0.9rem',
  },
  categoryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '20px',
  },
  categoryCard: {
    backgroundColor: 'var(--white)',
    padding: '30px 20px',
    borderRadius: 'var(--radius-lg)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    boxShadow: 'var(--shadow-sm)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    border: '1px solid transparent',
  },
  categoryIcon: {
    fontSize: '2.5rem',
  },
  categoryName: {
    fontWeight: 600,
    fontSize: '1rem',
  },
  courseGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '30px',
  },
  trustContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '60px',
    backgroundColor: '#EEF2FF',
    padding: '60px',
    borderRadius: 'var(--radius-lg)',
  },
  trustText: {
    flex: 1,
  },
  trustDescription: {
    fontSize: '1.1rem',
    color: 'var(--muted)',
    marginBottom: '30px',
    lineHeight: '1.6',
  },
  trustImage: {
    flex: 1,
    display: 'none', // Hide on mobile if needed, but here it's fine
  }
};
