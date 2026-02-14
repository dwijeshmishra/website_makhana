# Samarth Overseas - Premium Export Website

A modern, responsive website for Samarth Overseas, a premium product exporter from India.

## 🌟 Features

### Design & User Experience
- **Modern, Elegant Design** - Sophisticated color palette with Playfair Display and DM Sans typography
- **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- **Smooth Animations** - Engaging scroll-triggered animations and micro-interactions
- **Professional Layout** - Clean, organized sections with excellent readability

### Sections
1. **Hero Section** - Eye-catching introduction with key stats
2. **About Section** - Company story, mission, and values
3. **Products Section** - Three-tier product showcase (Jumbo, Super, Standard grades)
4. **Quality Section** - Certifications and quality process
5. **Export Section** - Global capabilities and markets served
6. **Contact Section** - Professional contact form and company details

### Technical Features
- Intersection Observer for scroll animations
- Smooth scrolling navigation
- Mobile-friendly hamburger menu
- Active navigation highlighting
- Form validation
- Counter animations for statistics
- SEO-optimized structure
- Accessible markup

## 🚀 Quick Start

### Option 1: Static Deployment (Recommended)

1. **Download Files**
   - Download `index.html`, `styles.css`, and `script.js`
   - Keep them in the same directory

2. **Deploy to Vercel** (Current Setup)
   ```bash
   # Already configured in your repo
   git add .
   git commit -m "Update website design"
   git push origin master
   ```
   Vercel will automatically deploy your changes.

3. **Or Deploy to Netlify**
   - Drag and drop the folder to Netlify
   - Or connect your GitHub repository

### Option 2: Local Development

1. **Clone Repository**
   ```bash
   git clone https://github.com/dwijeshmishra/website_makhana.git
   cd website_makhana
   ```

2. **Open in Browser**
   - Simply open `index.html` in your browser
   - Or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```

3. **Or Use VS Code Live Server**
   - Install Live Server extension
   - Right-click `index.html` → "Open with Live Server"

## 📁 File Structure

```
website_makhana/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # JavaScript functionality
├── README.md           # This file
└── assets/            # Images and media (to be added)
    ├── images/
    ├── icons/
    └── logos/
```

## 🎨 Customization Guide

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary: #2C5530;        /* Main brand color */
    --accent: #D4AF37;         /* Gold accent */
    --dark: #1A1A1A;           /* Text color */
    --light: #F8F6F3;          /* Background */
}
```

### Typography
Currently using:
- **Display Font**: Playfair Display (headings)
- **Body Font**: DM Sans (body text)

To change fonts, update the Google Fonts link in `index.html` and CSS variables.

### Content
1. **Company Information**: Update in Contact section
2. **Product Details**: Modify product cards in Products section
3. **Stats**: Edit numbers in Hero section
4. **Certifications**: Update in Quality section

### Images
To add images:
1. Create an `assets/images/` folder
2. Add your images
3. Update the HTML image references
4. For hero image: Replace the `.image-frame::before` content in CSS

## 🔧 Adding Features

### Add Real Images
```html
<!-- Replace placeholder in hero -->
<div class="image-frame">
    <img src="assets/images/makhana-hero.jpg" alt="Premium Makhana">
</div>
```

### Connect Contact Form to Backend
Update the form submission in `script.js`:
```javascript
const response = await fetch('YOUR_API_ENDPOINT', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
});
```

### Add More Sections
Follow the existing section structure:
```html
<section class="new-section" id="new">
    <div class="container">
        <div class="section-header">
            <span class="section-label">Label</span>
            <h2 class="section-title">Title</h2>
        </div>
        <!-- Content -->
    </div>
</section>
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 SEO Optimization

Current optimizations:
- Semantic HTML5 structure
- Meta descriptions
- Heading hierarchy (H1, H2, H3)
- Alt text ready for images
- Fast loading times
- Mobile-responsive

To improve further:
1. Add alt text to all images when added
2. Create sitemap.xml
3. Add robots.txt
4. Implement schema markup for local business
5. Add Open Graph tags for social sharing

## 📊 Performance

Current features for performance:
- Minimal CSS and JavaScript
- No external dependencies (except Google Fonts)
- Optimized animations using CSS transforms
- Lazy loading ready for images
- Efficient event listeners

## 🔐 Security

For production:
1. Add HTTPS (handled by Vercel/Netlify)
2. Implement CSRF protection on form
3. Add rate limiting to contact form
4. Sanitize user inputs server-side
5. Add Content Security Policy headers

## 📝 TODO / Enhancements

- [ ] Add real product images
- [ ] Connect contact form to email service (SendGrid, Mailgun, etc.)
- [ ] Add image gallery/carousel
- [ ] Implement testimonials slider
- [ ] Add blog section
- [ ] Create downloadable product catalogs
- [ ] Add multi-language support
- [ ] Implement live chat (WhatsApp integration)
- [ ] Add Google Analytics
- [ ] Create admin panel for content management

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is created for Samarth Overseas. All rights reserved.

## 📞 Support

For questions or support:
- Email: info@samarthoverseasindia.com
- Website: [https://website-makhana.vercel.app](https://website-makhana.vercel.app)

## 🙏 Acknowledgments

- Design inspired by modern export business websites
- Icons: Unicode emojis (can be replaced with Font Awesome or custom SVGs)
- Fonts: Google Fonts (Playfair Display, DM Sans)

---

**Built with ❤️ for Samarth Overseas - Exporting Excellence Worldwide**
