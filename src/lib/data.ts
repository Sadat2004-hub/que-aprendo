export interface Review {
  id: string;
  rating: number;
  comment: string;
  userName: string;
  date: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  instructor: string;
  instructorBio?: string;
  price: number;
  currency: string;
  duration: string;
  category: string;
  location: string;
  municipio: string;
  image: string;
  modality: 'presencial' | 'online' | 'hibrido';
  reviews: Review[];
  featured?: boolean;
}

export const CATEGORIES = [
  { id: 'gastronomia', name: 'Gastronomía y Bebidas', icon: '🍳' },
  { id: 'arte', name: 'Arte y Creatividad', icon: '🎨' },
  { id: 'tecnologia', name: 'Tecnología y Negocios', icon: '💻' },
  { id: 'idiomas', name: 'Idiomas y Cultura', icon: '🌍' },
  { id: 'oficios', name: 'Oficios', icon: '🛠️' },
  { id: 'ninos', name: 'Niños', icon: '🧒' },
];

export const MUNICIPIOS = [
  { id: 'oaxaca', name: 'Oaxaca de Juárez' },
  { id: 'san-felipe-del-agua', name: 'San Felipe del Agua' },
  { id: 'santa-lucia-del-camino', name: 'Santa Lucía del Camino' },
];

export const COURSES: Course[] = [
  {
    id: '1',
    slug: 'diplomado-en-mezcal',
    title: 'Diplomado en Mezcal y Cultura',
    description: 'Aprende sobre la historia, producción y cata de los mejores mezcales de Oaxaca. Un recorrido sensorial por nuestras tradiciones.',
    instructor: 'Maestro Mezcalero Juan García',
    price: 4500,
    currency: 'MXN',
    duration: '40 horas',
    category: 'gastronomia',
    municipio: 'oaxaca',
    location: 'Centro Histórico, Oaxaca',
    image: 'https://images.unsplash.com/photo-1569470451072-68314f596acc?auto=format&fit=crop&q=80&w=800',
    modality: 'presencial',
    reviews: [
      { id: 'r1', rating: 5, comment: 'Increíble experiencia, muy educativo.', userName: 'Ana M.', date: '2024-01-15' }
    ]
  },
  {
    id: '2',
    slug: 'taller-cocina-oaxaquena-ancestral',
    title: 'Taller de Cocina Oaxaqueña Ancestral',
    description: 'Descubre los secretos del mole y las tortillas a mano en una cocina de humo tradicional.',
    instructor: 'Cocinera Tradicional Doña Rosa',
    price: 1200,
    currency: 'MXN',
    duration: '6 horas',
    category: 'gastronomia',
    municipio: 'oaxaca',
    location: 'Barrio de Jalatlaco, Oaxaca',
    image: 'https://images.unsplash.com/photo-1505253149613-112d21d9f6a9?auto=format&fit=crop&q=80&w=800',
    modality: 'presencial',
    reviews: []
  },
  {
    id: '3',
    slug: 'taller-de-grafica-popular',
    title: 'Taller de Gráfica y Grabado',
    description: 'Aprende las técnicas tradicionales de grabado en madera y linóleo con artistas locales.',
    instructor: 'Colectivo Gráfica Viva',
    price: 2800,
    currency: 'MXN',
    duration: '20 horas',
    category: 'arte',
    municipio: 'oaxaca',
    location: 'Santo Domingo, Oaxaca',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800',
    modality: 'presencial',
    reviews: []
  },
  {
    id: '4',
    slug: 'marketing-para-pymes',
    title: 'Marketing Digital para PyMEs Locales',
    description: 'Estrategias prácticas para hacer crecer tu negocio en Oaxaca usando redes sociales y Google.',
    instructor: 'Lic. Roberto Sánchez',
    price: 3200,
    currency: 'MXN',
    duration: '15 horas',
    category: 'tecnologia',
    municipio: 'oaxaca',
    location: 'Colonia Reforma, Oaxaca',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    modality: 'hibrido',
    reviews: []
  }
];
