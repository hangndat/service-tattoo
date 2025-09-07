# Development Tasks - Ink Under Skin Web Application

## Overview
This document outlines the development tasks for migrating the current HTML/CSS/JS tattoo service website to a modern Next.js 14 + TypeScript application with proper CI/CD, testing, and admin functionality.

---

## W1-01 — Init repo FE (mono-repo optional) + CI lint/test

**Goal:** Khởi tạo dự án Next.js 14 + TS, chuẩn hóa lint/prettier, git hooks, CI tối thiểu.

### Subtasks

#### 1. Tạo project
```bash
pnpm create next-app@latest inkunder-web --ts --eslint --src-dir --app --tailwind
cd inkunder-web && pnpm i -D @types/node @types/react @types/react-dom
```

#### 2. Cấu hình ESLint + Prettier
```bash
pnpm i -D prettier eslint-config-prettier eslint-plugin-import eslint-plugin-unused-imports
```

**Files to create/update:**
- `.prettierrc`
- `.eslintignore` 
- Update `.eslintrc.*` (enable unused-imports, import/order)

#### 3. Thiết lập Husky + lint-staged
```bash
pnpm dlx husky-init && pnpm i -D lint-staged
```

**Update `package.json`:**
```json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md,css}": ["prettier --write"]
  }
}
```

**Setup pre-commit hook:**
```bash
npx husky set .husky/pre-commit "pnpm lint-staged"
```

#### 4. Thêm Vitest + RTL (khung test)
```bash
pnpm i -D vitest @testing-library/react @testing-library/jest-dom jsdom @testing-library/user-event
```

**Files to create:**
- `vitest.config.ts`
- `setupTests.ts`

#### 5. CI (GitHub Actions tối thiểu)
Create `.github/workflows/ci.yml`:
- Node 20
- `pnpm i`
- `pnpm lint`
- `pnpm test -- --run`

### Definition of Done (DoD)
- [ ] `pnpm dev`, `pnpm build` chạy OK
- [ ] Commit tạo PR => CI chạy lint + test pass
- [ ] Pre-commit chặn code lỗi format/lint

**Estimate:** 6–8h  
**Dependencies:** —  
**Risks:** Sai version node/pnpm → fix .nvmrc, .npmrc

---

## W1-02 — Layout cơ bản: PublicSiteLayout & AdminLayout

**Goal:** Tách layout cho public vs admin, có header/footer/sider/breadcrumb.

### Subtasks

#### 1. Tạo PublicSiteLayout
**Files to create:**
- `app/(site)/layout.tsx`
- `components/site/Header.tsx`
- `components/site/Footer.tsx`

**Features:**
- Chuẩn SEO basic trong `<head>`
- Responsive design
- Navigation menu
- Footer with contact info

#### 2. Tạo AdminLayout
**Files to create:**
- `app/(admin)/admin/layout.tsx` (AntD Layout: Sider, Header, Content)
- `components/admin/AppSider.tsx`
- `components/admin/AppBreadcrumb.tsx`

**Features:**
- Ẩn menu theo route đang active
- Tối ưu mobile (Sider collapsible)
- Breadcrumb navigation
- Admin dashboard layout

#### 3. Testing
- Viết test render snapshot cho 2 layout
- Test responsive behavior
- Test navigation functionality

### Definition of Done (DoD)
- [ ] Điều hướng giữa `/` và `/admin` mượt, layout không vỡ
- [ ] Breadcrumb hiển thị đúng tiêu đề page
- [ ] Test layout pass
- [ ] Mobile responsive working

**Estimate:** 6–8h  
**Dependencies:** W1-01  
**Risks:** CSS conflict AntD + Tailwind → dùng @layer và reset chuẩn

---

## W1-03 — Routing (App Router) cho toàn site

**Goal:** Khai báo route & page trống (skeleton) để gắn dần feature.

### Routes Structure

