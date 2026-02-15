'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, GraduationCap } from 'lucide-react';

export default function SearchBar({ prominent = false }: { prominent?: boolean }) {
    const [query, setQuery] = useState('');
    const [city, setCity] = useState('oaxaca');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}&city=${city}`);
        } else {
            router.push(`/${city}`);
        }
    };

    return (
        <form onSubmit={handleSearch} style={prominent ? styles.formProminent : styles.form}>
            <div style={styles.inputGroup}>
                <div style={styles.selectWrapper}>
                    <MapPin size={18} style={styles.icon} />
                    <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        style={styles.select}
                    >
                        <option value="oaxaca">Oaxaca de Juárez</option>
                        <option value="puerto-escondido">Puerto Escondido</option>
                        <option value="huatulco">Huatulco</option>
                        <option value="xoxo">Xoxocotlán</option>
                        <option value="santa-lucia">Santa Lucía</option>
                    </select>
                </div>

                <div style={styles.divider}></div>

                <div style={styles.inputWrapper}>
                    <GraduationCap size={18} style={styles.icon} />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="¿Qué quieres aprender?"
                        style={styles.input}
                    />
                </div>
            </div>

            <button type="submit" className="btn btn-primary" style={styles.button}>
                <Search size={20} />
                <span style={styles.buttonText}>{prominent ? 'Buscar Ahora' : ''}</span>
            </button>
        </form>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    form: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'var(--white)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border)',
        padding: '4px',
        width: '100%',
        maxWidth: '500px',
    },
    formProminent: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'var(--white)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)',
        padding: '8px',
        width: '100%',
        maxWidth: '800px',
    },
    inputGroup: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
    },
    selectWrapper: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        minWidth: '160px',
    },
    select: {
        border: 'none',
        outline: 'none',
        fontSize: '0.95rem',
        fontWeight: 500,
        backgroundColor: 'transparent',
        width: '100%',
        cursor: 'pointer',
    },
    divider: {
        width: '1px',
        height: '24px',
        backgroundColor: 'var(--border)',
    },
    inputWrapper: {
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        padding: '0 12px',
    },
    input: {
        border: 'none',
        outline: 'none',
        fontSize: '0.95rem',
        width: '100%',
        padding: '10px 0',
    },
    icon: {
        marginRight: '10px',
        color: 'var(--muted)',
    },
    button: {
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        height: '100%',
    },
    buttonText: {
        display: 'inline',
    }
};
