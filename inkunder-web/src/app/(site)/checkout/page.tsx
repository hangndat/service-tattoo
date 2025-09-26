import type { Metadata } from "next";
export const metadata: Metadata = {
    title: '',
    description: '',
} as const;

export default function CheckoutPage() {
    return (
        <main>
            <h1>Checkout page</h1>
            <p>Nội dung Checkout Page</p>
        </main>

    )
}