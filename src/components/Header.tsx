import Link from 'next/link';
import SearchBar from './SearchBar';

export default function Header() {
    return (
        <header style={styles.header} className="glass-nav">
            <div className="container" style={styles.container}>
                <Link href="/" style={styles.logo}>
                    que<span style={{ color: 'var(--primary)', fontWeight: 800 }}>aprendo</span>
                    <div style={styles.logoDot}></div>
                </Link>

                <div style={styles.searchWrapper}>
                    <SearchBar />
                </div>

                <nav style={styles.nav}>
                    <Link href="/unirse" className="btn btn-ghost" style={styles.navLink}>
                        Enseñar
                    </Link>
                    <Link href="/login" style={styles.loginLink}>
                        Entrar
                    </Link>
                </nav>
            </div>
        </header>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    header: {
        height: 'var(--header-height)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        transition: 'var(--transition)',
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        gap: '40px',
    },
    logo: {
        fontSize: '1.6rem',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        color: 'var(--text)',
    },
    logoDot: {
        width: '6px',
        height: '6px',
        backgroundColor: 'var(--secondary)',
        borderRadius: '50%',
        marginLeft: '2px',
        marginTop: '12px',
    },
    searchWrapper: {
        flex: 1,
        maxWidth: '500px',
        display: 'none', // Hide on mobile in JS, use media query logic
    },
    nav: {
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
    },
    navLink: {
        padding: '10px 24px',
        fontSize: '0.9rem',
    },
    loginLink: {
        fontWeight: 600,
        fontSize: '0.95rem',
        color: 'var(--text)',
    }
};
