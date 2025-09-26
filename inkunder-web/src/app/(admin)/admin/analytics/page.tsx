import type { Metadata } from "next";
export const metadata: Metadata = {
    title: 'Admin — Analytics — Dashboard | Ink Under Skin',
    robots: { index: false, follow: false },
} as const;

export default function AnalyticsDashboardPage() {
    return (
        <main>
            <h1>Trang Analytics của admin</h1>
            <p>Hiển thị cac thong ke o day</p>
        </main>
    )
}