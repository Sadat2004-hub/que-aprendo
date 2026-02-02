import Link from 'next/link';
import { Course } from '@/lib/data';

export default function CourseCard({ course }: { course: Course }) {
    return (
        <Link href={`/${course.municipio}/${course.category}/${course.slug}`} style={styles.card} className="bento-card">
            <div style={styles.imageWrapper}>
                <img src={course.image} alt={course.title} style={styles.image} />
                <div style={styles.ratingBadge}>
                    ★ 4.9
                </div>
            </div>
            <div style={styles.content}>
                <div style={styles.meta}>
                    <span style={styles.category}>{course.category}</span>
                    <span style={styles.location}>{course.municipio}</span>
                </div>
                <h3 style={styles.title}>{course.title}</h3>
                <p style={styles.instructor}>Por {course.instructor}</p>

                <div style={styles.footer}>
                    <div style={styles.priceContainer}>
                        <span style={styles.label}>Inversión</span>
                        <span style={styles.price}>${course.price.toLocaleString()} MXN</span>
                    </div>
                    <div style={styles.arrow}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </div>
                </div>
            </div>
        </Link>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    card: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0',
        backgroundColor: 'white',
        height: '100%',
        textDecoration: 'none',
    },
    imageWrapper: {
        position: 'relative',
        height: '300px',
        width: '100%',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
    },
    ratingBadge: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        background: 'white',
        padding: '6px 12px',
        borderRadius: '99px',
        fontSize: '0.85rem',
        fontWeight: 700,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
    content: {
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    meta: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '16px',
        fontSize: '0.8rem',
        fontWeight: 700,
        fontFamily: 'var(--font-mono)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
    },
    category: {
        color: 'var(--accent-blue)',
    },
    location: {
        opacity: 0.4,
    },
    title: {
        fontSize: '1.5rem',
        lineHeight: '1.25',
        marginBottom: '12px',
        color: 'var(--text-main)',
    },
    instructor: {
        fontSize: '0.95rem',
        color: 'var(--text-muted)',
        marginBottom: '32px',
    },
    footer: {
        marginTop: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingTop: '24px',
        borderTop: '1px solid var(--border-light)',
    },
    priceContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    label: {
        fontSize: '0.75rem',
        fontWeight: 700,
        opacity: 0.4,
        textTransform: 'uppercase',
    },
    price: {
        fontSize: '1.25rem',
        fontWeight: 800,
    },
    arrow: {
        color: 'var(--accent-blue)',
        transition: 'transform 0.3s ease',
    }
};
