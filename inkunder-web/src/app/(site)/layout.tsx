import type { Metadata } from 'next'

import Footer from '@/components/site/Footer'
import Header from '@/components/site/Header'


// SEO cơ bản cho khu Public
export const metadata: Metadata = {
  title: {
    default: 'Ink Under Skin — Tattoo Studio',
    template: '%s | Ink Under Skin'
  },
  description: 'Tiệm xăm ở Quận 3, HCM — kinh nghiệm 10+ năm, nhận mọi thể loại. Đặt lịch nhanh!'
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  // KHÔNG bọc <html>/<body> ở đây (chỉ root layout mới có)
  return (
    <>
      <Header />
      <main className="min-h-dvh">{children}</main>
      <Footer />
    </>
  )
}