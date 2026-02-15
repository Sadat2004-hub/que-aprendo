'use client'

import { MessageCircle } from 'lucide-react'

interface WhatsAppButtonProps {
    message?: string;
}

export default function WhatsAppButton({ message }: WhatsAppButtonProps) {
    const encodedMessage = message ? encodeURIComponent(message) : '';
    const whatsappUrl = `https://wa.me/529511999553${encodedMessage ? `?text=${encodedMessage}` : ''}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.button}
            aria-label="Contactar por WhatsApp"
        >
            <MessageCircle size={32} />
        </a>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    button: {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        backgroundColor: '#25D366',
        color: 'white',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: 1000,
        transition: 'transform 0.3s ease',
    },
}
