import { client } from '@/sanity/lib/client'
import { INSTITUCION_BY_SLUG_QUERY, INSTITUCIONES_BY_CITY_QUERY } from '@/sanity/lib/queries'
import InstitutionCard from '@/components/InstitutionCard'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { urlForImage } from '@/sanity/lib/image'
import { MapPin, Phone, Clock, Star, GraduationCap, ChevronRight, Globe, Share2 } from 'lucide-react'
import Link from 'next/link'

interface Props {
    params: Promise<{ slug: string }>
}

const CITIES = ['oaxaca', 'puerto-escondido', 'huatulco', 'xoxo', 'santa-lucia', 'san-felipe', 'tutla', 'huautla']

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params

    // Check if it's an institution
    const institution = await client.fetch(INSTITUCION_BY_SLUG_QUERY, { slug })

    if (institution) {
        return {
            title: `${institution.name} | queaprendo`,
            description: institution.description?.substring(0, 160) || `Información sobre ${institution.name}.`,
        }
    }

    // Check if it's a city
    if (CITIES.includes(slug)) {
        const cityName = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')
        return {
            title: `Aprende en ${cityName} | queaprendo`,
            description: `Encuentra los mejores cursos y escuelas en ${cityName}.`,
        }
    }

    return { title: 'No encontrado' }
}

export default async function CatchAllPage({ params }: Props) {
    const { slug } = await params

    // 1. Try to fetch as Institution
    const institution = await client.fetch(INSTITUCION_BY_SLUG_QUERY, { slug })

    if (institution) {
        return <InstitutionDetail institution={institution} />
    }

    // 2. Try to handle as City
    if (CITIES.includes(slug)) {
        const instituciones = await client.fetch(INSTITUCIONES_BY_CITY_QUERY, { ciudad: slug })
        return <CityDetail slug={slug} instituciones={instituciones} />
    }

    notFound()
}

