'use strict';

// Replace this with your live form handler URL. It should accept a JSON POST body.
const FORM_ENDPOINT = '';

// Optional video sales letter. Set this to true after adding a URL below.
const VSL_ENABLED = false;
const VSL_CONFIG = {
  provider: 'youtube',
  videoUrl: '' // Example: https://www.youtube.com/embed/VIDEO_ID
};

const industryConfig = {
  general: {
    eyebrow: 'For Independent Retailers',
    headline: 'Turn <span class="cyan">What\'s New</span><br>Into <span class="lime">Repeat Visits.</span>',
    subheadline: "Put new arrivals, restocks and exclusive offers directly on your customers' phones — and give them a reason to come back.",
    heroImage: 'assets/retail-hero.jpg', phoneImage: 'assets/industry-vintage.jpg', phoneName: 'NORTH & FOUND', phoneHeadline: 'New Arrivals', dropCopy: '12 items just added',
    customers: 50, average: 65, current: 1, additional: 2, cta: 'Get Your Free Store Mockup', businessType: '',
    benefits: ['New arrival notifications', 'Restock alerts', 'Member-only offers']
  },
  vintage: {
    eyebrow: 'Vintage Store Owners',
    headline: 'Your Inventory<br><span class="cyan">Changes Every Week.</span><br>Do Your Customers <span class="lime">Know?</span>',
    subheadline: 'Turn every new rack, one-of-one find and restock into a direct reason for previous customers to visit again.',
    heroImage: 'assets/industry-vintage.jpg', phoneImage: 'assets/industry-vintage.jpg', phoneName: 'FOUND AGAIN', phoneHeadline: 'Fresh On The Rack', dropCopy: '18 vintage finds added',
    customers: 75, average: 58, current: 1, additional: 2, cta: 'Build My Free Vintage Store Mockup', businessType: 'Vintage / Resale',
    benefits: ['New-rack notifications', 'One-of-one find alerts', 'Member-only first access']
  },
  comics: {
    eyebrow: 'Comic & Collectibles Store Owners',
    headline: '<span class="cyan">New Stock</span><br>Keeps Arriving.<br>Are Customers <span class="lime">Coming Back?</span>',
    subheadline: 'Put new releases, rare finds and restocks directly in front of collectors who already know your store.',
    heroImage: 'assets/industry-comics.jpg', phoneImage: 'assets/industry-comics.jpg', phoneName: 'PANEL & VAULT', phoneHeadline: 'New This Week', dropCopy: '24 releases just landed',
    customers: 100, average: 42, current: 2, additional: 2, cta: 'Build My Free Collectibles Mockup', businessType: 'Comics / Collectibles',
    benefits: ['New-release notifications', 'Rare-find alerts', 'Collector-only offers']
  },
  sneakers: {
    eyebrow: 'Sneaker & Streetwear Store Owners',
    headline: 'Every New Drop<br>Is A Reason<br><span class="lime">To Come Back.</span><br><span class="cyan">If They Know.</span>',
    subheadline: 'Turn drops and restocks into direct customer touchpoints—with first-access offers that create urgency.',
    heroImage: 'assets/industry-sneakers.jpg', phoneImage: 'assets/industry-sneakers.jpg', phoneName: 'NEXT PAIR', phoneHeadline: 'The Drop Is Live', dropCopy: '8 pairs just added',
    customers: 75, average: 120, current: 1, additional: 1, cta: 'Build My Free Sneaker Store Mockup', businessType: 'Sneakers / Streetwear',
    benefits: ['Drop notifications', 'Size-restock alerts', 'Member first access']
  },
  books: {
    eyebrow: 'Independent Bookstore Owners',
    headline: 'Turn <span class="cyan">New Titles</span><br>Into Another Reason<br><span class="lime">To Visit.</span>',
    subheadline: 'Keep regular readers connected to new releases, staff picks, special editions and store events.',
    heroImage: 'assets/industry-books.jpg', phoneImage: 'assets/industry-books.jpg', phoneName: 'MARGIN BOOKS', phoneHeadline: 'Fresh On The Shelf', dropCopy: '16 new titles arrived',
    customers: 100, average: 38, current: 2, additional: 2, cta: 'Build My Free Bookstore Mockup', businessType: 'Bookstore',
    benefits: ['New-release notifications', 'Staff-pick alerts', 'Reader rewards']
  },
  jewelry: {
    eyebrow: 'Jewelry & Accessory Store Owners',
    headline: 'Give New Collections<br><span class="cyan">A Direct Path</span><br>To Your <span class="lime">Best Customers.</span>',
    subheadline: 'Put new collections, limited pieces and member previews directly on your customers’ phones.',
    heroImage: 'assets/industry-jewelry.jpg', phoneImage: 'assets/industry-jewelry.jpg', phoneName: 'FORM & FINISH', phoneHeadline: 'New Collection', dropCopy: '10 pieces just released',
    customers: 50, average: 145, current: 1, additional: 1, cta: 'Build My Free Jewelry Store Mockup', businessType: 'Jewelry / Accessories',
    benefits: ['Collection-launch alerts', 'Limited-piece access', 'VIP customer rewards']
  },
  records: {
    eyebrow: 'Independent Record Store Owners',
    headline: 'New Vinyl Arrives.<br><span class="cyan">Regulars Should Know.</span><br>Bring Them <span class="lime">Back.</span>',
    subheadline: 'Promote fresh arrivals, rare finds and restocks directly to the listeners most likely to care.',
    heroImage: 'assets/industry-records.jpg', phoneImage: 'assets/industry-records.jpg', phoneName: 'NEEDLE & GROOVE', phoneHeadline: 'New In The Bins', dropCopy: '22 records just added',
    customers: 80, average: 48, current: 2, additional: 2, cta: 'Build My Free Record Store Mockup', businessType: 'Record Store',
    benefits: ['New-vinyl notifications', 'Rare-find alerts', 'Regular-listener rewards']
  },
  boutique: {
    eyebrow: 'Independent Fashion Boutique Owners',
    headline: 'New Collections<br>Deserve More Than<br><span class="cyan">One Social Post.</span>',
    subheadline: 'Give previous customers a direct reason to see what just arrived—and a reward for coming back.',
    heroImage: 'assets/industry-boutique.jpg', phoneImage: 'assets/industry-boutique.jpg', phoneName: 'EDIT NO. 7', phoneHeadline: 'The New Edit', dropCopy: '14 styles just arrived',
    customers: 75, average: 95, current: 1, additional: 2, cta: 'Build My Free Boutique Mockup', businessType: 'Fashion Boutique',
    benefits: ['Collection notifications', 'Restock and size alerts', 'Member styling offers']
  },
  tcg: {
    eyebrow: 'Hobby & TCG Store Owners',
    headline: 'Every Release.<br>Every Restock.<br><span class="lime">Another Reason</span><br><span class="cyan">To Return.</span>',
    subheadline: 'Keep players connected to releases, restocks, member events and what is happening in-store.',
    heroImage: 'assets/industry-tcg.jpg', phoneImage: 'assets/industry-tcg.jpg', phoneName: 'TURN & TOKEN', phoneHeadline: 'Restock Live', dropCopy: '20 items back in stock',
    customers: 100, average: 55, current: 2, additional: 2, cta: 'Build My Free Hobby Store Mockup', businessType: 'Hobby / TCG',
    benefits: ['Release notifications', 'Restock alerts', 'Member event rewards']
  }
};