#### Public Routes
- `/` - Homepage
- `/artists` - Artists listing
- `/artists/[slug]` - Individual artist page
- `/gallery` - Photo gallery
- `/consult` - Consultation booking
- `/booking` - Tattoo booking
- `/shop` - Product shop
- `/cart` - Shopping cart
- `/checkout` - Checkout process

#### Admin Routes
- `/admin` - Admin dashboard
- `/admin/artists` - Manage artists
- `/admin/portfolio` - Manage portfolio
- `/admin/products` - Manage products
- `/admin/bookings` - Manage bookings
- `/admin/analytics` - Analytics dashboard

### Subtasks

#### 1. Tạo folder theo App Router
```
app/
├── (site)/
│   ├── page.tsx                    # Homepage
│   ├── artists/
│   │   ├── page.tsx               # Artists listing
│   │   └── [slug]/
│   │       └── page.tsx           # Individual artist
│   ├── gallery/
│   │   └── page.tsx               # Gallery
│   ├── consult/
│   │   └── page.tsx               # Consultation
│   ├── booking/
│   │   └── page.tsx               # Booking
│   ├── shop/
│   │   └── page.tsx               # Shop
│   ├── cart/
│   │   └── page.tsx               # Cart
│   └── checkout/
│       └── page.tsx               # Checkout
└── (admin)/
    └── admin/
        ├── page.tsx               # Admin dashboard
        ├── artists/
        │   └── page.tsx           # Manage artists
        ├── portfolio/
        │   └── page.tsx           # Manage portfolio
        ├── products/
        │   └── page.tsx           # Manage products
        └── bookings/
            └── page.tsx           # Manage bookings
```

#### 2. Page Implementation
- Mỗi page render placeholder + title
- Basic SEO meta tags
- Consistent layout structure

#### 3. Error Handling
- Thêm `not-found.tsx` chung cho (site) và (admin)
- Custom 404 pages
- Error boundaries

### Definition of Done (DoD)
- [ ] Visit tất cả routes không lỗi 404 (trừ slug)
- [ ] Title/breadcrumb đúng
- [ ] Navigation working between all pages
- [ ] SEO meta tags present
- [ ] Error pages working

**Estimate:** 4–6h  
**Dependencies:** W1-02  
**Risks:** Nhầm group layout → kiểm tra (site) vs (admin)

---

## Additional Notes

### Technology Stack
- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **UI Library:** Ant Design (for admin)
- **Testing:** Vitest, React Testing Library
- **Linting:** ESLint, Prettier
- **Git Hooks:** Husky, lint-staged
- **CI/CD:** GitHub Actions

### Migration Strategy
1. **Phase 1:** Setup modern development environment (W1-01)
2. **Phase 2:** Create basic layouts and routing (W1-02, W1-03)
3. **Phase 3:** Migrate existing content and functionality
4. **Phase 4:** Add admin features and advanced functionality

### Current Website Assets to Migrate
- Artist portfolios (Banh, Nam, Trinh)
- Gallery images and organization
- Contact forms and booking system
- Responsive design patterns
- Mobile navigation

---

## W1-04 — Migrate Current Website Content & Functionality

**Goal:** Chuyển đổi toàn bộ nội dung và chức năng từ website HTML/CSS/JS hiện tại sang Next.js.

### Current Website Analysis

#### Existing Structure
- **Pages:** Home, Artists, Gallery, Contact, Flash Deals
- **Artists:** Banh, Nam (N2N), Trinh (Reklezz)
- **Gallery:** 3 styles (Old School, Neo Traditional, Realistic)
- **Images:** ~100+ tattoo photos organized by artist and style
- **Backend:** Basic Express.js with booking controller

#### Key Features to Migrate
- Hero banner with image carousel
- Artist portfolio pages with Instagram links
- Gallery with style filtering
- Contact forms and booking system
- Mobile-responsive navigation
- Real-time clock display
- Facebook booking integration

### Subtasks

