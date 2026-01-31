import SearchBar from '@/components/SearchBar';
import CourseCard from '@/components/CourseCard';
import { COURSES, CATEGORIES } from '@/lib/data';
import Link from 'next/link';

export default function Home() {
  const featuredCourses = COURSES.slice(0, 4);

  return (
    <div className="hero-gradient">
      {/* Dynamic Hero Section */}
      <section style={styles.hero}>
        <div className="container" style={styles.heroContainer}>
          <div className="animate-fade-in">
            <h1 style={styles.heroTitle}>
              Encuentra a tu <span style={{ color: 'var(--primary)' }}>Próximo Maestro</span> en Oaxaca
            </h1>
            <p style={styles.heroSubtitle}>
              Cursos presenciales y online impartidos por los mejores expertos de la región. Aprende lo que te apasiona hoy mismo.
            </p>
            <div style={styles.heroSearch}>
              <SearchBar prominent={true} />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Modern Grid */}
      <section style={styles.section}>
        <div className="container">
          <h2 style={styles.sectionTitle}>Categorías Populares</h2>
          <div style={styles.categoryGrid}>
            {CATEGORIES.map((cat) => (
              <Link key={cat.id} href={`/oaxaca/${cat.id}`} style={styles.categoryCard} className="glass-card">
                <span style={styles.catIcon}>{cat.icon}</span>
                <span style={styles.catName}>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses - Premium Look */}
      <section style={{ ...styles.section, backgroundColor: 'white' }}>
        <div className="container">
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Cursos Destacados</h2>
            <Link href="/oaxaca" style={styles.viewAll}>Explorar todo →</Link>
          </div>
          <div style={styles.courseGrid}>
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust & CTA */}
      <section style={styles.section}>
        <div className="container">
          <div style={styles.ctaBox} className="glass-card">
            <div style={styles.ctaText}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>¿Eres instructor?</h2>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '32px' }}>
                Únete a la mayor red educativa de Oaxaca. Te ayudamos a gestionar tus alumnos y digitalizar tu oferta.
              </p>
              <Link href="/unirse" className="btn btn-primary">Registrar mi taller</Link>
            </div>
            <div className="hide-on-mobile" style={styles.ctaImage}>
              <img src="https://images.unsplash.com/photo-1544928147-7972fc535992?auto=format&fit=crop&q=80&w=800" alt="Teacher" style={{ width: '100%', borderRadius: '20px' }} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  hero: {
    padding: '100px 0 80px',
    textAlign: 'center',
  },
  heroContainer: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  heroTitle: {
    fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
    lineHeight: '1.1',
    fontWeight: 800,
    marginBottom: '24px',
    color: 'var(--dark-bg)',
  },
  heroSubtitle: {
    fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
    color: 'var(--text-muted)',
    marginBottom: '48px',
  },
  heroSearch: {
    maxWidth: '700px',
    margin: '0 auto',
  },
  section: {
    padding: '100px 0',
  },
  sectionTitle: {
    fontSize: '2.2rem',
    marginBottom: '40px',
    color: 'var(--dark-bg)',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: '40px',
  },
  viewAll: {
    color: 'var(--primary)',
    fontWeight: 700,
  },
  categoryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '24px',
  },
  categoryCard: {
    padding: '40px 20px',
    textAlign: 'center',
    cursor: 'pointer',
    backgroundColor: 'white',
  },
  catIcon: {
    fontSize: '3rem',
    display: 'block',
    marginBottom: '16px',
  },
  catName: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: 'var(--dark-bg)',
  },
  courseGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '30px',
  },
  ctaBox: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr',
    gap: '60px',
    padding: '80px',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  ctaText: {},
  ctaImage: {},
};
