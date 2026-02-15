'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { urlForImage } from '@/sanity/lib/image'
import { MapPin, Star, GraduationCap } from 'lucide-react'
import { motion } from 'framer-motion'

export default function InstitutionCard({ item }: { item: any }) {

    // Calculate display rating
    const rating = item.rating || 4.8
    const reviewCount = item.reviews?.length || 0

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
        >
            <Link href={`/${item.slug.current}`} style={styles.card}>
                <div style={styles.imageWrapper}>
                    {item.mainImage ? (
                        <img
                            src={urlForImage(item.mainImage).url()}
                            alt={item.name}
                            style={styles.image}
                        />
                    ) : (
                        <div style={styles.placeholder}>
                            <GraduationCap size={48} color="var(--muted)" />
                        </div>
                    )}
                    <div style={styles.badge}>
                        {item.priceRange || '$$'}
                    </div>
                </div>

                <div style={styles.content}>
                    <div style={styles.topInfo}>
                        <span style={styles.categoryBadge}>
                            {item.categorias?.[0]?.replace(/-/g, ' ') || 'Curso'}
                        </span>
                        <div style={styles.rating}>
                            <Star size={14} fill="#F59E0B" color="#F59E0B" />
                            <span>{rating}</span>
                            <span style={styles.reviewCount}>({reviewCount})</span>
                        </div>
                    </div>

                    <h3 style={styles.title}>{item.name}</h3>

                    <div style={styles.location}>
                        <MapPin size={14} />
                        <span>{item.ciudad?.replace(/-/g, ' ')}</span>
                    </div>

                    <div style={styles.footer}>
                        <span style={styles.viewMore}>Ver Detalles →</span>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    card: {
        backgroundColor: 'var(--white)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        border: '1px solid var(--border)',
    },
    imageWrapper: {
        position: 'relative',
        height: '200px',
        width: '100%',
        backgroundColor: '#f3f4f6',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    placeholder: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    badge: {
        position: 'absolute',
        bottom: '12px',
        right: '12px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '0.85rem',
        fontWeight: 700,
        color: 'var(--primary)',
        backdropFilter: 'blur(4px)',
    },
    content: {
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        flex: 1,
    },
    topInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    categoryBadge: {
        fontSize: '0.7rem',
        fontWeight: 700,
        color: 'var(--secondary)',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },
    rating: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        fontSize: '0.85rem',
        fontWeight: 600,
    },
    reviewCount: {
        color: 'var(--muted)',
        fontWeight: 400,
        marginLeft: '2px',
    },
    title: {
        fontSize: '1.2rem',
        fontWeight: 700,
        color: 'var(--foreground)',
        lineHeight: 1.3,
        margin: '4px 0',
    },
    location: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '0.85rem',
        color: 'var(--muted)',
    },
    footer: {
        marginTop: 'auto',
        paddingTop: '12px',
        borderTop: '1px solid #f3f4f6',
    },
    viewMore: {
        color: 'var(--primary)',
        fontWeight: 600,
        fontSize: '0.9rem',
    }
}