function InstitutionDetail({ institution }: { institution: any }) {
    const rating = institution.rating || 4.8
    const reviewCount = institution.reviews?.length || 0

    return (
        <div style={styles.detailWrapper}>
            {/* Institution Hero */}
            <header style={styles.detailHero}>
                <div className="container">
                    <div style={styles.breadcrumb}>
                        <Link href="/">Inicio</Link> <ChevronRight size={14} />
                        <Link href={`/${institution.ciudad}`}>{institution.ciudad?.replace(/-/g, ' ')}</Link> <ChevronRight size={14} />
                        <span>{institution.name}</span>
                    </div>

                    <div style={styles.heroMain}>
                        <h1 style={styles.heroName}>{institution.name}</h1>
                        <div style={styles.heroMeta}>
                            <div style={styles.metaItem}>
                                <Star size={18} fill="#F59E0B" color="#F59E0B" />
                                <span style={styles.ratingValue}>{rating}</span>
                                <span style={styles.reviewCount}>({reviewCount} reseñas)</span>
                            </div>
                            <div style={styles.metaItem}>
                                <MapPin size={18} color="var(--secondary)" />
                                <span>{institution.ciudad?.replace(/-/g, ' ')}</span>
                            </div>
                            <div style={styles.metaItem}>
                                <GraduationCap size={18} color="var(--primary)" />
                                <span>{institution.categorias?.[0]?.replace(/-/g, ' ')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container">
                <div style={styles.mainLayout}>
                    {/* Content Section */}
                    <div style={styles.contentSection}>
                        {/* Gallery */}
                        {institution.gallery && institution.gallery.length > 0 && (
                            <div style={styles.galleryGrid}>
                                {institution.gallery.map((img: any, i: number) => (
                                    <div key={i} style={i === 0 ? styles.galleryMain : styles.galleryThumb}>
                                        <img
                                            src={urlForImage(img).url()}
                                            alt={`${institution.name} ${i}`}
                                            style={styles.galleryImg}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* About */}
                        <section style={styles.section}>
                            <h2 style={styles.sectionTitle}>Sobre la Institución</h2>
                            <p style={styles.description}>{institution.description}</p>

                            {institution.tags && (
                                <div style={styles.tags}>
                                    {institution.tags.map((tag: string) => (
                                        <span key={tag} style={styles.tag}>#{tag}</span>
                                    ))}
                                </div>
                            )}
                        </section>

                        {/* Reviews */}
                        <section style={styles.section}>
                            <h2 style={styles.sectionTitle}>Reseñas de Alumnos</h2>
                            {institution.reviews && institution.reviews.length > 0 ? (
                                <div style={styles.reviewsList}>
                                    {institution.reviews.map((rev: any, i: number) => (
                                        <div key={i} style={styles.reviewCard}>
                                            <div style={styles.reviewTop}>
                                                <span style={styles.reviewUser}>{rev.user}</span>
                                                <div style={styles.reviewStars}>
                                                    {[...Array(5)].map((_, star) => (
                                                        <Star
                                                            key={star}
                                                            size={14}
                                                            fill={star < rev.rating ? "#F59E0B" : "transparent"}
                                                            color={star < rev.rating ? "#F59E0B" : "#DDD"}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <p style={styles.reviewComment}>{rev.comment}</p>
                                            <span style={styles.reviewDate}>{rev.date}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p style={styles.noReviews}>Aún no hay reseñas. ¡Sé el primero en compartir tu experiencia!</p>
                            )}
                        </section>
                    </div>

                    {/* Sidebar Section */}
                    <aside style={styles.sidebar}>
                        <div style={styles.contactCard}>
                            <h3 style={styles.sidebarTitle}>Contacto Directo</h3>

                            <div style={styles.sidebarItems}>
                                <div style={styles.sidebarItem}>
                                    <Phone size={20} color="var(--primary)" />
                                    <div>
                                        <span style={styles.itemLabel}>WhatsApp / Teléfono</span>
                                        <p style={styles.itemValue}>{institution.telephone ? `+${institution.telephone}` : 'No disponible'}</p>
                                    </div>
                                </div>

                                <div style={styles.sidebarItem}>
                                    <Clock size={20} color="var(--primary)" />
                                    <div>
                                        <span style={styles.itemLabel}>Horarios</span>
                                        {institution.openingHours?.map((h: any, i: number) => (
                                            <p key={i} style={styles.itemValue}>{h.days}: {h.hours}</p>
                                        )) || <p style={styles.itemValue}>Consultar por teléfono</p>}
                                    </div>
                                </div>

                                <div style={styles.sidebarItem}>
                                    <MapPin size={20} color="var(--primary)" />
                                    <div>
                                        <span style={styles.itemLabel}>Ubicación</span>
                                        <p style={styles.itemValue}>{institution.address || 'Ver mapa abajo'}</p>
                                    </div>
                                </div>
                            </div>

                            {institution.telephone && (
                                <a
                                    href={`https://wa.me/${institution.telephone}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={styles.primaryBtn}
                                >
                                    Enviar Mensaje WhatsApp
                                </a>
                            )}

                            <button style={styles.secondaryBtn}>
                                <Share2 size={18} /> Compartir Perfil
                            </button>
                        </div>

                        {/* Map */}
                        {institution.mapEmbedUrl && (
                            <div style={styles.mapCard}>
                                <iframe
                                    src={institution.mapEmbedUrl}
                                    width="100%"
                                    height="300"
                                    style={{ border: 0, borderRadius: 'var(--radius-md)' }}
                                    allowFullScreen
                                    loading="lazy"
                                ></iframe>
                            </div>
                        )}
                    </aside>
                </div>
            </div>
        </div>
    )
}

function CityDetail({ slug, instituciones }: { slug: string, instituciones: any[] }) {
    const cityName = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')

    return (
        <div style={styles.cityContainer}>
            <div className="container">
                <header style={styles.cityHeader}>
                    <h1 style={styles.cityTitle}>Aprende en {cityName}</h1>
                    <p style={styles.citySubtitle}>Explora las {instituciones.length} instituciones y cursos disponibles en tu zona.</p>
                </header>

                <div style={styles.grid}>
                    {instituciones.map((inst: any) => (
                        <InstitutionCard key={inst._id} item={inst} />
                    ))}
                </div>

                {instituciones.length === 0 && (
                    <div style={styles.empty}>
                        <h2>Próximamente más opciones en {cityName}</h2>
                        <p>Estamos expandiendo nuestro catálogo educativo nacional.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    detailWrapper: {
        backgroundColor: '#FAFAFA',
        paddingBottom: '100px',
    },
    detailHero: {
        background: 'white',
        padding: '24px 0 48px',
        borderBottom: '1px solid var(--border)',
        marginBottom: '40px',
    },
    breadcrumb: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '0.85rem',
        color: 'var(--muted)',
        marginBottom: '24px',
    },
    heroMain: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    heroName: {
        fontSize: '3rem',
        fontWeight: 800,
        color: 'var(--primary)',
    },
    heroMeta: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '24px',
    },
    metaItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '1rem',
        fontWeight: 500,
    },
    ratingValue: {
        fontWeight: 700,
    },
    reviewCount: {
        color: 'var(--muted)',
        fontWeight: 400,
    },
    mainLayout: {
        display: 'flex',
        gap: '40px',
        flexWrap: 'wrap',
    },
    contentSection: {
        flex: 2,
        minWidth: '350px',
    },
    galleryGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(2, 200px)',
        gap: '12px',
        marginBottom: '40px',
    },
    galleryMain: {
        gridColumn: 'span 2',
        gridRow: 'span 2',
    },
    galleryThumb: {
        gridColumn: 'span 1',
    },
    galleryImg: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: 'var(--radius-md)',
    },
    section: {
        backgroundColor: 'white',
        padding: '32px',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        marginBottom: '32px',
    },
    sectionTitle: {
        fontSize: '1.5rem',
        marginBottom: '20px',
        color: 'var(--primary)',
        fontWeight: 700,
    },
    description: {
        fontSize: '1.1rem',
        lineHeight: 1.7,
        color: '#444',
        whiteSpace: 'pre-line',
    },
    tags: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        marginTop: '24px',
    },
    tag: {
        backgroundColor: '#F3F4F6',
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: '0.85rem',
        color: 'var(--muted)',
    },
    sidebar: {
        flex: 1,
        minWidth: '300px',
    },
    contactCard: {
        backgroundColor: 'white',
        padding: '32px',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-md)',
        position: 'sticky',
        top: '100px',
        marginBottom: '24px',
    },
    sidebarTitle: {
        fontSize: '1.25rem',
        marginBottom: '24px',
        textAlign: 'center',
    },
    sidebarItems: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        marginBottom: '24px',
    },
    sidebarItem: {
        display: 'flex',
        gap: '16px',
    },
    itemLabel: {
        display: 'block',
        fontSize: '0.75rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        color: 'var(--muted)',
        marginBottom: '4px',
    },
    itemValue: {
        fontSize: '0.95rem',
        fontWeight: 500,
    },
    primaryBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: '16px',
        backgroundColor: '#25D366',
        color: 'white',
        borderRadius: 'var(--radius-md)',
        fontWeight: 700,
        fontSize: '1rem',
        textDecoration: 'none',
        marginBottom: '12px',
    },
    secondaryBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        width: '100%',
        padding: '12px',
        backgroundColor: 'white',
        color: 'var(--primary)',
        border: '1px solid var(--primary)',
        borderRadius: 'var(--radius-md)',
        fontWeight: 600,
    },
    mapCard: {
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        border: '1px solid var(--border)',
    },
    reviewsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    reviewCard: {
        padding: '24px',
        borderBottom: '1px solid #F3F4F6',
    },
    reviewTop: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '12px',
    },
    reviewUser: {
        fontWeight: 700,
        fontSize: '1rem',
    },
    reviewStars: {
        display: 'flex',
        gap: '2px',
    },
    reviewComment: {
        fontSize: '1rem',
        color: '#555',
        lineHeight: 1.5,
        marginBottom: '8px',
    },
    reviewDate: {
        fontSize: '0.85rem',
        color: 'var(--muted)',
    },
    noReviews: {
        color: 'var(--muted)',
        fontStyle: 'italic',
    },
    cityContainer: {
        padding: '80px 0',
        backgroundColor: 'var(--light-gray)',
    },
    cityHeader: {
        textAlign: 'center',
        marginBottom: '60px',
    },
    cityTitle: {
        fontSize: '3.5rem',
        fontWeight: 800,
        color: 'var(--primary)',
    },
    citySubtitle: {
        fontSize: '1.2rem',
        color: 'var(--muted)',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '30px',
    },
    empty: {
        textAlign: 'center',
        padding: '100px 0',
    }
}
