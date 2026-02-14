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

  const hasHashLinks = navLinks.some((link) => (link.getAttribute('href') || '').startsWith('#'))

  // Multi-page nav: highlight by pathname
  if (!hasHashLinks) {
    const path = window.location.pathname || '/'
    navLinks.forEach((link) => {
      const href = link.getAttribute('href') || ''
      if (!href) return
      // Treat product detail as part of Products section
      if (path.endsWith('/product.html') && href === '/products.html') {
        link.classList.add('active')
        return
      }
      if (href === '/') {
        link.classList.toggle('active', path === '/' || path.endsWith('/index.html'))
      } else {
        link.classList.toggle('active', path.endsWith(href))
      }
    })
    return
  }

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
  const heroWhatsAppBtn = document.getElementById('heroWhatsAppBtn')
  const wa = String(cfg?.whatsapp || '').trim()
  if (whatsappFloat && wa) {
    const digits = wa.replace(/[^\d]/g, '')
    const base = `https://wa.me/${digits}`
    whatsappFloat.href = base
    whatsappFloat.removeAttribute('hidden')
    if (heroWhatsAppBtn) {
      heroWhatsAppBtn.href = base
      heroWhatsAppBtn.removeAttribute('hidden')
    }
  } else if (whatsappFloat) {
    whatsappFloat.setAttribute('hidden', 'true')
    heroWhatsAppBtn?.setAttribute('hidden', 'true')
  }

  setupHeroImages(cfg?.heroImages)
}

function setupHeroImages(images) {
  const img = document.querySelector('.hero-photo')
  if (!img) return

  const list = Array.isArray(images)
    ? images.map((x) => String(x || '').trim()).filter(Boolean)
    : []

  const fallback = ['/images/spices.webp', '/images/basmati-rice.webp', '/images/makhana.webp']
  const sources = list.length ? list : fallback
  const unique = Array.from(new Set(sources))
  if (unique.length <= 1) {
    img.src = unique[0] || img.src
    return
  }

  // Preload
  unique.forEach((src) => {
    const pre = new Image()
    pre.src = src
  })

  let idx = Math.max(0, unique.indexOf(img.getAttribute('src') || img.src))

  setInterval(() => {
    idx = (idx + 1) % unique.length
    img.classList.add('is-fading')
    window.setTimeout(() => {
      img.src = unique[idx]
      img.classList.remove('is-fading')
    }, 260)
  }, 4500)
}

function buildWhatsAppProductLink(whatsapp, product) {
  const wa = String(whatsapp || '').trim()
  if (!wa) return ''
  const digits = wa.replace(/[^\d]/g, '')
  if (!digits) return ''

  const name = product?.name ? String(product.name) : 'Product'
  const category = product?.category ? String(product.category) : ''
  const packaging = product?.packaging ? String(product.packaging) : ''
  const moq = product?.moq ? String(product.moq) : ''

  const text = encodeURIComponent(
    `Hello Samarth Overseas,\n\nI’m interested in: ${name}${category ? ` (${category})` : ''}\nPackaging: ${packaging || 'Custom'}\nMOQ: ${moq || 'Custom'}\n\nPlease share price and availability. धन्यवाद.`,
  )

  return `https://wa.me/${digits}?text=${text}`
}

