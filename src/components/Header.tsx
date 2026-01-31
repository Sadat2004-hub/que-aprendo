import Link from 'next/link';
import SearchBar from './SearchBar';

export default function Header() {
    return (
        <header style={styles.header}>
            <div className="container" style={styles.container}>
                <Link href="/" style={styles.logo}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                    que<span style={{ color: 'var(--primary)', fontWeight: 800 }}>aprendo</span>
                </Link>

                <div className="hide-on-mobile" style={styles.searchWrapper}>
                    <SearchBar />
                </div>

                <nav style={styles.nav}>
                    <Link href="/unirse" className="btn btn-primary" style={styles.navBtn}>
                        Dar Clases
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
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border)',
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    logo: {
        fontSize: '1.4rem',
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        color: 'var(--dark-bg)',
        letterSpacing: '-0.5px',
    },
    searchWrapper: {
        flex: 1,
        maxWidth: '450px',
        margin: '0 40px',
    },
    nav: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
    },
    navBtn: {
        padding: '10px 24px',
        fontSize: '0.9rem',
        boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)',
    }
};
