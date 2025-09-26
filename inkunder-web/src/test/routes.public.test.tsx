import { render, screen } from '@testing-library/react';

import ArtistDetailPage from '@/app/(site)/artists/[slug]/page';
import ArtistsPage from '@/app/(site)/artists/page';
import GalleryPage from '@/app/(site)/gallery/page';
import HomePage from '@/app/(site)/page';

async function renderArtist(slug: string) {
  
  const element = await ArtistDetailPage({ params: Promise.resolve({ slug }) });
  render(element);
}

it('renders slug in H1', async () => {
  await renderArtist('trinh');
  expect(screen.getByRole('heading', { name: /trinh/i })).toBeInTheDocument();
});

describe('Public routes skeleton', () => {
    it('Homepage renders H1', () => {
        render(<HomePage />);
        expect(
            screen.getByRole('heading', { level: 1, name: /./ })
        ).toBeInTheDocument();
    });

    it('Artists renders H1', () => {
        render(<ArtistsPage />);
        expect(
            screen.getByRole('heading', { level: 1, name: /artists/i })
        ).toBeInTheDocument();
    });

    it('Gallery renders H1', () => {
        render(<GalleryPage />);
        expect(
            screen.getByRole('heading', { level: 1, name: /gallery/i })
        ).toBeInTheDocument();
    });
});

