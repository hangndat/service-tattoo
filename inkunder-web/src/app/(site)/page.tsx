import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Ink Under Skin - Homepage',
  description: 'Tattoo studio tại Quận 3, TP.HCM. Đặt lịch tư vấn và xem portfolio.',
  robots: {index: true, follow: true},
} as const;

export default function Homepage () {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="">Home Page</h1>
      <p>Nội dung Home Page</p>
    </main>
  )
}