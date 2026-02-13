// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle')
const navMenu = document.getElementById('navMenu')
const navLinks = document.querySelectorAll('.nav-link')

navToggle?.addEventListener('click', () => {
  navMenu?.classList.toggle('active')
  navToggle.classList.toggle('active')
})

// Close mobile menu when clicking a link
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navMenu?.classList.remove('active')
    navToggle?.classList.remove('active')
  })
})

// Navbar Scroll Effect
const navbar = document.getElementById('navbar')

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > 100) {
    navbar?.classList.add('scrolled')
  } else {
    navbar?.classList.remove('scrolled')
  }
})

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]')

function updateActiveLink() {
  const scrollPosition = window.scrollY + 100

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute('id')

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove('active')
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active')
        }
      })
    }
  })
}

window.addEventListener('scroll', updateActiveLink)

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute('href'))

    if (target) {
      const offsetTop = target.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      })
    }
  })
})

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px',
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1'
      entry.target.style.transform = 'translateY(0)'
    }
  })
}, observerOptions)

// Observe elements for animations
const animateOnScroll = document.querySelectorAll(
  '.product-card, .export-card, .quality-highlight, .feature-item, .visual-card',
)

animateOnScroll.forEach((el) => {
  el.style.opacity = '0'
  el.style.transform = 'translateY(30px)'
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
  observer.observe(el)
})

// Contact Form Handling
const contactForm = document.getElementById('contactForm')

contactForm?.addEventListener('submit', async (e) => {
  e.preventDefault()

  const formData = new FormData(contactForm)
  const data = Object.fromEntries(formData)

  // Basic validation
  if (!data.name || !data.company || !data.email || !data.message) {
    alert('Please fill in all required fields.')
    return
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email)) {
    alert('Please enter a valid email address.')
    return
  }

  // Show loading state
  const submitBtn = contactForm.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent
  submitBtn.textContent = 'Sending...'
  submitBtn.disabled = true

  // Simulate form submission (replace with actual API call)
  setTimeout(() => {
    alert('Thank you for your inquiry! We will get back to you within 24 hours.')
    contactForm.reset()
    submitBtn.textContent = originalText
    submitBtn.disabled = false
  }, 1500)
})

// Stats Counter Animation
function animateCounter(element, target, duration = 2000) {
  let current = 0
  const increment = target / (duration / 16)
  const isPercentage = target === 100

  const updateCounter = () => {
    current += increment
    if (current < target) {
      element.textContent = Math.floor(current) + (isPercentage ? '%' : '+')
      requestAnimationFrame(updateCounter)
    } else {
      element.textContent = target + (isPercentage ? '%' : '+')
    }
  }

  updateCounter()
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted')
        const statNumbers = entry.target.querySelectorAll('.stat-number')

        statNumbers.forEach((stat) => {
          const text = stat.textContent
          const number = parseInt(text.replace(/\D/g, ''), 10)
          animateCounter(stat, number)
        })
      }
    })
  },
  { threshold: 0.5 },
)

const heroStats = document.querySelector('.hero-stats')
if (heroStats) {
  statsObserver.observe(heroStats)
}

// Add parallax effect to hero background
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset
  const heroBackground = document.querySelector('.hero-background')

  if (heroBackground && scrolled < window.innerHeight) {
    heroBackground.style.transform = `translateY(${scrolled * 0.3}px)`
  }
})

// Add hover effect to product cards
const productCards = document.querySelectorAll('.product-card')

productCards.forEach((card) => {
  card.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-8px) scale(1.02)'
  })

  card.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0) scale(1)'
  })
})

// Lazy loading for images (if images are added later)
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, imageObs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.add('loaded')
        imageObs.unobserve(img)
      }
    })
  })

  document.querySelectorAll('img[data-src]').forEach((img) => {
    imageObserver.observe(img)
  })
}

// Add loading state management
window.addEventListener('load', () => {
  document.body.classList.add('loaded')
})

// Handle form input focus states
const formInputs = document.querySelectorAll(
  '.form-group input, .form-group select, .form-group textarea',
)

formInputs.forEach((input) => {
  input.addEventListener('focus', function () {
    this.parentElement.classList.add('focused')
  })

  input.addEventListener('blur', function () {
    if (!this.value) {
      this.parentElement.classList.remove('focused')
    }
  })
})

// Console welcome message
console.log('%c🌾 Samarth Overseas', 'font-size: 20px; font-weight: bold; color: #2C5530;')
console.log('%cPremium Makhana Exporters from India', 'font-size: 14px; color: #5A5A5A;')
console.log(
  '%cWebsite developed with care for quality and excellence',
  'font-size: 12px; color: #D4AF37;',
)

