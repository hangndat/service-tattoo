// src/components/site/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname() ?? ""; // tránh null
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="border-b">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/">Ink Under Skin</Link>

        <button aria-label="Mở menu" className="md:hidden" onClick={() => setOpen((v) => !v)}>
          ☰
        </button>

        <nav className="hidden md:flex gap-4">
          <Link href="/" className={isActive("/") ? "font-medium underline" : ""}>
            Trang chủ
          </Link>
          <Link href="/about" className={isActive("/about") ? "font-medium underline" : ""}>
            Giới thiệu
          </Link>
          <Link href="/services" className={isActive("/services") ? "font-medium underline" : ""}>
            Dịch vụ
          </Link>
          <Link href="/contact" className={isActive("/contact") ? "font-medium underline" : ""}>
            Liên hệ
          </Link>
          <Link href="/admin" className={isActive("/admin") ? "font-medium underline" : ""}>
            Admin
          </Link>
        </nav>
      </div>

      {open && (
        <div data-testid="mobile-menu" className="px-4 pb-3 flex flex-col gap-2 border-top">
          <Link href="/">Trang chủ</Link>
          <Link href="/about">Giới thiệu</Link>
          <Link href="/services">Dịch vụ</Link>
          <Link href="/contact">Liên hệ</Link>
          <Link href="/admin">Admin</Link>
        </div>
      )}
    </header>
  );
}
