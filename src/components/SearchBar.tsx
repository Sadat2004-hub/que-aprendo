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
            <div style={styles.inputWrapper}>
                <span style={styles.icon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </span>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="¿Qué quieres aprender hoy? Ej. Inglés, Cocina..."
                    style={prominent ? styles.inputProminent : styles.input}
                />
            </div>
            <button type="submit" className="btn btn-primary" style={prominent ? styles.buttonProminent : styles.button}>
                {prominent ? 'Buscar ahora' : '🔍'}
            </button>
        </form>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    form: {
        display: 'flex',
        gap: '4px',
        width: '100%',
        backgroundColor: 'var(--background)',
        padding: '4px',
        borderRadius: 'var(--radius-full)',
        border: '1.5px solid var(--border)',
        transition: 'var(--transition)',
    },
    formProminent: {
        display: 'flex',
        gap: '8px',
        width: '100%',
        backgroundColor: 'white',
        padding: '12px',
        borderRadius: 'var(--radius-full)',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid rgba(0,0,0,0.05)',
    },
    inputWrapper: {
        position: 'relative',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        position: 'absolute',
        left: '20px',
        color: 'var(--primary)',
        display: 'flex',
        alignItems: 'center',
    },
    input: {
        width: '100%',
        padding: '12px 12px 12px 52px',
        borderRadius: 'var(--radius-full)',
        border: 'none',
        fontSize: '0.9rem',
        outline: 'none',
        backgroundColor: 'transparent',
        fontFamily: 'inherit',
    },
    inputProminent: {
        width: '100%',
        padding: '16px 16px 16px 60px',
        border: 'none',
        fontSize: '1.15rem',
        outline: 'none',
        backgroundColor: 'transparent',
        fontFamily: 'inherit',
        fontWeight: 500,
    },
    button: {
        borderRadius: 'var(--radius-full)',
        padding: '0 16px',
        height: '44px',
    },
    buttonProminent: {
        padding: '0 40px',
        fontSize: '1.1rem',
        height: '60px',
    }
};
