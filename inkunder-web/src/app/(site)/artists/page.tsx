import type { Metadata } from "next";
export const metadata: Metadata = {
    title: 'Artists — Ink Under Skin',
    description: 'Danh sách artist của Ink Under Skin.',
} as const;

export default function ArtistsPage() {
    return (
        <main className="py-8 justify-items-center">
            <h1 className="text-red-500">Artists</h1>
            <p className="text-red-200">Placeholder danh sách artist.</p>
        </main>
    )
}