export const metadata = {
    title: "queaprendo | Marketplace Educativo en Oaxaca",
    description: "Encuentra los mejores cursos, talleres y escuelas en Oaxaca.",
    icons: {
        icon: '/favicon.ico',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es">
            <body style={{ margin: 0, padding: 0 }}>{children}</body>
        </html>
    );
}
