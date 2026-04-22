// Shopping Cart
let cart = [];

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('peralisCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

function saveCart() {
    localStorage.setItem('peralisCart', JSON.stringify(cart));
}

function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    saveCart();
    updateCartCount();
    showNotification(`${name} ditambahkan ke keranjang!`);
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const el = document.getElementById('cart-count');
    if (el) el.textContent = totalItems;
}

function showCart() {
    if (cart.length === 0) {
        alert('Keranjang belanja Anda kosong!');
        return;
    }

    let total = 0;
    let rows = '';
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        rows += `
        <div style="border-bottom:1px solid #e5e7eb;padding:14px 0;display:flex;justify-content:space-between;align-items:center;">
            <div>
                <div style="font-weight:600;">${item.name}</div>
                <div style="color:#6b7280;font-size:13px;">Rp ${item.price.toLocaleString('id-ID')} x ${item.quantity}</div>
            </div>
            <div style="display:flex;align-items:center;gap:10px;">
                <div style="font-weight:bold;">Rp ${itemTotal.toLocaleString('id-ID')}</div>
                <button onclick="removeFromCart(${index})" style="background:#ef4444;color:white;padding:5px 12px;border-radius:8px;font-size:12px;cursor:pointer;">Hapus</button>
            </div>
        </div>`;
    });

    const modal = document.createElement('div');
    modal.id = 'cart-modal';
    modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;';
    modal.innerHTML = `
        <div style="background:white;padding:30px;border-radius:20px;max-width:600px;width:90%;max-height:80vh;overflow-y:auto;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
                <h2 style="font-size:22px;font-weight:bold;">🛒 Keranjang Belanja</h2>
                <button onclick="document.getElementById('cart-modal').remove()" style="font-size:22px;background:none;cursor:pointer;">✕</button>
            </div>
            ${rows}
            <div style="margin-top:20px;padding-top:20px;border-top:2px solid #a3e635;">
                <div style="display:flex;justify-content:space-between;font-size:20px;font-weight:bold;margin-bottom:20px;">
                    <span>Total:</span>
                    <span>Rp ${total.toLocaleString('id-ID')}</span>
                </div>
                <button onclick="checkout()" style="width:100%;background:#a3e635;color:black;font-weight:bold;padding:15px;border-radius:15px;font-size:16px;cursor:pointer;">
                    Checkout Sekarang
                </button>
            </div>
        </div>`;
    modal.addEventListener('click', function(e) {
        if (e.target === modal) modal.remove();
    });
    document.body.appendChild(modal);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartCount();
    const modal = document.getElementById('cart-modal');
    if (modal) modal.remove();
    if (cart.length > 0) showCart();
}

function checkout() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Terima kasih! Pesanan Anda sedang diproses.\n\nTotal: Rp ${total.toLocaleString('id-ID')}`);
    cart = [];
    saveCart();
    updateCartCount();
    const modal = document.getElementById('cart-modal');
    if (modal) modal.remove();
}

function showNotification(message) {
    const n = document.createElement('div');
    n.textContent = message;
    n.style.cssText = 'position:fixed;top:90px;right:20px;background:#a3e635;color:black;padding:14px 22px;border-radius:14px;font-weight:600;z-index:10000;box-shadow:0 8px 20px rgba(0,0,0,0.15);transition:opacity 0.3s;';
    document.body.appendChild(n);
    setTimeout(() => { n.style.opacity = '0'; setTimeout(() => n.remove(), 300); }, 2200);
}

function scrollToSection(sectionId) {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return false;
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) menu.classList.toggle('hidden');
}

function focusSearch() {
    const input = document.getElementById('search-input');
    if (input) input.focus();
}

function showLoginModal() {
    const modal = document.createElement('div');
    modal.id = 'login-modal';
    modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;';
    modal.innerHTML = `
        <div style="background:white;padding:40px;border-radius:24px;max-width:420px;width:90%;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;">
                <h2 style="font-size:22px;font-weight:bold;">Sign In</h2>
                <button onclick="document.getElementById('login-modal').remove()" style="font-size:22px;background:none;cursor:pointer;">✕</button>
            </div>
            <input id="login-email" type="email" placeholder="Email" style="width:100%;padding:12px 16px;border:1px solid #d1d5db;border-radius:12px;margin-bottom:12px;font-size:14px;box-sizing:border-box;">
            <input id="login-pass" type="password" placeholder="Password" style="width:100%;padding:12px 16px;border:1px solid #d1d5db;border-radius:12px;margin-bottom:20px;font-size:14px;box-sizing:border-box;">
            <button onclick="doLogin()" style="width:100%;background:#a3e635;color:black;font-weight:bold;padding:14px;border-radius:14px;font-size:16px;cursor:pointer;">Masuk</button>
            <p style="text-align:center;margin-top:16px;font-size:13px;color:#6b7280;">Belum punya akun? <a href="#" style="color:#65a30d;font-weight:600;">Daftar</a></p>
        </div>`;
    modal.addEventListener('click', function(e) { if (e.target === modal) modal.remove(); });
    document.body.appendChild(modal);
    return false;
}

function doLogin() {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-pass').value;
    if (!email || !pass) { alert('Mohon isi email dan password!'); return; }
    alert(`Selamat datang, ${email}!\n\nFitur login penuh akan segera hadir.`);
    document.getElementById('login-modal')?.remove();
}

function buyNowHero() {
    // If we're on main.html, navigate to body.html and scroll to pensil
    if (window.location.pathname.includes('main.html') || window.location.pathname.endsWith('/')) {
        window.location.href = 'body.html#pensil';
    } else {
        scrollToSection('pensil');
    }
}

function viewAll(category) {
    alert(`Menampilkan semua produk: ${category.toUpperCase()}\n\nFitur ini akan segera hadir!`);
    return false;
}

// Search
function handleSearch(query) {
    if (!query.trim()) return;
    const cards = document.querySelectorAll('.product-card');
    let found = 0;
    cards.forEach(card => {
        const name = card.querySelector('h3')?.textContent.toLowerCase() || '';
        if (name.includes(query.toLowerCase())) {
            card.style.outline = '3px solid #a3e635';
            found++;
        } else {
            card.style.outline = '';
        }
    });
    if (found === 0) alert(`Produk "${query}" tidak ditemukan.`);
    else showNotification(`${found} produk ditemukan untuk "${query}"`);
}

document.addEventListener('DOMContentLoaded', function () {
    loadCart();

    // Auto-scroll to hash section if navigated from another page
    if (window.location.hash) {
        const target = document.getElementById(window.location.hash.substring(1));
        if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') handleSearch(this.value);
        });
        searchInput.addEventListener('input', function () {
            if (!this.value.trim()) {
                document.querySelectorAll('.product-card').forEach(c => c.style.outline = '');
            }
        });
    }
});
