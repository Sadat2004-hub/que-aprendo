import { defineField, defineType } from 'sanity'

export const institucionType = defineType({
    name: 'institucion',
    title: 'Instituciones y Cursos',
    type: 'document',
    fields: [
        defineField({
            name: 'order',
            title: 'Orden de aparición',
            description: 'Número para ordenar (ej. 1 para aparecer primero, 2 segundo...)',
            type: 'number',
            initialValue: 100,
        }),
        defineField({
            name: 'name',
            title: 'Nombre de la Institución o Proveedor',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug (URL)',
            description: 'Esto determinará la URL: queaprendo.com/slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'ciudad',
            title: 'Ciudad / Municipio',
            type: 'string',
            options: {
                list: [
                    { title: 'Oaxaca de Juárez', value: 'oaxaca' },
                    { title: 'San Felipe del Agua', value: 'san-felipe' },
                    { title: 'Santa Lucía del Camino', value: 'santa-lucia' },
                    { title: 'Santa Cruz Xoxocotlán', value: 'xoxo' },
                    { title: 'San Sebastián Tutla', value: 'tutla' },
                    { title: 'Puerto Escondido', value: 'puerto-escondido' },
                    { title: 'Huautla de Jiménez', value: 'huautla' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'categorias',
            title: 'Categorías Educativas',
            description: 'Selecciona todas las categorías que apliquen',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: '🎓 Doctorados y Maestrías', value: 'posgrados' },
                    { title: '📜 Diplomados y Certificaciones', value: 'diplomados' },
                    { title: '🏛️ Universidades y Carreras', value: 'universidades' },
                    { title: '🏫 Bachilleratos y Prepas', value: 'bachilleratos' },
                    { title: '💻 Tecnología y Programación', value: 'tecnologia' },
                    { title: '🌍 Idiomas y Cultura', value: 'idiomas' },
                    { title: '🍳 Gastronomía y Repostería', value: 'gastronomia' },
                    { title: '🎨 Arte, Diseño y Música', value: 'arte' },
                    { title: '🛠️ Oficios y Capacitación Técnica', value: 'oficios' },
                    { title: '🧒 Cursos para Niños y Verano', value: 'ninos' },
                    { title: '📈 Negocios y Emprendimiento', value: 'negocios' },
                ],
            },
            validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
            name: 'description',
            title: 'Descripción / Sobre Nosotros',
            type: 'text',
            rows: 6,
        }),
        defineField({
            name: 'address',
            title: 'Dirección Física',
            type: 'string',
        }),
        defineField({
            name: 'mapEmbedUrl',
            title: 'URL de Google Maps (Iframe src)',
            description: 'Copia solo el link dentro de src="..." del código de compartir mapa',
            type: 'string',
        }),
        defineField({
            name: 'telephone',
            title: 'WhatsApp de Contacto',
            description: 'Número sin el símbolo +, ej: 529511234567',
            type: 'string',
        }),
        defineField({
            name: 'mainImage',
            title: 'Imagen Principal / Logo',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'gallery',
            title: 'Galería de Fotos',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
        }),
        defineField({
            name: 'tags',
            title: 'Servicios Específicos',
            description: 'Ej: becas, clases-online, validez-sep, intensivo',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'openingHours',
            title: 'Horarios de Atención',
            type: 'array',
            of: [
                {
                    type: 'object',
                    title: 'Horario',
                    fields: [
                        { name: 'days', title: 'Días', type: 'string', description: 'Ej. Lunes a Sábado' },
                        { name: 'hours', title: 'Horas', type: 'string', description: 'Ej. 09:00 - 18:00' }
                    ]
                }
            ]
        }),
        defineField({
            name: 'priceRange',
            title: 'Rango de Precios',
            type: 'string',
            options: {
                list: [
                    { title: '$ - Accesible', value: '$' },
                    { title: '$$ - Moderado', value: '$$' },
                    { title: '$$$ - Premium', value: '$$$' },
                ],
            },
        }),
        defineField({
            name: 'rating',
            title: 'Calificación Inicial',
            description: 'Calificación de 1 a 5',
            type: 'number',
            initialValue: 4.8,
            validation: (Rule) => Rule.min(1).max(5),
        }),
        defineField({
            name: 'reviews',
            title: 'Reseñas de Alumnos',
            type: 'array',
            of: [
                {
                    type: 'object',
                    title: 'Reseña',
                    fields: [
                        { name: 'user', title: 'Nombre del Alumno', type: 'string' },
                        { name: 'rating', title: 'Calificación', type: 'number', validation: (Rule) => Rule.min(1).max(5) },
                        { name: 'comment', title: 'Comentario', type: 'text' },
                        { name: 'date', title: 'Fecha', type: 'date' },
                    ]
                }
            ]
        }),
    ],
})