function createProductCard(product) {
  const id = product?.id ? String(product.id) : ''
  const name = product?.name ? String(product.name) : 'Product'
  const description = product?.description ? String(product.description) : ''
  const category = product?.category ? String(product.category) : ''
  const packaging = product?.packaging ? String(product.packaging) : 'Custom'
  const moq = product?.moq ? String(product.moq) : 'Custom'
  const image = product?.image ? String(product.image) : '/images/placeholder.svg'
  const whatsapp = (window.__siteConfig && window.__siteConfig.whatsapp) || ''
  const waLink = buildWhatsAppProductLink(whatsapp, product)
  const detailsLink = id ? `/product.html?id=${encodeURIComponent(id)}` : '/products.html'

  return `
    <div class="product-card" data-category="${category}">
      <a class="product-image-container" href="${detailsLink}" aria-label="View ${name} details">
        <img src="${image}" alt="${name}" loading="lazy" decoding="async">
        <div class="product-category-badge">${category}</div>
      </a>
      <div class="product-content">
        <h3 class="product-name"><a class="product-title-link" href="${detailsLink}">${name}</a></h3>
        <p class="product-description">${description}</p>
        <ul class="product-specs">
          <li>Packaging: ${packaging}</li>
          <li>MOQ: ${moq}</li>
        </ul>
        <div class="product-actions">
          <a href="${detailsLink}" class="product-details">View Details</a>
          <a href="/contact.html?productId=${encodeURIComponent(id)}" class="product-cta">Request Quote</a>
          ${
            waLink
              ? `<a class="product-whatsapp" href="${waLink}" target="_blank" rel="noopener noreferrer" aria-label="Request quote on WhatsApp for ${name}">WhatsApp</a>`
              : ''
          }
        </div>
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

function prefillContactFromQuery(products) {
  const contactForm = document.getElementById('contactForm')
  if (!contactForm) return

  const params = new URLSearchParams(window.location.search)
  const productId = params.get('productId') || params.get('id') || ''
  if (!productId) return

  const product = Array.isArray(products)
    ? products.find((p) => String(p?.id) === String(productId))
    : null
  if (!product) return

  const select = contactForm.querySelector('#product')
  const message = contactForm.querySelector('#message')

  const cat = String(product.category || '').toLowerCase()
  const mapped =
    cat.includes('rice')
      ? 'rice'
      : cat.includes('spice')
        ? 'spices'
        : cat.includes('confectionery')
          ? 'confectionery'
          : cat.includes('agricultural')
            ? 'agricultural'
            : ''

  if (select && mapped) {
    select.value = mapped
  }

  if (message && !String(message.value || '').trim()) {
    message.value = `Hi,\n\nI’m interested in ${product.name}.\nPackaging: ${product.packaging || 'Custom'}\nMOQ: ${product.moq || 'Custom'}\n\nPlease share price and availability.\n`
  }
}

function renderProductDetail(products, cfg) {
  const wrap = document.getElementById('productDetail')
  if (!wrap) return false

  const params = new URLSearchParams(window.location.search)
  const id = params.get('id')
  if (!id) {
    wrap.innerHTML =
      '<div class="export-card"><h2 class="section-title" style="margin:0 0 0.75rem;">Product not found</h2><p class="section-description" style="margin:0;">Please open a product from the catalog.</p><div class="export-cta"><a class="btn btn-primary" href="/products.html">Go to Products</a></div></div>'
    return true
  }

  const product = Array.isArray(products)
    ? products.find((p) => String(p?.id) === String(id))
    : null

  if (!product) {
    wrap.innerHTML =
      '<div class="export-card"><h2 class="section-title" style="margin:0 0 0.75rem;">Product not found</h2><p class="section-description" style="margin:0;">This product may have been removed or renamed.</p><div class="export-cta"><a class="btn btn-primary" href="/products.html">Go to Products</a></div></div>'
    return true
  }

  const name = product.name || 'Product'
  document.title = `${name} | Samarth Overseas`

  const descMeta = document.querySelector('meta[name="description"]')
  if (descMeta) {
    descMeta.setAttribute('content', `${name} — ${product.summary || product.description || ''}`.trim())
  }

  const image = product.image || '/images/placeholder.svg'
  const tags = Array.isArray(product.tags) ? product.tags : []
  const waLink = buildWhatsAppProductLink(cfg?.whatsapp, product)

  wrap.innerHTML = `
    <div class="product-detail-grid">
      <div class="product-detail-media">
        <img src="${image}" alt="${name}" loading="eager" decoding="async">
      </div>
      <div class="product-detail-content">
        <div class="section-label">${product.category || ''}${product.subcategory ? ` • ${product.subcategory}` : ''}</div>
        <h1 class="product-detail-title">${name}</h1>
        <p class="product-detail-summary">${product.summary || ''}</p>
        <p class="product-detail-description">${product.description || ''}</p>

        <div class="product-detail-specs">
          <div class="spec-row"><span>Origin</span><strong>${product.origin || 'India'}</strong></div>
          <div class="spec-row"><span>Packaging</span><strong>${product.packaging || 'Custom'}</strong></div>
          <div class="spec-row"><span>MOQ</span><strong>${product.moq || 'Custom'}</strong></div>
        </div>

        ${
          tags.length
            ? `<div class="tag-row">${tags
                .map((t) => `<span class="tag-pill">${String(t)}</span>`)
                .join('')}</div>`
            : ''
        }

        <div class="export-cta">
          <a class="btn btn-secondary" href="/products.html">Back to Products</a>
          <a class="btn btn-primary" href="/contact.html?productId=${encodeURIComponent(
            String(product.id || ''),
          )}">Request Quote</a>
          ${
            waLink
              ? `<a class="btn btn-secondary btn-whatsapp" href="${waLink}" target="_blank" rel="noopener noreferrer">WhatsApp</a>`
              : ''
          }
        </div>
      </div>
    </div>
  `

  return true
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
  // make config available for product-card rendering
  window.__siteConfig = cfg || {}
  applySiteConfig(cfg)
  setupContactForm(cfg)

  let products = []
  try {
    products = await fetchJson(PRODUCTS_URL)
  } catch {
    products = []
  }
  const productList = Array.isArray(products) ? products : []
  const isDetail = renderProductDetail(productList, cfg)
  if (!isDetail) {
    renderProducts(productList)
    setupCategoryFilter()
    setupStatsCounter()
  }
  prefillContactFromQuery(productList)

  console.log('%c Samarth Overseas', 'font-size: 16px; font-weight: bold; color: #2C5530;')
}

document.addEventListener('DOMContentLoaded', init)

