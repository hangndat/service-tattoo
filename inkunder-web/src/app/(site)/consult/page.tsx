import type { Metadata } from "next";
export const metadata: Metadata = {
    title: 'Ink Under Skin - Consultpage',
    description: 'Tattoo studio tại Quận 3, TP.HCM. tư vấn xăm',
} as const;

export default function CartPage() {
    return (
        <main >
            <h1>Consult Page</h1>
            <p>Nội dung Consult Page</p>
        </main>
    )
}