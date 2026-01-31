import Link from 'next/link';
import { Course } from '@/lib/data';

export default function CourseCard({ course }: { course: Course }) {
    return (
        <Link href={`/${course.municipio}/${course.category}/${course.slug}`} style={styles.card} className="glass-card">
            <div style={styles.imageBox}>
                <img src={course.image} alt={course.title} style={styles.image} />
                <span style={styles.badge}>{course.modality}</span>
            </div>
            <div style={styles.body}>
                <span style={styles.category}>{course.category}</span>
                <h3 style={styles.title}>{course.title}</h3>
                <p style={styles.instructor}>por <strong>{course.instructor}</strong></p>

                <div style={styles.footer}>
                    <div style={styles.priceContainer}>
                        <span style={styles.price}>${course.price.toLocaleString()}</span>
                        <span style={styles.currency}>MXN</span>
                    </div>
                    <div style={styles.rating}>⭐ 4.9</div>
                </div>
            </div>
        </Link>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backgroundColor: 'white',
    },
    imageBox: {
        position: 'relative',
        height: '240px',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    badge: {
        position: 'absolute',
        top: '16px',
        right: '16px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        color: 'var(--text)',
        padding: '4px 12px',
        borderRadius: '8px',
        fontSize: '0.75rem',
        fontWeight: 700,
    },
    body: {
        padding: '24px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    category: {
        fontSize: '0.75rem',
        fontWeight: 800,
        color: 'var(--primary)',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        marginBottom: '8px',
    },
    title: {
        fontSize: '1.25rem',
        lineHeight: '1.4',
        marginBottom: '12px',
        color: 'var(--dark-bg)',
        fontWeight: 700,
        display: '-webkit-box',
        WebkitLineClamp: '2',
        WebkitBoxOrient: 'vertical',
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
        paddingTop: '20px',
        borderTop: '1px solid #f0f0f0',
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
    rating: {
        fontSize: '0.9rem',
        fontWeight: 700,
    }
};
