import type { Metadata } from "next";
export const metadata: Metadata = {
    title: 'Admin — Booking — Dashboard | Ink Under Skin',
    robots: { index: false, follow: false },
} as const;

export default function BookingDashboardPage() {
    return (
        <main>
            <h1>Trang booking của admin</h1>
            <p>Hiển thị khach booking o day</p>
        </main>
    )
}