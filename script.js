const SITE_CONFIG_URL = '/site.json'
const PRODUCTS_URL = '/products.json'

const $ = (selector, root = document) => root.querySelector(selector)
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector))

async function fetchJson(url) {
  const response = await fetch(url, { cache: 'no-cache' })
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}`)
  }
  return await response.json()
}

function normalizePhoneToTel(phone) {
  if (!phone) return ''
  const trimmed = String(phone).trim()
  if (!trimmed) return ''
  const normalized = trimmed.replace(/[^\d+]/g, '')
  return normalized.startsWith('+') ? normalized : `+${normalized}`
}

function setTextById(id, value) {
  const el = document.getElementById(id)
  if (!el) return
  el.textContent = value ?? ''
}

function setLinkById(id, href, text) {
  const el = document.getElementById(id)
  if (!el) return
  el.setAttribute('href', href)
  if (text) el.textContent = text
}

function setNavHeightVar() {
  const navbar = document.getElementById('navbar')
  if (!navbar) return
  document.documentElement.style.setProperty('--nav-height', `${navbar.offsetHeight}px`)
}

function setupMobileNav() {
  const navToggle = document.getElementById('navToggle')
  const navMenu = document.getElementById('navMenu')
  const navLinks = $$('.nav-link')

  navToggle?.addEventListener('click', () => {
    const isOpen = navMenu?.classList.toggle('active')
    navToggle.classList.toggle('active', Boolean(isOpen))
    navToggle.setAttribute('aria-expanded', String(Boolean(isOpen)))
  })

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMenu?.classList.remove('active')
      navToggle?.classList.remove('active')
      navToggle?.setAttribute('aria-expanded', 'false')
    })
  })
}

function setupNavbarScrollEffect() {
  const navbar = document.getElementById('navbar')
  if (!navbar) return

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
      navbar.classList.add('scrolled')
    } else {
      navbar.classList.remove('scrolled')
    }
  })
}

function setupActiveNavLink() {
  const navbar = document.getElementById('navbar')
  const navLinks = $$('.nav-link')
  const sections = $$('section[id]')

  function updateActiveLink() {
    const navHeight = navbar ? navbar.offsetHeight : 80
    const scrollPosition = window.scrollY + navHeight + 24

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute('id')

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`)
        })
      }
    })
  }

  window.addEventListener('scroll', updateActiveLink)
  updateActiveLink()
}

function setupSmoothScroll() {
  const navbar = document.getElementById('navbar')
  $$('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href')
      if (!href || href === '#') return
      const target = $(href)
      if (!target) return

      e.preventDefault()
      const navHeight = navbar ? navbar.offsetHeight : 80
      const offsetTop = target.offsetTop - navHeight - 10
      window.scrollTo({ top: offsetTop, behavior: 'smooth' })
    })
  })
}

function renderCertifications(certifications) {
  const certWrap = document.getElementById('certifications')
  if (!certWrap) return
  if (!Array.isArray(certifications) || certifications.length === 0) return

  certWrap.innerHTML = certifications
    .map((c) => {
      const label = c?.label ? String(c.label) : ''
      const detail = c?.detail ? String(c.detail) : ''
      return `<div class="trust-item"><span class="trust-badge">${label}</span><span>${detail}</span></div>`
    })
    .join('')
}

