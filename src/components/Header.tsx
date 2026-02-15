import Link from 'next/link';
import { School } from 'lucide-react';

export default function Header() {
    return (
        <header style={styles.header} className="header-mobile-reset">
            <div className="container container-mobile-column" style={styles.container}>
                <Link href="/" style={styles.logo} className="logo-mobile-center">
                    que<span style={{ fontWeight: 800 }}>aprendo</span><span style={{ color: 'var(--secondary)' }}>.</span><span style={{ fontWeight: 800 }}>com</span>
                </Link>

                <nav style={styles.nav} className="nav-mobile-center">
                    <Link href="/unirse" style={styles.cta}>
                        <School size={20} strokeWidth={2.5} />
                        <span>Soy Instructor / Escuela</span>
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
    },
    logo: {
        fontSize: '1.8rem',
        color: 'var(--primary)',
        fontWeight: 600,
        letterSpacing: '-0.5px',
        display: 'flex',
        alignItems: 'center',
    },
    nav: {
        display: 'flex',
        alignItems: 'center',
    },
    cta: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        backgroundColor: 'var(--secondary)',
        color: 'white',
        padding: '12px 28px',
        borderRadius: '50px',
        fontWeight: 700,
        fontSize: '1rem',
        boxShadow: '0 4px 14px 0 rgba(204, 85, 0, 0.35)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        whiteSpace: 'nowrap',
    }
};
