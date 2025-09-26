// lib/routes.ts (giảm gõ sai đường dẫn)
export const routes = {
    home: '/',
    artists: '/artists',
    artist: (slug: string) => `/artists/${slug}`,
    gallery: '/gallery',
    booking: '/booking',
    cart: '/cart',
    checkout: '/checkout',
    consult: '/consult',
    shop: '/shop',
    admin: '/admin',
    adminArtists: '/admin/artists',
    adminPorfolio: '/admin/porfolio',
    adminProducts: '/admin/products',
    adminBookings: '/admin/bookings',
    adminAnalytics: '/admin/analytics'
} as const;