function applySiteConfig(cfg) {
  const companyName = cfg?.companyName || 'Samarth Overseas'
  setTextById('companyName', companyName)
  setTextById('footerCompanyName', companyName)

  if (cfg?.address) {
    setTextById('companyAddress', cfg.address)
    setTextById('footerCompanyAddress', cfg.address)
  }

  if (cfg?.email) {
    setLinkById('companyEmailLink', `mailto:${cfg.email}`, cfg.email)
    setLinkById('footerCompanyEmailLink', `mailto:${cfg.email}`, cfg.email)
  }

  const tel = normalizePhoneToTel(cfg?.phone)
  const phoneRow = document.getElementById('phoneRow')
  const footerPhone = document.getElementById('footerCompanyPhone')
  if (tel) {
    setLinkById('companyPhoneLink', `tel:${tel}`, cfg.phone)
    setTextById('footerCompanyPhone', cfg.phone)
    phoneRow?.removeAttribute('hidden')
    footerPhone?.removeAttribute('hidden')
  } else {
    phoneRow?.setAttribute('hidden', 'true')
    setTextById('footerCompanyPhone', '')
    footerPhone?.setAttribute('hidden', 'true')
  }

  if (cfg?.stats) {
    if (cfg.stats.categories) setTextById('statCategories', cfg.stats.categories)
    if (cfg.stats.tons) setTextById('statTons', cfg.stats.tons)
    if (cfg.stats.quality) setTextById('statQuality', cfg.stats.quality)
  }

  renderCertifications(cfg?.certifications)

  const whatsappFloat = document.getElementById('whatsappFloat')
  const wa = String(cfg?.whatsapp || '').trim()
  if (whatsappFloat && wa) {
    const digits = wa.replace(/[^\d]/g, '')
    whatsappFloat.href = `https://wa.me/${digits}`
    whatsappFloat.removeAttribute('hidden')
  } else if (whatsappFloat) {
    whatsappFloat.setAttribute('hidden', 'true')
  }
}

function createProductCard(product) {
  const name = product?.name ? String(product.name) : 'Product'
  const description = product?.description ? String(product.description) : ''
  const category = product?.category ? String(product.category) : ''
  const packaging = product?.packaging ? String(product.packaging) : 'Custom'
  const moq = product?.moq ? String(product.moq) : 'Custom'
  const image = product?.image ? String(product.image) : '/images/placeholder.svg'

  return `
    <div class="product-card" data-category="${category}">
      <div class="product-image-container">
        <img src="${image}" alt="${name}" loading="lazy" decoding="async">
        <div class="product-category-badge">${category}</div>
      </div>
      <div class="product-content">
        <h3 class="product-name">${name}</h3>
        <p class="product-description">${description}</p>
        <ul class="product-specs">
          <li>Packaging: ${packaging}</li>
          <li>MOQ: ${moq}</li>
        </ul>
        <a href="#contact" class="product-cta">Request Quote</a>
      </div>
    </div>
  `
}

function renderProducts(products) {
  const productsGrid = document.getElementById('productsGrid')
  if (!productsGrid) return

  if (!Array.isArray(products) || products.length === 0) {
    productsGrid.innerHTML =
      '<p style="grid-column: 1 / -1; color: #5A5A5A;">Products are currently unavailable. Please contact us for the latest catalog.</p>'
    return
  }

  productsGrid.innerHTML = products.map((p) => createProductCard(p)).join('')

  // Entry animation
  requestAnimationFrame(() => {
    const cards = $$('.product-card')
    cards.forEach((card, index) => {
      card.style.opacity = '0'
      card.style.transform = 'translateY(18px)'
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease'
      setTimeout(() => {
        card.style.opacity = '1'
        card.style.transform = 'translateY(0)'
      }, index * 40)
    })
  })
}

function setupCategoryFilter() {
  const filterButtons = $$('.filter-btn')
  if (!filterButtons.length) return

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const category = button.getAttribute('data-category')
      filterButtons.forEach((btn) => btn.classList.remove('active'))
      button.classList.add('active')

      $$('.product-card').forEach((card) => {
        const matches = category === 'all' || card.getAttribute('data-category') === category
        card.classList.toggle('hidden', !matches)
        if (matches) {
          card.style.opacity = '0'
          card.style.transform = 'translateY(14px)'
          setTimeout(() => {
            card.style.opacity = '1'
            card.style.transform = 'translateY(0)'
          }, 40)
        }
      })
    })
  })
}

