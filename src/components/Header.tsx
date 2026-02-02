import Link from 'next/link';

export default function Header() {
    return (
        <header style={styles.header}>
            <div className="container" style={styles.container}>
                <Link href="/" style={styles.logo}>
                    que<span style={{ color: 'var(--accent-blue)' }}>aprendo</span>
                </Link>

                <nav style={styles.nav} className="mobile-hide">
                    <Link href="/oaxaca" style={styles.navLink}>Cursos</Link>
                    <Link href="/municipios" style={styles.navLink}>Lugares</Link>
                    <Link href="/blog" style={styles.navLink}>Revista</Link>
                </nav>

                <div style={styles.actions}>
                    <Link href="/unirse" className="btn-new btn-outline-new" style={styles.teachBtn}>
                        Enseñar
                    </Link>
                    <button style={styles.menuBtn}>
                        <div style={styles.menuIcon}></div>
                    </button>
                </div>
            </div>
        </header>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    header: {
        height: '100px',
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    logo: {
        fontSize: '2rem',
        fontWeight: 900,
        letterSpacing: '-0.05em',
        color: 'var(--text-main)',
        textDecoration: 'none',
    },
    nav: {
        display: 'flex',
        gap: '48px',
    },
    navLink: {
        fontWeight: 600,
        fontSize: '0.95rem',
        color: 'var(--text-main)',
        textDecoration: 'none',
        opacity: 0.8,
        transition: 'opacity 0.3s ease',
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
    },
    teachBtn: {
        padding: '12px 24px',
        fontSize: '0.9rem',
        borderWidth: '1.5px',
    },
    menuBtn: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '8px',
    },
    menuIcon: {
        width: '24px',
        height: '2px',
        backgroundColor: 'var(--text-main)',
        position: 'relative',
        transition: '0.3s',
        display: 'block',
    }
};
