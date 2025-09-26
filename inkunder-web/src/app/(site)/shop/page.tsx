import type { Metadata } from "next";
export const metadata: Metadata = {
    title: 'Ink Under Skin - Shoppage',
    description: 'Tattoo studio tại Quận 3, TP.HCM. Sản Phẩm sẽ đặt và làm',
} as const;

export default function ShopPage() {
    return (
        <main>
            <h1>Shop Page</h1>
            <p>Nội dung Shop Page</p>
        </main>
    )
}