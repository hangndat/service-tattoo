import type { Metadata } from "next";
export const metadata: Metadata = {
    title: 'Ink Under Skin - Cartpage',
    description: 'Tattoo studio tại Quận 3, TP.HCM. Sản Phẩm sẽ đặt và làm',
} as const;

export default function CartPage() {
    return (
        <main>
            <h1>Cart Page</h1>
            <p>Nội dung Cart Page</p>
        </main>
    )
}