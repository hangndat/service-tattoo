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
    <header className="border-t border-r border-l">
      <div className="w-full py-3 flex justify-between px-4">
        <Link href="/">Ink Under Skin</Link>

        <button aria-label="Mở menu" className="md:hidden" onClick={() => setOpen((v) => !v)}>
          ☰
        </button>

        <nav className="hidden md:flex gap-4">
          <Link href="/" className={isActive("/") ? "font-medium underline" : ""}>
            Trang chủ
          </Link>
          <Link href="/artists" className={isActive("/artists") ? "font-medium underline" : ""}>
            Artists
          </Link>
          <Link href="/shop" className={isActive("/shop") ? "font-medium underline" : ""}>
            Shop
          </Link>
          <Link href="/gallery" className={isActive("/gallery") ? "font-medium underline" : ""}>
            Gallery
          </Link>
          <Link href="/booking" className={isActive("/booking") ? "font-medium underline" : ""}>
            Booking
          </Link>
          <Link href="/cart" className={isActive("/cart") ? "font-medium underline" : ""}>
            Cart
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