function setupContactForm(cfg) {
  const contactForm = document.getElementById('contactForm')
  const status = document.getElementById('formStatus')
  if (!contactForm) return

  const setStatus = (type, message) => {
    if (!status) return
    status.classList.remove('is-success', 'is-error')
    if (type) status.classList.add(type === 'success' ? 'is-success' : 'is-error')
    status.textContent = message || ''
  }

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    setStatus('', '')

    const formData = new FormData(contactForm)
    const data = Object.fromEntries(formData)

    if (!data.name || !data.company || !data.email || !data.message) {
      setStatus('error', 'Please fill in all required fields.')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(String(data.email))) {
      setStatus('error', 'Please enter a valid email address.')
      return
    }

    const submitBtn = contactForm.querySelector('button[type="submit"]')
    const originalText = submitBtn?.textContent || 'Send Inquiry'
    if (submitBtn) {
      submitBtn.textContent = 'Sending...'
      submitBtn.disabled = true
    }

    const endpoint = String(cfg?.contactEndpoint || '').trim()
    const companyEmail = String(cfg?.email || 'info@samarthoverseasindia.com').trim()

    try {
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...data,
            source: 'website',
            submittedAt: new Date().toISOString(),
          }),
        })

        if (!response.ok) {
          throw new Error('Submission failed')
        }

        setStatus('success', 'Thanks! Your inquiry has been sent. We will reply within 24 hours.')
        contactForm.reset()
      } else {
        // Fallback: open email draft
        const subject = encodeURIComponent(`Inquiry from ${data.name} (${data.company})`)
        const body = encodeURIComponent(
          `Name: ${data.name}\nCompany: ${data.company}\nEmail: ${data.email}\nPhone: ${data.phone || ''}\nCountry: ${data.country || ''}\nProduct Interest: ${data.product || ''}\n\nMessage:\n${data.message}\n`,
        )
        window.location.href = `mailto:${companyEmail}?subject=${subject}&body=${body}`
        setStatus('success', 'Opening your email app to send the inquiry.')
      }
    } catch (error) {
      console.error(error)
      setStatus('error', 'Sorry—something went wrong. Please try again or email us directly.')
    } finally {
      if (submitBtn) {
        submitBtn.textContent = originalText
        submitBtn.disabled = false
      }
    }
  })
}

function setupStatsCounter() {
  const heroStats = $('.hero-stats')
  if (!heroStats) return

  function animateCounter(element, target, duration = 1800) {
    let current = 0
    const increment = target / (duration / 16)
    const isPercentage = target === 100

    const update = () => {
      current += increment
      if (current < target) {
        element.textContent = Math.floor(current) + (isPercentage ? '%' : '+')
        requestAnimationFrame(update)
      } else {
        element.textContent = target + (isPercentage ? '%' : '+')
      }
    }

    update()
  }

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || entry.target.classList.contains('counted')) return
        entry.target.classList.add('counted')
        $$('.stat-number', entry.target).forEach((stat) => {
          const text = stat.textContent || ''
          const number = parseInt(text.replace(/\D/g, ''), 10)
          if (!Number.isFinite(number)) return
          animateCounter(stat, number)
        })
      })
    },
    { threshold: 0.5 },
  )

  statsObserver.observe(heroStats)
}

async function init() {
  setupMobileNav()
  setupNavbarScrollEffect()
  setupSmoothScroll()
  setupActiveNavLink()

  setNavHeightVar()
  window.addEventListener('resize', setNavHeightVar)

  let cfg = {}
  try {
    cfg = await fetchJson(SITE_CONFIG_URL)
  } catch {
    cfg = {}
  }
  applySiteConfig(cfg)
  setupContactForm(cfg)

  let products = []
  try {
    products = await fetchJson(PRODUCTS_URL)
  } catch {
    products = []
  }
  renderProducts(Array.isArray(products) ? products : [])
  setupCategoryFilter()
  setupStatsCounter()

  console.log('%c Samarth Overseas', 'font-size: 16px; font-weight: bold; color: #2C5530;')
}

document.addEventListener('DOMContentLoaded', init)

