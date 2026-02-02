import Link from 'next/link';
import SearchBar from './SearchBar';

export default function Header() {
    return (
        <header style={styles.header}>
            <div className="container" style={styles.container}>
                <Link href="/" style={styles.logo}>
                    que<span style={{ fontWeight: 800 }}>aprendo</span><span style={{ color: 'var(--secondary)' }}>.</span><span style={{ fontWeight: 800 }}>com</span>
                </Link>

                <div style={styles.searchContainer}>
                    <SearchBar />
                </div>

                <nav style={styles.nav}>
                    <Link href="/unirse" className="btn btn-outline" style={styles.cta}>
                        Soy Instructor/Escuela
                    </Link>
                </nav>
            </div>
        </header>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    header: {
        height: 'var(--header-height)',
        backgroundColor: 'var(--white)',
        borderBottom: '1px solid var(--border)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        gap: '2rem',
    },
    logo: {
        fontSize: '1.5rem',
        color: 'var(--primary)',
        fontWeight: 600,
        letterSpacing: '-0.5px',
        display: 'flex',
        alignItems: 'center',
    },
    searchContainer: {
        flex: 1,
        maxWidth: '600px',
    },
    nav: {
        display: 'flex',
        alignItems: 'center',
    },
    cta: {
        whiteSpace: 'nowrap',
    }
};
