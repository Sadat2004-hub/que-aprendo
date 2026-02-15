/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import SearchBar from '@/components/SearchBar'
import InstitutionCard from '@/components/InstitutionCard'
import { client } from '@/sanity/lib/client'
import { INSTITUCIONES_QUERY } from '@/sanity/lib/queries'
import { GraduationCap, BookOpen, Laptop, Globe, ChefHat, Palette, Hammer, Award } from 'lucide-react'

const UI_CATEGORIES = [
  { id: 'posgrados', name: 'Doctorados y Maestrías', icon: <GraduationCap size={32} />, color: '#4F46E5' },
  { id: 'diplomados', name: 'Diplomados', icon: <Award size={32} />, color: '#7C3AED' },
  { id: 'universidades', name: 'Universidades', icon: <BookOpen size={32} />, color: '#2563EB' },
  { id: 'tecnologia', name: 'Tecnología', icon: <Laptop size={32} />, color: '#0891B2' },
  { id: 'idiomas', name: 'Idiomas', icon: <Globe size={32} />, color: '#059669' },
  { id: 'gastronomia', name: 'Gastronomía', icon: <ChefHat size={32} />, color: '#DC2626' },
  { id: 'arte', name: 'Arte y Música', icon: <Palette size={32} />, color: '#DB2777' },
  { id: 'oficios', name: 'Oficios', icon: <Hammer size={32} />, color: '#D97706' },
]

export default async function Home() {
  const instituciones = await client.fetch(INSTITUCIONES_QUERY);
  const featured = instituciones.slice(0, 4);

  return (
    <div style={styles.wrapper}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div className="container" style={styles.heroContent}>
          <div style={styles.heroText}>
            <h1 style={styles.heroTitle}>
              Tu futuro empieza con lo que <span style={{ color: 'var(--secondary)' }}>aprendes</span> hoy.
            </h1>
            <p style={styles.heroSubtitle}>
              Encuentra la mejor oferta educativa en Oaxaca: desde cursos técnicos hasta doctorados.
            </p>
            <div style={styles.searchWrapper}>
              <SearchBar prominent={true} />
            </div>
          </div>
        </div>
      </section>

      {/* Premium Category Grid */}
      <section style={styles.section}>
        <div className="container">
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Explora por nivel educativo</h2>
            <p style={styles.sectionSubtitle}>Selecciona tu área de interés para encontrar instituciones</p>
          </div>
          <div style={styles.categoryGrid}>
            {UI_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/oaxaca/${cat.id}`}
                style={{ ...styles.categoryCard, borderTop: `4px solid ${cat.color}` }}
              >
                <div style={{ ...styles.categoryIcon, color: cat.color }}>
                  {cat.icon}
                </div>
                <span style={styles.categoryName}>{cat.name}</span>
                <span style={styles.categoryLink}>Explorar →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      {featured.length > 0 && (
        <section style={{ ...styles.section, backgroundColor: 'white' }}>
          <div className="container">
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Instituciones Destacadas</h2>
              <Link href="/oaxaca" style={styles.viewAll}>Ver todo el directorio →</Link>
            </div>
            <div style={styles.grid}>
              {featured.map((inst: any) => (
                <InstitutionCard key={inst._id} item={inst} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Growth Section */}
      <section style={styles.growthSection}>
        <div className="container" style={styles.growthContent}>
          <div style={styles.growthText}>
            <h2 style={styles.growthTitle}>¿Deseas registrar tu institución?</h2>
            <p style={styles.growthSubtitle}>
              Únete a la mayor red educativa de Oaxaca y llega a miles de personas buscando superarse profesionalmente.
            </p>
            <Link href="/unirse" className="btn btn-primary" style={styles.growthBtn}>
              Registrar Institución
            </Link>
          </div>
          <div style={styles.growthImage}>
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"
              alt="Education"
              style={{ width: '100%', borderRadius: 'var(--radius-lg)' }}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    backgroundColor: 'var(--light-gray)',
  },
  hero: {
    padding: '120px 0 100px',
    background: 'linear-gradient(135deg, #0047AB 0%, #002D6B 100%)',
    color: 'white',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  heroContent: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  heroText: {
    maxWidth: '850px',
  },
  heroTitle: {
    fontSize: '4rem',
    fontWeight: 800,
    marginBottom: '24px',
    lineHeight: 1.1,
  },
  heroSubtitle: {
    fontSize: '1.4rem',
    opacity: 0.9,
    marginBottom: '40px',
    fontWeight: 400,
  },
  searchWrapper: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  section: {
    padding: '100px 0',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '60px',
  },
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: 800,
    color: 'var(--primary)',
    marginBottom: '12px',
  },
  sectionSubtitle: {
    fontSize: '1.1rem',
    color: 'var(--muted)',
  },
  categoryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '24px',
  },
  categoryCard: {
    backgroundColor: 'white',
    padding: '40px 30px',
    borderRadius: 'var(--radius-lg)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
  },
  categoryIcon: {
    marginBottom: '20px',
  },
  categoryName: {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: 'var(--foreground)',
    marginBottom: '10px',
  },
  categoryLink: {
    fontSize: '0.9rem',
    fontWeight: 600,
    color: 'var(--primary)',
    marginTop: '10px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '30px',
  },
  viewAll: {
    color: 'var(--secondary)',
    fontWeight: 700,
    fontSize: '1rem',
  },
  growthSection: {
    padding: '100px 0',
    backgroundColor: '#EEF2FF',
  },
  growthContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '80px',
    flexWrap: 'wrap',
  },
  growthText: {
    flex: 1,
    minWidth: '300px',
  },
  growthTitle: {
    fontSize: '2.5rem',
    color: 'var(--primary)',
    marginBottom: '24px',
  },
  growthSubtitle: {
    fontSize: '1.2rem',
    color: 'var(--muted)',
    lineHeight: 1.6,
    marginBottom: '32px',
  },
  growthBtn: {
    padding: '15px 35px',
    fontSize: '1.1rem',
  },
  growthImage: {
    flex: 1,
    minWidth: '300px',
  }
}