window.siteAnalytics = {
  track(eventName, parameters = {}) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...parameters });
    if (typeof window.gtag === 'function') window.gtag('event', eventName, parameters);
    if (typeof window.fbq === 'function') window.fbq('trackCustom', eventName, parameters);
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') console.info('[analytics]', eventName, parameters);
  }
};

const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];
const params = new URLSearchParams(location.search);
const industryKey = params.get('industry');
const activeKey = industryConfig[industryKey] ? industryKey : 'general';
const activeIndustry = industryConfig[activeKey];

function applyIndustry(config) {
  $('#hero-eyebrow').textContent = config.eyebrow;
  $('#hero-title').innerHTML = config.headline;
  $('#hero-subtitle').textContent = config.subheadline;
  $('#hero-image').src = config.heroImage;
  $('#hero-image').alt = `${config.eyebrow.replace(' Owners', '')} product display`;
  $('#phone-image').src = config.phoneImage;
  $('#phone-store-name').textContent = config.phoneName;
  $('#phone-headline').textContent = config.phoneHeadline;
  $('#drop-copy').textContent = config.dropCopy;
  $('#hero-cta-label').textContent = config.cta;
  $('#customers').value = config.customers;
  $('#average').value = config.average;
  $('#current').value = config.current;
  $('#additional').value = config.additional;
  const benefitItems = $$('.experience-copy li');
  config.benefits.forEach((benefit, index) => { if (benefitItems[index]) benefitItems[index].textContent = benefit; });
  if (config.businessType) $('[name="businessType"]').value = config.businessType;
  if (activeKey !== 'general') document.title = `${config.eyebrow} | Free Custom Loyalty App Mockup`;
}