#### 1. Data Migration
**Files to migrate:**
- `js/artists-data.js` → `lib/data/artists.ts`
- `js/gallery-banner.js` → `lib/data/gallery.ts`
- Artist descriptions and Instagram links
- Gallery styles and image paths

**Create TypeScript interfaces:**
```typescript
interface Artist {
  id: string;
  name: string;
  title: string;
  description: string;
  instagram: string;
  specialties: string[];
  gallery: string[];
}

interface GalleryStyle {
  key: string;
  name: string;
  images: string[];
}
```

#### 2. Image Assets Migration
**Organize images in Next.js public folder:**
```
public/
├── images/
│   ├── artists/
│   │   ├── banh/
│   │   ├── nam/
│   │   └── trinh/
│   ├── gallery/
│   │   ├── old-school/
│   │   ├── neo-traditional/
│   │   └── realistic/
│   ├── home/
│   └── ui/
```

**Tasks:**
- [ ] Copy all images from `images/` to `public/images/`
- [ ] Optimize images (WebP conversion, compression)
- [ ] Update image paths in data files
- [ ] Create responsive image components

#### 3. Component Migration

##### Home Page Components
- [ ] Hero section with image carousel
- [ ] Gallery link button
- [ ] Real-time clock display
- [ ] Mobile navigation

**Files to create:**
- `components/site/HeroSection.tsx`
- `components/site/ImageCarousel.tsx`
- `components/site/ClockDisplay.tsx`

##### Artist Pages
- [ ] Artist profile cards
- [ ] Instagram integration
- [ ] Portfolio galleries
- [ ] Booking buttons

**Files to create:**
- `components/site/ArtistCard.tsx`
- `components/site/ArtistProfile.tsx`
- `components/site/PortfolioGallery.tsx`

##### Gallery Components
- [ ] Style filter tabs
- [ ] Image grid with modal
- [ ] Lazy loading
- [ ] Mobile optimization

**Files to create:**
- `components/site/GalleryFilter.tsx`
- `components/site/ImageGrid.tsx`
- `components/site/ImageModal.tsx`

#### 4. Styling Migration
**CSS to Tailwind conversion:**
- [ ] `main.css` → Tailwind classes
- [ ] `styles/header.css` → Header component styles
- [ ] `styles/gallery-content.css` → Gallery components
- [ ] `styles/mobile/` → Responsive utilities
- [ ] `styles/vertical-menu.css` → Navigation components

**Key styles to preserve:**
- Hero section animations
- Gallery hover effects
- Mobile menu transitions
- Loading screen animations

#### 5. JavaScript Functionality Migration

##### Core Features
- [ ] Component loading system → React components
- [ ] Page initialization → useEffect hooks
- [ ] Navigation system → Next.js routing
- [ ] Modal system → React portals

##### Page-Specific Features
- [ ] Home banner carousel → React state management
- [ ] Gallery filtering → React state + filtering
- [ ] Artist page animations → Framer Motion
- [ ] Contact form handling → React Hook Form
- [ ] Mobile menu toggle → React state

**Files to create:**
- `hooks/useImageCarousel.ts`
- `hooks/useGalleryFilter.ts`
- `hooks/useMobileMenu.ts`
- `utils/animations.ts`

#### 6. Backend Integration
**Express.js to Next.js API routes:**
- [ ] `backend/controllers/bookingController.js` → `app/api/booking/route.ts`
- [ ] Contact form handling → `app/api/contact/route.ts`
- [ ] Image serving optimization

**API Routes to create:**
```
app/api/
├── booking/
│   └── route.ts
├── contact/
│   └── route.ts
└── gallery/
    └── route.ts
```

#### 7. SEO & Performance
**SEO improvements:**
- [ ] Meta tags for each page
- [ ] Open Graph images
- [ ] Structured data for artists
- [ ] Sitemap generation

**Performance optimizations:**
- [ ] Image optimization with Next.js Image
- [ ] Code splitting
- [ ] Lazy loading
- [ ] Bundle analysis

