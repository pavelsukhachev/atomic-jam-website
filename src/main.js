// Smooth scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length > 1) {
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// IntersectionObserver reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Simple cart handling
const cart = [];
const fmt = new Intl.NumberFormat('ru-RU');

function renderCart() {
  const itemsEl = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');
  if (!itemsEl || !totalEl) return;
  itemsEl.innerHTML = '';
  let total = 0;
  cart.forEach((item, idx) => {
    const li = document.createElement('li');
    const priceText = item.price === '—' ? '—' : `${fmt.format(item.price)} ₽`;
    li.innerHTML = `<span>${item.name}</span><span>${priceText} <button data-rm="${idx}" class="rm">×</button></span>`;
    itemsEl.appendChild(li);
    if (typeof item.price === 'number') total += item.price;
  });
  totalEl.textContent = `${fmt.format(total)} ₽`;
  itemsEl.querySelectorAll('button.rm').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.getAttribute('data-rm'));
      cart.splice(idx, 1);
      renderCart();
    });
  });
}

document.querySelectorAll('.add-to-order').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.product');
    const name = card?.getAttribute('data-name') || 'Товар';
    const priceAttr = card?.getAttribute('data-price');
    const price = priceAttr === '—' ? '—' : Number(priceAttr);
    cart.push({ name, price });
    renderCart();
    // small feedback
    btn.textContent = 'Добавлено ✓';
    setTimeout(() => (btn.textContent = 'В корзину'), 1200);
  });
});

// Handle form submit
document.getElementById('orderForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const summary = cart.map(i => `${i.name}${typeof i.price === 'number' ? ` — ${fmt.format(i.price)} ₽` : ''}`).join('\n');
  const message = `Спасибо! Заявка отправлена.\n\nИмя: ${data.get('name')}\nТелефон: ${data.get('phone')}\nГород: ${data.get('city')}\nДоставка: ${data.get('delivery')}\nКомментарий: ${data.get('comment') || ''}\n\nКорзина:\n${summary || 'пусто'}\nИтого: ${document.getElementById('cartTotal')?.textContent}`;
  alert(message);
  e.target.reset();
});

