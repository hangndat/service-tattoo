import type { Metadata } from "next";
export const metadata: Metadata = {
    title: 'Gallery — Ink Under Skin',
    description: 'Bộ sưu tập hình xăm của Ink Under Skin',
} as const;

export default function GalleryPage() {
    return (
        <main className="p-4 justify-items-center">
            <h1>Gallery Page</h1>
            <p>Nội dung Gallery Page</p>
        </main>

    )
}