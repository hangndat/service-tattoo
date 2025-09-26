import type { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Admin — Dashboard | Ink Under Skin',
  robots: { index: false, follow: false },
} as const;

export default function AdminDashboardPage() {
  return (
    <main>
      <h1>Trang home của admin</h1>
      <p>Hiển thị toàn bộ thông tin tổng hợp chức năng admin ở đây</p>
    </main>
  )
}