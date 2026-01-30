import Link from 'next/link';
import { Course } from '@/lib/data';

export default function CourseCard({ course }: { course: Course }) {
    return (
        <Link href={`/${course.municipio}/${course.category}/${course.slug}`} style={styles.card}>
            <div style={styles.imageWrapper}>
                <img src={course.image} alt={course.title} style={styles.image} />
                <span style={styles.badge}>{course.modality}</span>
            </div>
            <div style={styles.content}>
                <span style={styles.category}>{course.category.charAt(0).toUpperCase() + course.category.slice(1)}</span>
                <h3 style={styles.title}>{course.title}</h3>
                <p style={styles.instructor}>Por {course.instructor}</p>
                <div style={styles.footer}>
                    <div style={styles.priceContainer}>
                        <span style={styles.price}>${course.price.toLocaleString()}</span>
                        <span style={styles.currency}>{course.currency}</span>
                    </div>
                    <div style={styles.rating}>
                        ⭐️ {course.reviews.length > 0 ? (course.reviews.reduce((acc, r) => acc + r.rating, 0) / course.reviews.length).toFixed(1) : 'Nuevo'}
                    </div>
                </div>
            </div>
        </Link>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    card: {
        backgroundColor: 'var(--white)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease, boxShadow 0.3s ease',
    },
    imageWrapper: {
        position: 'relative',
        height: '180px',
        width: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    badge: {
        position: 'absolute',
        top: '12px',
        right: '12px',
        backgroundColor: 'rgba(0,0,0,0.6)',
        color: 'white',
        padding: '4px 10px',
        borderRadius: '20px',
        fontSize: '0.75rem',
        fontWeight: 600,
        textTransform: 'uppercase',
    },
    content: {
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    category: {
        fontSize: '0.75rem',
        fontWeight: 700,
        color: 'var(--secondary)',
        textTransform: 'uppercase',
        marginBottom: '0.5rem',
    },
    title: {
        fontSize: '1.1rem',
        marginBottom: '0.5rem',
        color: 'var(--foreground)',
        display: '-webkit-box',
        WebkitLineClamp: '2',
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        minHeight: '2.6rem',
    },
    instructor: {
        fontSize: '0.85rem',
        color: 'var(--muted)',
        marginBottom: '1rem',
    },
    footer: {
        marginTop: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '1rem',
        borderTop: '1px solid var(--border)',
    },
    priceContainer: {
        display: 'flex',
        alignItems: 'baseline',
        gap: '4px',
    },
    price: {
        fontSize: '1.25rem',
        fontWeight: 800,
        color: 'var(--primary)',
    },
    currency: {
        fontSize: '0.75rem',
        color: 'var(--muted)',
    },
    rating: {
        fontSize: '0.9rem',
        fontWeight: 600,
        color: '#F59E0B',
    }
};
