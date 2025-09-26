'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SwitchLink() {
    const pathname = usePathname();

    // Nếu đang ở trang admin
    if (pathname.startsWith('/admin')) {
        return (
            <main className="mx-auto max-w-4xl px-4 py-16 text-center">
                <h1 className="text-2xl font-bold">404 — Không tìm thấy trang</h1>
                <p className="mt-2 text-muted-foreground">Vui lòng kiểm tra lại địa chỉ hoặc quay về trang Dashboard.</p>
                <Link href="/admin" className="text-sm underline decoration-red-50">
                    Quay lai Admin
                </Link>
            </main>

        );
    }

    // Nếu đang ở ngoài site
    return (
        <main className="mx-auto max-w-4xl px-4 py-16 text-center">
            <h1 className="text-2xl font-bold">404 — Không tìm thấy trang</h1>
            <p className="mt-2 text-muted-foreground">Vui lòng kiểm tra lại địa chỉ hoặc quay về trang Home.</p>
            <Link href="/" className="text-sm underline decoration-red-50">
                Quay lai  Home
            </Link>
        </main>
    );
}
