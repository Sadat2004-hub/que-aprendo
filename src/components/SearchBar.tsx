'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar({ prominent = false }: { prominent?: boolean }) {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <form onSubmit={handleSearch} style={prominent ? styles.formProminent : styles.form}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="¿Qué quieres aprender hoy? Ej. Mezcal, Cocina, Diseño..."
                style={prominent ? styles.inputProminent : styles.input}
            />
            <button type="submit" className="btn-new" style={prominent ? styles.buttonProminent : styles.button}>
                {prominent ? 'Buscar Taller' : '🔍'}
            </button>
        </form>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    form: {
        display: 'flex',
        gap: '8px',
        width: '100%',
        backgroundColor: 'white',
        padding: '6px',
        borderRadius: '99px',
        border: '1px solid var(--border-light)',
    },
    formProminent: {
        display: 'flex',
        gap: '12px',
        width: '100%',
        backgroundColor: 'white',
        padding: '12px',
        borderRadius: '100px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
        border: '1px solid rgba(0,0,0,0.05)',
    },
    input: {
        flex: 1,
        padding: '12px 24px',
        borderRadius: '99px',
        border: 'none',
        fontSize: '0.9rem',
        outline: 'none',
        fontFamily: 'inherit',
    },
    inputProminent: {
        flex: 1,
        padding: '16px 32px',
        border: 'none',
        fontSize: '1.2rem',
        outline: 'none',
        fontFamily: 'inherit',
        fontWeight: 500,
    },
    button: {
        padding: '0 24px',
        fontSize: '0.9rem',
    },
    buttonProminent: {
        padding: '0 48px',
    }
};
