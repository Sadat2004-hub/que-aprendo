import SearchBar from '@/components/SearchBar';
import CourseCard from '@/components/CourseCard';
import { COURSES, CATEGORIES } from '@/lib/data';
import Link from 'next/link';

export default function Home() {
  const featuredCourses = COURSES.slice(0, 6);

  return (
    <div className="mesh-gradient">
      {/* Editorial Hero Section */}
      <section style={styles.hero}>
        <div className="container">
          <div className="animate-reveal" style={styles.heroWrapper}>
            <div style={styles.heroTag}>Plataforma de Educación Local v1.0</div>
            <h1>Aprende de <br /> <span style={{ color: 'var(--accent-blue)' }}>Expertos</span> Reales</h1>
            <p style={styles.heroLead}>
              Conectamos curiosidad con maestría. La red más exclusiva de talleres presenciales y online en el corazón de Oaxaca.
            </p>
            <div style={styles.searchContainer}>
              <SearchBar prominent={true} />
            </div>
            <div style={styles.heroStats}>
              <div style={styles.statItem}><strong>+12k</strong> Alumnos</div>
              <div style={styles.statItem}><strong>+150</strong> Maestros</div>
              <div style={styles.statItem}><strong>4.9/5</strong> Satisfacción</div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Categories */}
      <section style={styles.section}>
        <div className="container">
          <div style={styles.sectionHeading}>
            <div className="hero-tag" style={{ border: '1px solid #000', padding: '4px 12px', display: 'inline-block', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '16px' }}>EXPLORAR</div>
            <h2>Disciplinas Maestras</h2>
          </div>
          <div className="bento-grid" style={{ marginTop: '48px' }}>
            {CATEGORIES.map((cat, i) => (
              <Link key={cat.id} href={`/oaxaca/${cat.id}`} className="bento-card" style={styles.catCard(i)}>
                <div style={styles.catIcon}>{cat.icon}</div>
                <h3 style={{ marginTop: 'auto' }}>{cat.name}</h3>
                <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>Explorar taller →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section style={styles.section}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '64px' }}>
            <div>
              <div className="hero-tag" style={{ border: '1px solid #000', padding: '4px 12px', display: 'inline-block', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '16px' }}>CURADOS</div>
              <h2>Selección del Mes</h2>
            </div>
            <Link href="/oaxaca" className="btn-new btn-outline-new" style={{ padding: '12px 28px' }}>Ver catálogo completo</Link>
          </div>
          <div style={styles.courseGrid}>
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Join Section - Different Layout */}
      <section style={{ ...styles.section, background: 'var(--accent-primary)', color: 'white', borderTopRightRadius: '100px', borderBottomLeftRadius: '100px' }}>
        <div className="container" style={styles.ctaGrid}>
          <div style={styles.ctaContent}>
            <h2 style={{ color: 'white' }}>Transforma tu <br /> Conocimiento en <br /> Impacto</h2>
            <p style={{ fontSize: '1.25rem', opacity: 0.8, marginTop: '24px', maxWidth: '500px' }}>
              Buscamos maestros, escuelas y artesanos que quieran llevar su enseñanza al siguiente nivel digital.
            </p>
            <div style={{ marginTop: '48px', display: 'flex', gap: '20px' }}>
              <Link href="/unirse" className="btn-new" style={{ background: 'white', color: 'black' }}>Registrarme</Link>
              <Link href="/como-funciona" className="btn-new" style={{ background: 'transparent', border: '2px solid white', color: 'white' }}>Cómo funciona</Link>
            </div>
          </div>
          <div style={styles.ctaVisual}>
            <div style={styles.abstractCircle}></div>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles: { [key: string]: any } = {
  hero: {
    padding: '240px 0 120px',
    textAlign: 'center',
  },
  heroWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '32px',
  },
  heroTag: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.9rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    opacity: 0.5,
  },
  heroLead: {
    fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
    maxWidth: '750px',
    color: 'var(--text-muted)',
    fontWeight: 500,
  },
  searchContainer: {
    width: '100%',
    maxWidth: '800px',
    marginTop: '24px',
  },
  heroStats: {
    display: 'flex',
    gap: '48px',
    marginTop: '64px',
    borderTop: '1px solid var(--border-light)',
    paddingTop: '32px',
  },
  statItem: {
    fontSize: '1rem',
    opacity: 0.8,
  },
  section: {
    padding: '120px 0',
  },
  sectionHeading: {
    textAlign: 'left',
  },
  catCard: (i: number) => ({
    gridColumn: i % 3 === 0 ? 'span 6' : 'span 3',
    height: '320px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: i % 2 === 0 ? '#fff' : '#F9F9F9',
  }),
  catIcon: {
    fontSize: '4rem',
  },
  courseGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '32px',
  },
  ctaGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '80px',
    padding: '100px 24px',
    alignItems: 'center',
  },
  ctaVisual: {
    position: 'relative',
    height: '400px',
  },
  abstractCircle: {
    width: '300px',
    height: '300px',
    background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-violet))',
    borderRadius: '50%',
    filter: 'blur(100px)',
    opacity: 0.5,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }
};
