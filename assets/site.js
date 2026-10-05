(() => {
  'use strict';
  const c = window.DESTINY22_CONFIG || {};
  const ready = value => typeof value === 'string' && value.trim() && !value.includes('[');
  const tokens = { '[FULL_NAME]': c.fullName, '[INN]': c.inn, '[CITY]': c.city,
    '[EMAIL_SUPPORT]': c.email, '[PHONE]': c.phone, '[TELEGRAM_OPTIONAL]': c.telegram };
  // Обновление юридических текстов без HTML-инъекций.
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    if (['SCRIPT','STYLE'].includes(node.parentElement.tagName)) continue;
    let text = node.nodeValue;
    Object.entries(tokens).forEach(([token, value]) => { if (ready(value)) text = text.split(token).join(value); });
    node.nodeValue = text;
  }
  document.querySelectorAll('[data-field]').forEach(el => {
    if (ready(c[el.dataset.field])) el.textContent = c[el.dataset.field];
  });
  document.querySelectorAll('[data-contact]').forEach(el => {
    const kind = el.dataset.contact, value = c[kind];
    if (!ready(value)) return;
    let href;
    if (kind === 'email' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) href = 'mailto:' + value;
    if (kind === 'phone' && /^\+?[\d\s()-]{5,25}$/.test(value)) href = 'tel:' + value.replace(/[^+\d]/g, '');
    if (kind === 'telegram' && /^https:\/\/t\.me\/[\w]+\/?$/.test(value)) href = value;
    if (!href) { el.textContent = value; return; }
    const a = document.createElement('a'); a.href = href; a.textContent = value;
    if (kind === 'telegram') { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
    el.replaceChildren(a);
  });
  const slot = document.getElementById('payment-slot');
  if (slot && ready(c.paymentUrl)) {
    try {
      const url = new URL(c.paymentUrl);
      if (url.protocol !== 'https:' || url.username || url.password) return;
      const a = document.createElement('a'); a.className = 'button payment-button';
      a.href = url.href; a.textContent = 'Купить Premium — 199 ₽'; slot.replaceChildren(a);
      document.getElementById('payment-status').textContent = 'Разовая покупка. Без автопродления.';
    } catch { /* Неверный URL: оплата остаётся отключённой. */ }
  }
})();
