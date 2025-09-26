import type { Metadata } from "next";
export const metadata: Metadata = {
    title: 'Admin — Products — Dashboard | Ink Under Skin',
    robots: { index: false, follow: false },
} as const;

export default function ProductsDashboardPage() {
    return (
        <main>
            <h1>Trang Products của admin</h1>
            <p>Hiển thị cac Products cua shop o day</p>
        </main>
    )
}