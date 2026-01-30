export default function WhatsAppButton({
    phoneNumber = '526563230397',
    message = 'Hola, me gustaría pedir informes de un curso en queaprendo.com'
}) {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.button}
            aria-label="Contactar por WhatsApp"
        >
            <div style={styles.iconWrapper}>
                <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginRight: '8px' }}
                >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
                <span>Pedir informes del curso</span>
            </div>
        </a>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    button: {
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        backgroundColor: '#25D366',
        color: '#FFFFFF',
        padding: '12px 24px',
        borderRadius: '40px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        fontWeight: 700,
        fontSize: '0.95rem',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    },
    iconWrapper: {
        display: 'flex',
        alignItems: 'center',
    }
};