const roiFields = ['customers', 'average', 'current', 'additional'].map(id => $(`#${id}`));
let roiTracked = false;
let displayedRevenue = 0;
const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

function safeNumber(input) {
  const value = Number.parseFloat(input.value);
  const min = Number.parseFloat(input.min || '0');
  const max = Number.parseFloat(input.max || '1000000');
  return Number.isFinite(value) ? Math.min(Math.max(value, min), max) : 0;
}

function updateCalculator(animate = true) {
  const customers = safeNumber($('#customers'));
  const average = safeNumber($('#average'));
  const current = safeNumber($('#current'));
  const additional = safeNumber($('#additional'));
  const target = customers * additional * average;
  const result = $('#roi-result');
  $('#current-purchases-output').textContent = Number.isInteger(current) ? current : current.toFixed(1);
  const future = current + additional;
  $('#future-purchases-output').textContent = Number.isInteger(future) ? future : future.toFixed(1);

  if (!animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    displayedRevenue = target;
    result.textContent = currency.format(target);
  } else {
    const start = displayedRevenue;
    const started = performance.now();
    const duration = 260;
    const tick = now => {
      const progress = Math.min((now - started) / duration, 1);
      displayedRevenue = start + (target - start) * (1 - Math.pow(1 - progress, 3));
      result.textContent = currency.format(displayedRevenue);
      if (progress < 1) requestAnimationFrame(tick);
      else displayedRevenue = target;
    };
    requestAnimationFrame(tick);
  }
  result.parentElement.classList.remove('pop');
  requestAnimationFrame(() => result.parentElement.classList.add('pop'));
}

roiFields.forEach(field => field.addEventListener('input', () => {
  updateCalculator();
  if (!roiTracked) {
    window.siteAnalytics.track('roi_calculator_used', { industry: activeKey });
    roiTracked = true;
  }
}));

const modal = $('#lead-modal');
const modalPanel = $('.modal-panel');
let lastFocused = null;
let formStarted = false;

function openForm(event) {
  lastFocused = event?.currentTarget || document.activeElement;
  modal.hidden = false;
  document.body.classList.add('modal-open');
  requestAnimationFrame(() => $('[name="firstName"]', modal).focus());
  window.siteAnalytics.track('lead_form_open', { source: event?.currentTarget?.dataset.event || 'site_cta', industry: activeKey });
}

function closeForm() {
  modal.hidden = true;
  document.body.classList.remove('modal-open');
  if (lastFocused) lastFocused.focus();
}

