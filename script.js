let cart = [];

const cartCountElement = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartToggleBtn = document.getElementById('cart-toggle-btn');
const closeModalBtn = document.querySelector('.close-modal');
const cartItemsList = document.getElementById('cart-items-list');
const cartTotalPrice = document.getElementById('cart-total-price');
const discountBanner = document.getElementById('discount-banner');

function showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 2500);
}

cartToggleBtn.addEventListener('click', () => {
    cartModal.style.display = 'flex';
    renderCart();
});

closeModalBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === cartModal) cartModal.style.display = 'none';
    if (e.target === detailModal) detailModal.style.display = 'none';
    if (e.target === successModal) successModal.style.display = 'none';
    if (e.target === paymentModal) paymentModal.style.display = 'none';
});

document.querySelectorAll('.buy-btn').forEach((button) => {
    button.addEventListener('click', (e) => {
        const card = e.target.closest('.product-card');
        addToCart(card);
    });
});

function addToCart(card) {
    const id = card.dataset.id;
    const title = card.dataset.title;
    const price = parseInt(card.dataset.price);
    const format = card.dataset.format;

    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id, title, price, format, quantity: 1 });
    }

    updateCartCount();
    showToast(`"${title}" savatchaga qo'shildi!`);
}

function updateCartCount() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalCount;
}

function renderCart() {
    cartItemsList.innerHTML = '';
    if (cart.length === 0) {
        cartItemsList.innerHTML = '<p class="empty-cart-text">Savatchangiz bo\'sh</p>';
        cartTotalPrice.textContent = '0';
        discountBanner.style.display = 'none';
        return;
    }

    let total = 0;
    const totalUniqueItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    cart.forEach(item => {
        total += item.price * item.quantity;
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
            <span>${item.title} (${item.quantity} ta)</span>
            <span>${(item.price * item.quantity).toLocaleString()} UZS</span>
        `;
        cartItemsList.appendChild(div);
    });

    // Kombo Aksiya: 2 tadan ko'p mahsulot bo'lsa 15% chegirma
    if (totalUniqueItems >= 2) {
        total = total * 0.85;
        discountBanner.style.display = 'block';
    } else {
        discountBanner.style.display = 'none';
    }

    cartTotalPrice.textContent = Math.round(total).toLocaleString();
}

// BATAFSIL MODAL OYNASI
const detailModal = document.getElementById('detail-modal');
const closeDetailBtn = document.querySelector('.close-detail');
const modalTitle = document.getElementById('modal-product-title');
const modalDesc = document.getElementById('modal-product-desc');
const modalFeatures = document.getElementById('modal-product-features');
const modalFormat = document.getElementById('modal-product-format');
const modalPrice = document.getElementById('modal-product-price');
const modalBuyBtn = document.getElementById('modal-buy-btn');

let activeCard = null;

document.querySelectorAll('.detail-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        activeCard = e.target.closest('.product-card');
        modalTitle.textContent = activeCard.dataset.title;
        modalDesc.textContent = activeCard.dataset.desc;
        modalFeatures.innerHTML = activeCard.dataset.features;
        modalFormat.textContent = activeCard.dataset.format;
        modalPrice.textContent = parseInt(activeCard.dataset.price).toLocaleString() + " UZS";
        
        detailModal.style.display = 'flex';
    });
});

closeDetailBtn.addEventListener('click', () => {
    detailModal.style.display = 'none';
});

modalBuyBtn.addEventListener('click', () => {
    if (activeCard) {
        addToCart(activeCard);
        detailModal.style.display = 'none';
    }
});

// TUN / KUN REJIMI
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        htmlElement.setAttribute('data-theme', 'light');
        themeToggleBtn.textContent = '☀️';
    } else {
        htmlElement.setAttribute('data-theme', 'dark');
        themeToggleBtn.textContent = '🌙';
    }
});

// ALOQA FORMASI
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const msg = document.getElementById('contact-msg').value.trim();

    if (!name || !email || !msg) {
        showToast('Iltimos, barcha maydonlarni to‘ldiring!');
        return;
    }

    showToast(`Rahmat, ${name}! Xabaringiz qabul qilindi.`);
    e.target.reset();
});

// TO'LOV TIZIMLARI VA SIMULYATSIYA
const paymentModal = document.getElementById('payment-modal');
const closePaymentBtn = document.querySelector('.close-payment');
const successModal = document.getElementById('success-modal');
const closeSuccessBtn = document.getElementById('close-success-btn');
const downloadArea = document.getElementById('download-area');

document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        showToast('Savatchangiz bo\'sh! Avval mahsulot tanlang.');
        return;
    }
    cartModal.style.display = 'none';
    paymentModal.style.display = 'flex';
});

closePaymentBtn.addEventListener('click', () => {
    paymentModal.style.display = 'none';
});

document.querySelectorAll('.pay-method-card').forEach(card => {
    card.addEventListener('click', (e) => {
        paymentModal.style.display = 'none';

        downloadArea.innerHTML = '';
        cart.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.style.margin = "12px 0";
            itemDiv.style.padding = "10px";
            itemDiv.style.background = "var(--bg-color)";
            itemDiv.style.borderRadius = "8px";
            itemDiv.style.border = "1px solid var(--border-color)";
            
            itemDiv.innerHTML = `<strong style="color: var(--accent);">${item.title}</strong><br>`;

            if (item.id === "3" || item.id === "4") {
                itemDiv.innerHTML += `<button class="cta-button copy-link-btn" data-link="https://notion.so/nexusdigital-template-${item.id}" style="margin-top: 8px; font-size: 0.85rem; padding: 6px 12px; width: 100%;">📋 Notion havolasidan nusxalash</button>`;
            } else if (item.id === "6") {
                itemDiv.innerHTML += `<a href="https://t.me/nexusdigital_vip" target="_blank" class="cta-button" style="margin-top: 8px; font-size: 0.85rem; padding: 6px 12px; display: block; text-align: center; text-decoration: none;">👑 VIP Telegram guruhga qo'shilish</a>`;
            } else {
                itemDiv.innerHTML += `<a href="#" class="cta-button" style="margin-top: 8px; font-size: 0.85rem; padding: 6px 12px; display: block; text-align: center; text-decoration: none;" onclick="showToast('Fayl muvaffaqiyatli yuklab olindi!')">📥 Faylni yuklab olish (ZIP/Figma/Kod)</a>`;
            }
            downloadArea.appendChild(itemDiv);
        });

        document.querySelectorAll('.copy-link-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const link = e.target.dataset.link;
                navigator.clipboard.writeText(link);
                showToast('Notion shablon havolasi xotiraga nusxalandi!');
            });
        });

        successModal.style.display = 'flex';
        cart = [];
        updateCartCount();
    });
});

closeSuccessBtn.addEventListener('click', () => {
    successModal.style.display = 'none';
});