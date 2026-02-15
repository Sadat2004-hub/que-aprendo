/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from '@/sanity/lib/client'
import { INSTITUCIONES_BY_CITY_AND_CATEGORY_QUERY } from '@/sanity/lib/queries'
import InstitutionCard from '@/components/InstitutionCard'
import { Metadata } from 'next'

interface Props {
    params: Promise<{ municipio: string; categoria: string }>
}

const CATEGORIES_LABELS: Record<string, string> = {
    posgrados: 'Doctorados y Maestrías',
    diplomados: 'Diplomados',
    universidades: 'Universidades',
    tecnologia: 'Tecnología',
    idiomas: 'Idiomas',
    gastronomia: 'Gastronomía',
    arte: 'Arte y Música',
    oficios: 'Oficios',
    ninos: 'Cursos para Niños',
    negocios: 'Negocios',
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { municipio, categoria } = await params
    const catName = CATEGORIES_LABELS[categoria] || 'Educación'
    const munName = municipio.charAt(0).toUpperCase() + municipio.slice(1)

    return {
        title: `${catName} en ${munName} | queaprendo`,
        description: `Encuentra las mejores instituciones de ${catName.toLowerCase()} en ${munName}.`,
    }
}

export default async function CategoryPage({ params }: Props) {
    const { municipio, categoria } = await params

    const instituciones = await client.fetch(INSTITUCIONES_BY_CITY_AND_CATEGORY_QUERY, {
        ciudad: municipio,
        categoria: categoria
    })

    const catName = CATEGORIES_LABELS[categoria] || categoria
    const munName = municipio.charAt(0).toUpperCase() + municipio.slice(1)

    return (
        <div style={styles.container}>
            <div className="container">
                <header style={styles.header}>
                    <h1 style={styles.title}>{catName} en {munName}</h1>
                    <p style={styles.subtitle}>
                        Mostrando {instituciones.length} opciones disponibles actualmente.
                    </p>
                </header>

                {instituciones.length > 0 ? (
                    <div style={styles.grid}>
                        {instituciones.map((inst: any) => (
                            <InstitutionCard key={inst._id} item={inst} />
                        ))}
                    </div>
                ) : (
                    <div style={styles.empty}>
                        <h2>No encontramos resultados en esta categoría por ahora.</h2>
                        <p>Estamos trabajando para traer más opciones en {munName}.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        padding: '80px 0 120px',
        backgroundColor: 'var(--light-gray)',
        minHeight: '60vh',
    },
    header: {
        textAlign: 'center',
        marginBottom: '60px',
    },
    title: {
        fontSize: '3rem',
        fontWeight: 800,
        color: 'var(--primary)',
        marginBottom: '10px',
    },
    subtitle: {
        fontSize: '1.2rem',
        color: 'var(--muted)',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '30px',
    },
    empty: {
        textAlign: 'center',
        padding: '100px 40px',
        backgroundColor: 'white',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)',
    }
}