$$('[data-open-form]').forEach(button => button.addEventListener('click', event => {
  const eventName = button.dataset.event;
  if (eventName) window.siteAnalytics.track(eventName, { industry: activeKey });
  openForm(event);
}));
$$('[data-close-form]').forEach(button => button.addEventListener('click', closeForm));
document.addEventListener('keydown', event => {
  if (modal.hidden) return;
  if (event.key === 'Escape') closeForm();
  if (event.key === 'Tab') {
    const focusable = $$('button:not([disabled]), input:not([disabled]), select:not([disabled])', modalPanel);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});

const form = $('#lead-form');
form.addEventListener('input', () => {
  if (!formStarted) {
    window.siteAnalytics.track('lead_form_start', { industry: activeKey });
    formStarted = true;
  }
});

form.addEventListener('submit', async event => {
  event.preventDefault();
  const required = $$('[required]', form);
  let firstInvalid = null;
  required.forEach(field => {
    const valid = field.checkValidity();
    field.setAttribute('aria-invalid', String(!valid));
    if (!valid && !firstInvalid) firstInvalid = field;
  });
  const status = $('#form-status');
  status.className = 'form-status';
  if (firstInvalid) {
    status.textContent = 'Please complete the required fields and enter a valid email address.';
    firstInvalid.focus();
    return;
  }

  const submitButton = $('button[type="submit"]', form);
  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());
  payload.goals = formData.getAll('goals');
  payload.industryLanding = activeKey;

  if (!FORM_ENDPOINT) {
    const isDevelopment = ['localhost', '127.0.0.1', ''].includes(location.hostname);
    status.textContent = isDevelopment
      ? 'Development mode: validation passed. No data was sent because FORM_ENDPOINT is not configured.'
      : 'This form is not connected yet. Please contact the site owner to configure FORM_ENDPOINT in script.js.';
    status.classList.toggle('success', isDevelopment);
    if (isDevelopment) console.info('[development form payload]', payload);
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = 'Sending…';
  try {
    const response = await fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (!response.ok) throw new Error(`Form request failed (${response.status})`);
    status.textContent = 'Request received. We’ll be in touch about your custom mockup.';
    status.classList.add('success');
    window.siteAnalytics.track('lead_form_submit', { industry: activeKey });
    form.reset();
  } catch (error) {
    status.textContent = 'We could not send your request. Please try again or contact us directly.';
    console.error(error);
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = 'Request My Free Mockup <span>→</span>';
  }
});

$$('.industry-card').forEach(card => card.addEventListener('click', () => window.siteAnalytics.track('industry_card_click', { industry: card.dataset.industry })));

const navToggle = $('.nav-toggle');
navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  $('#main-nav').classList.toggle('nav-open', !expanded);
});

const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('in-view'); revealObserver.unobserve(entry.target); }
}), { threshold: 0.08 });
$$('.reveal').forEach(element => revealObserver.observe(element));

const heroObserver = new IntersectionObserver(([entry]) => {
  $('.mobile-sticky').classList.toggle('visible', !entry.isIntersecting);
}, { threshold: 0.08 });
heroObserver.observe($('.hero'));

function setupVSL() {
  if (!VSL_ENABLED || !VSL_CONFIG.videoUrl) return;
  const section = $('#vsl-section');
  const container = $('#video-container');
  if (VSL_CONFIG.provider === 'selfHosted') {
    const video = document.createElement('video');
    video.controls = true;
    video.preload = 'metadata';
    video.src = VSL_CONFIG.videoUrl;
    container.append(video);
  } else {
    const iframe = document.createElement('iframe');
    iframe.src = VSL_CONFIG.videoUrl;
    iframe.title = 'How the loyalty system works';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    container.append(iframe);
  }
  section.hidden = false;
}

applyIndustry(activeIndustry);
updateCalculator(false);
setupVSL();
$('#year').textContent = new Date().getFullYear();