### Definition of Done (DoD)
- [ ] All pages render correctly with migrated content
- [ ] All images load and display properly
- [ ] Gallery filtering works as expected
- [ ] Artist pages show correct information
- [ ] Contact forms submit successfully
- [ ] Mobile responsiveness maintained
- [ ] Performance improved (Lighthouse score >90)
- [ ] SEO meta tags implemented
- [ ] All animations and interactions working

**Estimate:** 12–16h  
**Dependencies:** W1-01, W1-02, W1-03  
**Risks:** Image optimization issues, CSS conflicts, JavaScript functionality gaps

---

## W1-05 — Enhanced Features & Admin Panel

**Goal:** Thêm tính năng nâng cao và panel admin để quản lý nội dung.

### Subtasks

#### 1. Content Management System
**Admin features:**
- [ ] Artist management (CRUD)
- [ ] Gallery management with bulk upload
- [ ] Portfolio organization
- [ ] Booking management
- [ ] Contact form submissions

**Files to create:**
```
app/(admin)/admin/
├── artists/
│   ├── page.tsx
│   ├── [id]/
│   │   └── page.tsx
│   └── new/
│       └── page.tsx
├── gallery/
│   ├── page.tsx
│   └── upload/
│       └── page.tsx
├── bookings/
│   └── page.tsx
└── dashboard/
    └── page.tsx
```

#### 2. Advanced Gallery Features
- [ ] Image tagging and categorization
- [ ] Advanced filtering (artist, style, date)
- [ ] Search functionality
- [ ] Social sharing
- [ ] Image zoom and fullscreen

#### 3. Booking System Enhancement
- [ ] Calendar integration
- [ ] Time slot management
- [ ] Artist availability
- [ ] Email notifications
- [ ] Booking confirmation

#### 4. Analytics & Monitoring
- [ ] Google Analytics integration
- [ ] Page view tracking
- [ ] Gallery interaction metrics
- [ ] Contact form analytics

### Definition of Done (DoD)
- [ ] Admin panel fully functional
- [ ] Content management working
- [ ] Advanced gallery features implemented
- [ ] Booking system enhanced
- [ ] Analytics tracking active

**Estimate:** 8–12h  
**Dependencies:** W1-04  
**Risks:** Complex admin UI, database integration, third-party service setup

---

## W1-06 — Testing & Deployment

**Goal:** Comprehensive testing và deployment production.

### Subtasks

#### 1. Testing Implementation
- [ ] Unit tests for components
- [ ] Integration tests for API routes
- [ ] E2E tests for critical user flows
- [ ] Visual regression tests
- [ ] Performance testing

#### 2. Deployment Setup
- [ ] Vercel deployment configuration
- [ ] Environment variables setup
- [ ] CDN configuration for images
- [ ] SSL certificate setup
- [ ] Domain configuration

#### 3. Monitoring & Maintenance
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring
- [ ] Uptime monitoring
- [ ] Backup strategy

### Definition of Done (DoD)
- [ ] All tests passing
- [ ] Production deployment successful
- [ ] Monitoring systems active
- [ ] Performance benchmarks met
- [ ] Documentation complete

**Estimate:** 6–8h  
**Dependencies:** W1-05  
**Risks:** Deployment issues, performance bottlenecks, monitoring setup complexity

---

## Migration Checklist

### Pre-Migration
- [ ] Backup current website
- [ ] Document all current functionality
- [ ] List all image assets
- [ ] Identify third-party integrations

### During Migration
- [ ] Set up development environment
- [ ] Migrate data structures
- [ ] Convert components
- [ ] Test functionality
- [ ] Optimize performance

### Post-Migration
- [ ] Deploy to staging
- [ ] User acceptance testing
- [ ] Performance testing
- [ ] SEO verification
- [ ] Go live

### Success Criteria
- All existing functionality preserved
- Improved performance and SEO
- Modern development workflow
- Scalable architecture for future features
- Comprehensive testing coverage
