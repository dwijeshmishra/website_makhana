// Products Data - imported from your products.json
const productsData = [
  {
    id: "basmati-rice",
    name: "Basmati Rice",
    category: "Rice",
    summary: "Long grain basmati with strong aroma and clean polishing.",
    description: "We source and supply basmati rice with consistent grain length and low broken percentage.",
    image: "/images/basmati-rice.webp",
    packaging: "10 kg, 25 kg, 50 kg bags",
    moq: "5 MT"
  },
  {
    id: "non-basmati-rice",
    name: "Non-Basmati Rice",
    category: "Rice",
    summary: "Reliable non-basmati varieties for bulk buyers.",
    description: "Consistent quality non-basmati rice suitable for bulk shipments with clean grading and packing.",
    image: "/images/non-basmati-rice.webp",
    packaging: "10 kg, 25 kg, 50 kg bags",
    moq: "10 MT"
  },
  {
    id: "sela-rice",
    name: "Sella Rice",
    category: "Rice",
    summary: "Parboiled sella rice with consistent grain quality.",
    description: "Export quality sella rice for bulk buyers with clean grading and packing.",
    image: "/images/sella-rice.webp",
    packaging: "10 kg, 25 kg, 50 kg bags",
    moq: "10 MT"
  },
  {
    id: "candy",
    name: "Candy",
    category: "Confectionery",
    summary: "Assorted candy options for export buyers.",
    description: "Candy products supplied as per buyer requirements and packaging specs.",
    image: "/images/candy.webp",
    packaging: "Custom",
    moq: "Custom"
  },
  {
    id: "lollipop",
    name: "Lollipop",
    category: "Confectionery",
    summary: "Lollipop varieties available for bulk supply.",
    description: "Lollipop products supplied as per buyer requirements and packaging specs.",
    image: "/images/lollipop.webp",
    packaging: "Custom",
    moq: "Custom"
  },
  {
    id: "jelly",
    name: "Jelly",
    category: "Confectionery",
    summary: "Jelly products available for export supply.",
    description: "Jelly products supplied as per buyer requirements and packaging specs.",
    image: "/images/jelly.webp",
    packaging: "Custom",
    moq: "Custom"
  },
  {
    id: "red-chilli",
    name: "Lal Khadi Red Chilli",
    category: "Spices",
    summary: "Vibrant color and strong heat for global spice buyers.",
    description: "Cleaned and graded red chilli with consistent color and pungency. Ideal for processing and whole spice trade.",
    image: "/images/red-chilli.webp",
    packaging: "10 kg, 25 kg, 50 kg bags",
    moq: "5 MT"
  },
  {
    id: "coriander",
    name: "Coriander",
    category: "Spices",
    summary: "Aromatic coriander for whole spice buyers.",
    description: "Cleaned and graded coriander suitable for export and spice processing.",
    image: "/images/spices.webp",
    packaging: "10 kg, 25 kg, 50 kg bags",
    moq: "5 MT"
  },
  {
    id: "garlic",
    name: "Garlic",
    category: "Spices",
    summary: "Export grade garlic with strong aroma and uniform cloves.",
    description: "We supply well-sorted garlic suitable for export with moisture control, clean skins, and consistent sizing.",
    image: "/images/garlic.webp",
    packaging: "5 kg, 10 kg, 20 kg mesh bags",
    moq: "5 MT"
  },
  {
    id: "oregano",
    name: "Oregano",
    category: "Spices",
    summary: "Dried oregano with strong aroma and clean sorting.",
    description: "Export-quality dried oregano for seasoning blends and food manufacturing.",
    image: "/images/oregano.webp",
    packaging: "1 kg, 5 kg, 10 kg bags",
    moq: "1 MT"
  },
  {
    id: "seasoning-herbs",
    name: "Seasoning Herbs",
    category: "Spices",
    summary: "Mixed herbs and seasoning options on request.",
    description: "Custom seasoning herb mixes for bulk buyers with consistent aroma and quality.",
    image: "/images/seasoning-herbs.webp",
    packaging: "1 kg, 5 kg, 10 kg bags",
    moq: "1 MT"
  },
  {
    id: "whole-spices",
    name: "Whole Spices",
    category: "Spices",
    summary: "Cumin, coriander, turmeric, and more on request.",
    description: "Wide range of whole spices sourced from reliable farms with export-grade cleaning and packing.",
    image: "/images/spices.webp",
    packaging: "10 kg, 25 kg, 50 kg bags",
    moq: "5 MT"
  },
  {
    id: "onion",
    name: "Onion",
    category: "Agricultural",
    summary: "Fresh onions with strong shelf life and uniform grading.",
    description: "We provide export quality onions with proper curing and packing for longer transit.",
    image: "/images/onion.webp",
    packaging: "10 kg, 20 kg, 25 kg mesh bags",
    moq: "10 MT"
  },
  {
    id: "makhana",
    name: "Makhana (Fox Nuts)",
    category: "Agricultural",
    summary: "Premium makhana with clean sorting and export packing.",
    description: "High quality fox nuts for retail and bulk buyers. Roasted and unroasted lots available on request.",
    image: "/images/makhana.webp",
    packaging: "5 kg, 10 kg cartons",
    moq: "3 MT"
  },
  {
    id: "agricultural-products",
    name: "Other Agricultural Products",
    category: "Agricultural",
    summary: "Additional agricultural products available on request.",
    description: "We can source other agricultural products based on buyer requirements.",
    image: "/images/agricultural-products.webp",
    packaging: "Custom",
    moq: "Custom"
  }
];

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('active');
    navToggle.classList.toggle('active', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Load Products
function createProductCard(product) {
    return `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="product-category-badge">${product.category}</div>
            </div>
            <div class="product-content">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <ul class="product-specs">
                    <li>Packaging: ${product.packaging}</li>
                    <li>MOQ: ${product.moq}</li>
                </ul>
                <a href="#contact" class="product-cta">Request Quote</a>
            </div>
        </div>
    `;
}

function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    const productsHTML = productsData.map(product => createProductCard(product)).join('');
    productsGrid.innerHTML = productsHTML;
    
    // Add animation to product cards
    setTimeout(() => {
        const cards = document.querySelectorAll('.product-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }, 100);
}

// Category Filter
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter products
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.classList.remove('hidden');
                // Animate in
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.name || !data.company || !data.email || !data.message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        alert('Thank you for your inquiry! We will get back to you within 24 hours.');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
});

// Stats Counter Animation
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const isPercentage = target === 100;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + (isPercentage ? '%' : '+');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (isPercentage ? '%' : '+');
        }
    };
    
    updateCounter();
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const isPercentage = text.includes('%');
                const number = parseInt(text.replace(/\D/g, ''));
                
                animateCounter(stat, number);
            });
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});

console.log('%c🌾 Samarth Overseas', 'font-size: 20px; font-weight: bold; color: #2C5530;');
console.log('%cPremium Export Products from India', 'font-size: 14px; color: #5A5A5A;');
console.log('%cWebsite developed with care for quality and excellence', 'font-size: 12px; color: #D4AF37;');