import type { Metadata } from "next";
export const metadata: Metadata = {
    title: 'Admin — Porfolio — Dashboard | Ink Under Skin',
    robots: { index: false, follow: false },
} as const;

export default function PorfolioDashboardPage() {
    return (
        <main>
            <h1>Trang Porfolio của admin</h1>
            <p>Hiển thị cac Porfolio cua shop o day</p>
        </main>
    )
}