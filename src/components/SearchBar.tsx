'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar({ prominent = false }: { prominent?: boolean }) {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            // For now, redirect to a search page or back to home with query
            router.push(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <form onSubmit={handleSearch} style={prominent ? styles.formProminent : styles.form}>
            <div style={styles.inputWrapper}>
                <span style={styles.icon}>🔍</span>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="¿Qué quieres aprender hoy? Ej. Inglés, Cocina, Excel..."
                    style={prominent ? styles.inputProminent : styles.input}
                />
            </div>
            <button type="submit" className="btn btn-primary" style={prominent ? styles.buttonProminent : styles.button}>
                {prominent ? 'Buscar cursos' : 'Buscar'}
            </button>
        </form>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    form: {
        display: 'flex',
        gap: '8px',
        width: '100%',
    },
    formProminent: {
        display: 'flex',
        flexDirection: 'row',
        gap: '0',
        width: '100%',
        boxShadow: 'var(--shadow-lg)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        backgroundColor: 'var(--white)',
    },
    inputWrapper: {
        position: 'relative',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        position: 'absolute',
        left: '16px',
        color: 'var(--muted)',
    },
    input: {
        width: '100%',
        padding: '10px 12px 10px 40px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border)',
        fontSize: '0.9rem',
        outline: 'none',
    },
    inputProminent: {
        width: '100%',
        padding: '20px 20px 20px 50px',
        border: 'none',
        fontSize: '1.1rem',
        outline: 'none',
    },
    button: {
        padding: '8px 20px',
    },
    buttonProminent: {
        borderRadius: '0',
        padding: '0 40px',
        fontSize: '1.1rem',
    }
};
