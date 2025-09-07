# Ink Under Skin - Tattoo Service Website

A modern, responsive website for a tattoo service business featuring artist portfolios, gallery showcases, and booking functionality.

## 🎨 Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Artist Portfolios**: Individual pages showcasing different tattoo artists
- **Gallery System**: Organized photo galleries for different artists and styles
- **Contact & Booking**: Contact forms and booking system integration
- **Flash Deals**: Special offers and promotional content
- **Modern UI/UX**: Clean, professional design with smooth animations

## 🏗️ Project Structure

```
service-tattoo/
├── backend/                 # Node.js/Express backend
│   ├── app.js              # Main server file
│   ├── controllers/        # API controllers
│   ├── models/            # Data models
│   ├── routes/            # API routes
│   └── package.json       # Backend dependencies
├── components/            # Reusable HTML components
├── content/              # Page content templates
├── images/               # Image assets and galleries
├── js/                   # Frontend JavaScript
├── styles/               # CSS stylesheets
├── index.html            # Main homepage
├── artist.html           # Artist portfolio page
├── gallery.html          # Gallery page
├── contact.html          # Contact page
├── flash-deal.html       # Flash deals page
└── main.css              # Main stylesheet
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd service-tattoo
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Start the backend server**
   ```bash
   npm start
   ```
   The backend will run on `http://localhost:3001`

4. **Serve the frontend**
   You can serve the frontend using any static file server:
   
   **Option 1: Using Python (if installed)**
   ```bash
   # From the root directory
   python -m http.server 8000
   ```
   
   **Option 2: Using Node.js serve**
   ```bash
   npm install -g serve
   serve -s . -l 3000
   ```
   
   **Option 3: Using Live Server (VS Code extension)**
   - Install the "Live Server" extension in VS Code
   - Right-click on `index.html` and select "Open with Live Server"

## 📱 Pages

- **Home** (`index.html`) - Main landing page with featured content
- **Artists** (`artist.html`) - Individual artist portfolio pages
- **Gallery** (`gallery.html`) - Photo gallery showcasing tattoo work
- **Contact** (`contact.html`) - Contact information and booking forms
- **Flash Deals** (`flash-deal.html`) - Special offers and promotions

## 🎨 Artists

The website features portfolios for multiple tattoo artists:
- **Banh** - Specialized in detailed black and grey work
- **Nam** - Expert in traditional and neo-traditional styles
- **Trinh** - Known for realistic and portrait tattoos

## 🛠️ Technologies Used

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with flexbox/grid
- **Vanilla JavaScript** - Interactive functionality
- **Responsive Design** - Mobile-first approach

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **RESTful API** - API endpoints for booking and contact

## 📁 Key Directories

- `images/` - Contains all image assets organized by artist and gallery
- `js/` - JavaScript files for different page functionalities
- `styles/` - CSS files including responsive and mobile-specific styles
- `components/` - Reusable HTML components (header, footer, menu)
- `content/` - Page-specific content templates

## 🔧 Development

### Adding New Artists
1. Add artist images to `images/[artist-name]-gallery/`
2. Create product images in `images/galleryPages/[artist-name]-products/`
3. Update artist data in `js/artists-data.js`
4. Add artist content in `content/artists-content.html`

### Customizing Styles
- Main styles: `main.css`
- Page-specific styles: `styles/[page-name]-content.css`
- Mobile styles: `styles/mobile/`
- Responsive breakpoints: `styles/responsive.css`

## 📞 Contact & Booking

The website includes contact forms and booking functionality. The backend provides API endpoints for:
- Contact form submissions
- Booking requests
- Artist inquiries

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is proprietary software for Ink Under Skin tattoo service.

## 🤝 Contributing

This is a private project. For any issues or suggestions, please contact the development team.

---

**Ink Under Skin** - Where art meets skin
