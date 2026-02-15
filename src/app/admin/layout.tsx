import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
    title: "Que Aprendo Admin",
    description: "Panel de administración para Que Aprendo",
};

export const viewport: Viewport = {
    themeColor: "#0047AB",
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div style={{ margin: 0, padding: 0, height: "100vh" }}>
            {children}
        </div>
    );
}
