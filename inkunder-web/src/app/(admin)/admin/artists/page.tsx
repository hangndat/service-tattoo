import type { Metadata } from "next";
export const metadata: Metadata = {
    title: 'Admin — Artists — Dashboard | Ink Under Skin',
    robots: { index: false, follow: false },
} as const;

export default function ArtistsDashboardPage() {
    return (
        <main>
            <h1>Trang arrtists của admin</h1>
            <p>Hiển thị cac artists o day</p>
        </main>
    )
}