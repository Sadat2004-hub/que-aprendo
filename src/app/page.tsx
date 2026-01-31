import SearchBar from '@/components/SearchBar';
import CourseCard from '@/components/CourseCard';
import { COURSES, CATEGORIES } from '@/lib/data';
import Link from 'next/link';

export default function Home() {
  const featuredCourses = COURSES.slice(0, 4);

  return (
    <div style={styles.wrapper}>
      {/* Hero Section - Futuristic & Minimal */}
      <section style={styles.hero}>
        <div className="container" style={styles.heroContainer}>
          <div style={styles.heroContent} className="animate-up">
            <span className="badge-tech" style={{ marginBottom: '24px', display: 'inline-block' }}>
              Nueva forma de aprender en Oaxaca
            </span>
            <h1 style={styles.heroTitle}>
              Desbloquea tu <span style={styles.gradientText}>Potencial</span> Técnico y Humano
            </h1>
            <p style={styles.heroSubtitle}>
              La plataforma definitiva para conectar con expertos locales. Cursos de alta calidad, contacto directo y aprendizaje real.
            </p>
            <div style={styles.heroSearch}>
              <SearchBar prominent={true} />
            </div>
            <div style={styles.trustStrip}>
              <span style={styles.trustItem}>✓ +50 Instructores</span>
              <span style={styles.trustItem}>✓ Contacto Directo</span>
              <span style={styles.trustItem}>✓ Garantía queaprendo</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Horizontal Scroll or Grid */}
      <section style={styles.categoriesSection}>
        <div className="container">
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Explora por Categoría</h2>
          </div>
          <div style={styles.categoryGrid}>
            {CATEGORIES.map((cat) => (
              <Link key={cat.id} href={`/oaxaca/${cat.id}`} style={styles.categoryCard} className="glass-card">
                <div style={styles.catIconWrapper}>{cat.icon}</div>
                <span style={styles.catName}>{cat.name}</span>
                <span style={styles.catCount}>Ver cursos →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses - Grid with dynamic feel */}
      <section style={styles.featuredSection}>
        <div className="container">
          <div style={styles.sectionHeader}>
            <div>
              <h2 style={styles.sectionTitle}>Cursos Destacados</h2>
              <p style={{ color: 'var(--text-muted)' }}>Selección de los talleres más populares del mes.</p>
            </div>
            <Link href="/oaxaca" className="btn btn-ghost" style={{ borderRadius: 'var(--radius-md)' }}>Explorar todo</Link>
          </div>
          <div style={styles.courseGrid}>
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Modern CTA Section */}
      <section style={styles.ctaSection}>
        <div className="container">
          <div style={styles.ctaCard} className="animate-up">
            <div style={styles.ctaText}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', color: 'white' }}>¿Tienes algo que enseñar?</h2>
              <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)', marginBottom: '40px' }}>
                Únete a la mayor red educativa de Oaxaca. Digitalizamos tu talento y te conectamos con alumnos listos para aprender.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link href="/unirse" className="btn btn-primary" style={{ backgroundColor: 'white', color: 'var(--primary)', boxShadow: 'none' }}>
                  Empezar ahora
                </Link>
                <Link href="/unirse" className="btn btn-ghost" style={{ borderColor: 'white', color: 'white' }}>
                  Más información
                </Link>
              </div>
            </div>
            <div style={styles.ctaImage}>
              {/* Visual element placeholder */}
              <div style={styles.abstractGraphic}></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    backgroundColor: 'var(--background)',
  },
  hero: {
    padding: '120px 0 100px',
    background: 'radial-gradient(circle at top right, rgba(45, 91, 255, 0.08), transparent 400px), radial-gradient(circle at bottom left, rgba(255, 92, 0, 0.05), transparent 400px)',
  },
  heroContainer: {
    textAlign: 'center',
    maxWidth: '1000px',
  },
  heroContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
    lineHeight: '1.05',
    color: 'var(--dark)',
    marginBottom: '24px',
    maxWidth: '900px',
  },
  gradientText: {
    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 800,
  },
  heroSubtitle: {
    fontSize: 'clamp(1rem, 3vw, 1.35rem)',
    color: 'var(--text-muted)',
    maxWidth: '650px',
    marginBottom: '48px',
  },
  heroSearch: {
    width: '100%',
    maxWidth: '750px',
    marginBottom: '40px',
  },
  trustStrip: {
    display: 'flex',
    gap: '32px',
    color: 'var(--text)',
    fontSize: '0.9rem',
    fontWeight: 600,
    opacity: 0.8,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  categoriesSection: {
    padding: '80px 0',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: '48px',
  },
  sectionTitle: {
    fontSize: '2.5rem',
    color: 'var(--dark)',
  },
  categoryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
  },
  categoryCard: {
    padding: '40px 32px',
    borderRadius: '24px',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    backgroundColor: 'white',
    height: '240px',
    justifyContent: 'center',
  },
  catIconWrapper: {
    fontSize: '3rem',
    marginBottom: '12px',
  },
  catName: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: 'var(--dark)',
  },
  catCount: {
    fontSize: '0.9rem',
    fontWeight: 600,
    color: 'var(--primary)',
  },
  featuredSection: {
    padding: '100px 0',
    backgroundColor: 'rgba(45, 91, 255, 0.02)',
  },
  courseGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '32px',
  },
  ctaSection: {
    padding: '120px 0',
  },
  ctaCard: {
    background: 'var(--dark)',
    borderRadius: '40px',
    padding: '80px',
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr',
    gap: '40px',
    overflow: 'hidden',
    position: 'relative',
    boxShadow: '0 40px 80px rgba(0,0,0,0.2)',
  },
  ctaText: {
    zIndex: 2,
  },
  ctaImage: {
    position: 'relative',
    zIndex: 1,
  },
  abstractGraphic: {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, var(--primary), transparent)',
    borderRadius: '50%',
    filter: 'blur(80px)',
    opacity: 0.4,
    position: 'absolute',
    top: '20%',
    right: '-20%',
  }
};
