import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Ink Under Skin - Homepage',
    description: 'Tattoo studio tại Quận 3, TP.HCM. Book xăm mình',
} as const;

export default function BookingPage() {
    return (
        <main>
            <h1>Booking Page</h1>
            <p>Nội dung booking Page</p>
        </main>
    )
}