'use client';

import { useSearchParams } from 'next/navigation';
import { COURSES } from '@/lib/data';
import CourseCard from '@/components/CourseCard';
import { Suspense } from 'react';

function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q')?.toLowerCase() || '';

    const results = COURSES.filter(c =>
        c.title.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query) ||
        c.category.toLowerCase().includes(query) ||
        c.instructor.toLowerCase().includes(query)
    );

    return (
        <div className="container" style={{ padding: '60px 0' }}>
            <h1 style={{ marginBottom: '10px' }}>Resultados para: "{query}"</h1>
            <p style={{ color: 'var(--muted)', marginBottom: '40px' }}>
                Encontramos {results.length} curso{results.length !== 1 ? 's' : ''} que coinciden con tu búsqueda.
            </p>

            {results.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                    {results.map(course => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '60px', backgroundColor: '#fff', borderRadius: '12px' }}>
                    <h2>No hay resultados.</h2>
                    <p>Prueba buscando con otros términos como "Cocina", "Inglés" o "Diseño".</p>
                </div>
            )}
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <SearchResults />
        </Suspense>
    );
}
