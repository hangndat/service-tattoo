import { render, screen } from '@testing-library/react';

import AdminDashboardPage from '@/app/(admin)/admin/page';


describe('Admin routes skeleton', () => {
    it('Admin dashboard renders H1', () => {
        render(<AdminDashboardPage />);
        expect(screen.getByRole('heading', { level: 1, name: /admin/i })).toBeInTheDocument();
    });
});