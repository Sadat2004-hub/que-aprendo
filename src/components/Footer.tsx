import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer style={styles.footer}>
            <div className="container" style={styles.container}>
                <div style={styles.grid}>
                    <div style={styles.section}>
                        <Link href="/" style={styles.logo}>
                            que<span style={{ fontWeight: 800 }}>aprendo.com</span>
                        </Link>
                        <p style={styles.tagline}>
                            Conectamos a quienes quieren enseñar con quienes desean aprender. El marketplace educativo de Oaxaca.
                        </p>
                    </div>

                    <div style={styles.section}>
                        <h4 style={styles.heading}>Explorar</h4>
                        <ul style={styles.list}>
                            <li><Link href="/oaxaca" style={styles.link}>Oaxaca de Juárez</Link></li>
                            <li><Link href="/oaxaca/gastronomia" style={styles.link}>Gastronomía</Link></li>
                            <li><Link href="/oaxaca/arte" style={styles.link}>Arte y Cultura</Link></li>
                            <li><Link href="/oaxaca/tecnologia" style={styles.link}>Tecnología</Link></li>
                        </ul>
                    </div>

                    <div style={styles.section}>
                        <h4 style={styles.heading}>Legales</h4>
                        <ul style={styles.list}>
                            <li><Link href="/privacidad" style={styles.link}>Aviso de Privacidad</Link></li>
                            <li><Link href="/terminos" style={styles.link}>Términos y Condiciones</Link></li>
                        </ul>
                    </div>

                    <div style={styles.section}>
                        <h4 style={styles.heading}>Contacto</h4>
                        <ul style={styles.list}>
                            <li style={styles.contactItem}>WhatsApp: +52 656 323 0397</li>
                            <li style={styles.contactItem}>Email: hola@queaprendo.com</li>
                            <li>
                                <Link href="/unirse" className="btn btn-secondary" style={styles.providerBtn}>
                                    Soy Instructor / Escuela
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div style={styles.bottom}>
                    <p>&copy; {currentYear} queaprendo.com. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    footer: {
        backgroundColor: '#1A1A1A',
        color: '#FFFFFF',
        padding: '60px 0 20px',
        marginTop: 'auto',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '40px',
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    logo: {
        fontSize: '1.5rem',
        color: '#FFFFFF',
        fontWeight: 600,
    },
    tagline: {
        color: '#AAAAAA',
        fontSize: '0.9rem',
        lineHeight: '1.6',
        maxWidth: '280px',
    },
    heading: {
        fontSize: '1.1rem',
        color: '#FFFFFF',
        fontWeight: 700,
        marginBottom: '10px',
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    link: {
        color: '#AAAAAA',
        fontSize: '0.9rem',
        transition: 'color 0.2s ease',
    },
    contactItem: {
        color: '#AAAAAA',
        fontSize: '0.9rem',
    },
    providerBtn: {
        marginTop: '10px',
        fontSize: '0.85rem',
        padding: '10px 15px',
    },
    bottom: {
        borderTop: '1px solid #333333',
        paddingTop: '20px',
        textAlign: 'center',
        fontSize: '0.85rem',
        color: '#777777',
    }
};
