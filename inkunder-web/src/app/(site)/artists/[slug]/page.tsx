import type { Metadata } from "next";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Artist — ${slug} | Ink Under Skin`,
    robots: { index: true, follow: true },
  };
}

export default async function ArtistDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  return (
    <main>
      <h1>Artist: {slug}</h1>
    </main>
  );
}
