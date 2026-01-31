import Link from 'next/link';
import { Course } from '@/lib/data';

export default function CourseCard({ course }: { course: Course }) {
    return (
        <Link href={`/${course.municipio}/${course.category}/${course.slug}`} style={styles.card} className="glass-card">
            <div style={styles.imageContainer}>
                <img src={course.image} alt={course.title} style={styles.image} />
                <div style={styles.overlay}>
                    <span className="badge-tech" style={styles.modality}>{course.modality}</span>
                </div>
            </div>
            <div style={styles.body}>
                <div style={styles.meta}>
                    <span style={styles.category}>{course.category}</span>
                    <span style={styles.rating}>★ 4.9</span>
                </div>
                <h3 style={styles.title}>{course.title}</h3>
                <p style={styles.instructor}>por {course.instructor}</p>
                <div style={styles.footer}>
                    <div style={styles.priceContainer}>
                        <span style={styles.price}>${course.price.toLocaleString()}</span>
                        <span style={styles.currency}>{course.currency}</span>
                    </div>
                    <div style={styles.arrowContainer}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </div>
                </div>
            </div>
        </Link>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    card: {
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: 'white',
    },
    imageContainer: {
        position: 'relative',
        height: '220px',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'transform 0.6s ease',
    },
    overlay: {
        position: 'absolute',
        top: '16px',
        left: '16px',
        zIndex: 10,
    },
    modality: {
        backgroundColor: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(4px)',
        border: 'none',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
    body: {
        padding: '24px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    meta: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px',
    },
    category: {
        fontSize: '0.75rem',
        fontWeight: 800,
        textTransform: 'uppercase',
        color: 'var(--primary)',
        letterSpacing: '0.05em',
    },
    rating: {
        fontSize: '0.85rem',
        fontWeight: 700,
        color: '#F59E0B',
    },
    title: {
        fontSize: '1.25rem',
        lineHeight: '1.4',
        marginBottom: '10px',
        color: 'var(--text)',
        height: '2.8em',
        overflow: 'hidden',
    },
    instructor: {
        fontSize: '0.9rem',
        color: 'var(--text-muted)',
        marginBottom: '20px',
    },
    footer: {
        marginTop: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '16px',
        borderTop: '1px solid var(--border)',
    },
    priceContainer: {
        display: 'flex',
        alignItems: 'baseline',
        gap: '4px',
    },
    price: {
        fontSize: '1.4rem',
        fontWeight: 800,
        color: 'var(--text)',
    },
    currency: {
        fontSize: '0.8rem',
        color: 'var(--text-muted)',
    },
    arrowContainer: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: 'var(--background)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--primary)',
        transition: 'var(--transition)',
    }
};
