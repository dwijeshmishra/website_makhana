# Deployment Guide - Samarth Overseas Website

## 🚀 Quick Deploy to Vercel (Recommended - Already Set Up)

Your repository is already connected to Vercel. Just push your changes:

```bash
git add .
git commit -m "New modern design implementation"
git push origin master
```

Vercel will automatically:
- Build your site
- Deploy to production
- Update your live site at https://website-makhana.vercel.app

## 📋 Pre-Deployment Checklist

Before deploying, make sure to:

### Content Updates
- [ ] Update contact email in Contact section
- [ ] Update phone number in Contact section  
- [ ] Add real company address
- [ ] Review all text content for accuracy
- [ ] Check product grades and specifications
- [ ] Verify export statistics (countries, tons, etc.)

### Media Assets
- [ ] Add company logo (replace ⚘ emoji)
- [ ] Add high-quality product images
- [ ] Add certification images/badges
- [ ] Add hero section image
- [ ] Optimize all images (use WebP format, compress)

### SEO & Marketing
- [ ] Update meta descriptions
- [ ] Add favicon
- [ ] Set up Google Analytics
- [ ] Create sitemap.xml
- [ ] Set up robots.txt
- [ ] Add Open Graph tags for social sharing

### Functionality
- [ ] Connect contact form to email service
- [ ] Test form validation
- [ ] Test all navigation links
- [ ] Test on multiple browsers
- [ ] Test on mobile devices
- [ ] Verify all sections are visible

## 🌐 Alternative Deployment Options

### Option 1: Netlify

1. **Via GitHub (Recommended)**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub account
   - Select the repository: `dwijeshmishra/website_makhana`
   - Build settings:
     - Build command: `npm run build` (or leave empty for static)
     - Publish directory: `dist` (or `.` for static)
   - Click "Deploy site"

2. **Via Drag & Drop**
   - Prepare files locally
   - Go to [app.netlify.com/drop](https://app.netlify.com/drop)
   - Drag and drop your project folder
   - Done!

### Option 2: GitHub Pages

1. **Enable GitHub Pages**
   ```bash
   # Create gh-pages branch
   git checkout -b gh-pages
   git push origin gh-pages
   ```

2. **Configure in Repository Settings**
   - Go to repository Settings → Pages
   - Source: Deploy from branch
   - Branch: `gh-pages`
   - Folder: `/ (root)`
   - Save

3. **Site will be available at:**
   `https://dwijeshmishra.github.io/website_makhana/`

### Option 3: Self-Hosted (cPanel/Shared Hosting)

1. **Prepare Files**
   ```bash
   # Download/prepare all files
   - index.html
   - styles.css
   - script.js
   - assets/ (if you have images)
   ```

2. **Upload via FTP/cPanel**
   - Connect to your hosting via FTP (FileZilla, etc.)
   - Upload all files to `public_html` or your domain folder
   - Ensure file permissions are correct (644 for files, 755 for folders)

3. **Via cPanel File Manager**
   - Login to cPanel
   - Open File Manager
   - Navigate to `public_html`
   - Upload all files
   - Extract if uploaded as ZIP

### Option 4: AWS S3 + CloudFront

1. **Create S3 Bucket**
   ```bash
   # Using AWS CLI
   aws s3 mb s3://samarth-overseas-website
   aws s3 website s3://samarth-overseas-website --index-document index.html
   ```

2. **Upload Files**
   ```bash
   aws s3 sync . s3://samarth-overseas-website --exclude ".git/*"
   ```

3. **Set Bucket Policy** (make public)
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [{
       "Sid": "PublicReadGetObject",
       "Effect": "Allow",
       "Principal": "*",
       "Action": "s3:GetObject",
       "Resource": "arn:aws:s3:::samarth-overseas-website/*"
     }]
   }
   ```

4. **Optional: Add CloudFront for CDN**

## 🔧 Post-Deployment Setup

### 1. Set Up Form Backend

**Option A: Formspree (Easy, Free Tier Available)**
```html
<!-- Update form action in index.html -->
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**Option B: EmailJS (Client-side)**
1. Sign up at [emailjs.com](https://www.emailjs.com/)
2. Create email template
3. Add EmailJS SDK to index.html
4. Update script.js with EmailJS code

**Option C: Custom Backend**
- Create Node.js/PHP backend
- Set up email service (SendGrid, AWS SES, etc.)
- Update form submission endpoint

### 2. Set Up Analytics

**Google Analytics**
```html
<!-- Add to <head> in index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 3. Add Custom Domain

**For Vercel:**
1. Go to project settings → Domains
2. Add your domain (e.g., samarthoverseas.com)
3. Update DNS records as instructed
4. Wait for SSL certificate (automatic)

**For Netlify:**
1. Go to Domain settings
2. Add custom domain
3. Update DNS records
4. SSL is automatic

### 4. Set Up Email

Options for contact@samarthoverseasindia.com:
- Google Workspace (recommended for business)
- Zoho Mail (free tier available)
- Your hosting provider's email
- ProtonMail

### 5. Performance Optimization

**After Deployment:**
1. Test with [PageSpeed Insights](https://pagespeed.web.dev/)
2. Test with [GTmetrix](https://gtmetrix.com/)
3. Optimize based on recommendations
4. Enable CDN if not using Vercel/Netlify
5. Set up caching headers

### 6. SEO Setup

**Submit to Search Engines:**
- [Google Search Console](https://search.google.com/search-console)
- [Bing Webmaster Tools](https://www.bing.com/webmasters)

**Create & Submit Sitemap:**
```xml
<!-- sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://website-makhana.vercel.app/</loc>
    <lastmod>2026-02-13</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```

## 🔍 Testing Checklist

Before going live:
- [ ] Test all links
- [ ] Test form submission
- [ ] Test on Chrome, Firefox, Safari, Edge
- [ ] Test on iOS Safari and Chrome Mobile
- [ ] Test on different screen sizes (mobile, tablet, desktop)
- [ ] Verify all images load
- [ ] Check page load speed
- [ ] Verify SEO meta tags
- [ ] Test contact information is correct
- [ ] Spell-check all content
- [ ] Check social media links work
- [ ] Verify privacy policy and terms (if added)

## 🆘 Troubleshooting

### Site not updating after push?
- Clear Vercel/Netlify build cache
- Check deployment logs for errors
- Hard refresh browser (Ctrl+Shift+R)

### Form not submitting?
- Check console for errors
- Verify form action/endpoint
- Test CORS settings
- Check network tab in DevTools

### Images not loading?
- Verify file paths are correct
- Check file names (case-sensitive on Linux servers)
- Ensure images are in correct folder
- Check image formats are supported

### Mobile menu not working?
- Clear browser cache
- Check JavaScript console for errors
- Verify script.js is loading

## 📞 Support Resources

- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
- MDN Web Docs: https://developer.mozilla.org
- GitHub Docs: https://docs.github.com

---

**Ready to deploy? Just push your changes and watch your site go live! 🚀**
