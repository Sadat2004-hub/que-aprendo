export default function UnirsePage() {
    return (
        <div style={styles.container}>
            <div className="container" style={styles.wrapper}>
                <div style={styles.card}>
                    <h1 style={styles.title}>Lleva tu enseñanza al siguiente nivel</h1>
                    <p style={styles.subtitle}>
                        En queaprendo.com te ayudamos a digitalizar tu oferta educativa y conectar con miles de estudiantes en Oaxaca.
                    </p>

                    <div style={styles.benefits}>
                        <div style={styles.benefit}>
                            <span style={styles.icon}>🎯</span>
                            <h3>Visibilidad Local</h3>
                            <p>Aparece en las búsquedas de Google para Oaxaca y sus municipios.</p>
                        </div>
                        <div style={styles.benefit}>
                            <span style={styles.icon}>📲</span>
                            <h3>Contacto Directo</h3>
                            <p>Los alumnos te contactan directamente por WhatsApp sin intermediarios.</p>
                        </div>
                        <div style={styles.benefit}>
                            <span style={styles.icon}>📊</span>
                            <h3>Control Total</h3>
                            <p>Gestiona tus cursos, precios y horarios de forma sencilla.</p>
                        </div>
                    </div>

                    <div style={styles.ctaBox}>
                        <h2>¿Listo para empezar?</h2>
                        <p>Contáctanos para registrar tu escuela o servicios profesionales.</p>
                        <a href="https://wa.me/526563230397?text=Hola,%20quisiera%20registrar%20mis%20cursos%20en%20queaprendo.com" className="btn btn-primary" style={styles.btn}>
                            Contactar por WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        padding: '80px 0',
        backgroundColor: 'var(--light-gray)',
        minHeight: '80vh',
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
    },
    card: {
        backgroundColor: 'var(--white)',
        padding: '60px',
        borderRadius: '20px',
        boxShadow: 'var(--shadow-lg)',
        maxWidth: '900px',
        width: '100%',
        textAlign: 'center',
    },
    title: {
        fontSize: '3rem',
        color: 'var(--primary)',
        marginBottom: '20px',
    },
    subtitle: {
        fontSize: '1.2rem',
        color: 'var(--muted)',
        marginBottom: '60px',
        maxWidth: '600px',
        margin: '0 auto 60px',
    },
    benefits: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '30px',
        marginBottom: '60px',
        textAlign: 'left',
    },
    benefit: {
        padding: '20px',
    },
    icon: {
        fontSize: '2.5rem',
        display: 'block',
        marginBottom: '15px',
    },
    ctaBox: {
        backgroundColor: '#F3F4F6',
        padding: '40px',
        borderRadius: '15px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px',
    },
    btn: {
        padding: '15px 40px',
        fontSize: '1.2rem',
        marginTop: '10px',
    }
};
