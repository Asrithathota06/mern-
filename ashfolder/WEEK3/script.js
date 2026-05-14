const cartCount = document.getElementById("cartCount");
const { page } = document.body.dataset;
const savedItems = JSON.parse(localStorage.getItem("shopLiteCart") || "[]");

let items = [...savedItems];

function formatPrice(amount) {
    return `₹${amount.toLocaleString("en-IN")}`;
}

function saveCart() {
    localStorage.setItem("shopLiteCart", JSON.stringify(items));
}

function renderCart() {
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    if (!cartItems || !cartTotal) {
        if (cartCount) {
            cartCount.textContent = String(items.length);
        }
        return;
    }

    cartItems.innerHTML = "";

    if (items.length === 0) {
        cartItems.innerHTML = '<li class="list-group-item px-0 text-muted">No items added yet.</li>';
        cartTotal.textContent = "₹0";
        cartCount.textContent = "0";
        saveCart();
        return;
    }

    let total = 0;

    items.forEach((item) => {
        total += item.price;

        const li = document.createElement("li");
        li.className = "list-group-item px-0 d-flex justify-content-between align-items-center";
        li.innerHTML = `<span>${item.name}</span><span class="fw-semibold">${formatPrice(item.price)}</span>`;
        cartItems.appendChild(li);
    });

    cartTotal.textContent = formatPrice(total);
    cartCount.textContent = String(items.length);
    saveCart();
}

function handleRegister() {
    const form = document.getElementById("registerForm");
    const message = document.getElementById("registerMessage");

    form?.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("registerName");
        const email = document.getElementById("registerEmail");
        const password = document.getElementById("registerPassword");

        const isNameValid = name.value.trim().length > 0;
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
        const isPasswordValid = password.value.length >= 6;

        name.classList.toggle("is-invalid", !isNameValid);
        email.classList.toggle("is-invalid", !isEmailValid);
        password.classList.toggle("is-invalid", !isPasswordValid);

        if (!isNameValid || !isEmailValid || !isPasswordValid) {
            message.textContent = "";
            return;
        }

        message.textContent = `Welcome, ${name.value.trim()}! Registration details look good.`;
        form.reset();
        name.classList.remove("is-invalid");
        email.classList.remove("is-invalid");
        password.classList.remove("is-invalid");
    });
}

function handleLogin() {
    const form = document.getElementById("loginForm");
    const message = document.getElementById("loginMessage");

    form?.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("loginEmail");
        const password = document.getElementById("loginPassword");

        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
        const isPasswordValid = password.value.length >= 6;

        email.classList.toggle("is-invalid", !isEmailValid);
        password.classList.toggle("is-invalid", !isPasswordValid);

        if (!isEmailValid || !isPasswordValid) {
            message.textContent = "";
            return;
        }

        message.textContent = "Login details look good.";
        form.reset();
        email.classList.remove("is-invalid");
        password.classList.remove("is-invalid");
    });
}

function handleCatalog() {
    document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", () => {
            const { name, price } = button.dataset;
            items.push({ name, price: Number(price) });
            if (cartCount) {
                cartCount.textContent = String(items.length);
            }
            saveCart();
        });
    });
}

function handleCart() {
    const clearCart = document.getElementById("clearCart");

    clearCart?.addEventListener("click", () => {
        items = [];
        saveCart();
        renderCart();
    });
}

if (cartCount) {
    cartCount.textContent = String(items.length);
}

if (page === "register") {
    handleRegister();
}

if (page === "login") {
    handleLogin();
}

if (page === "catalog") {
    handleCatalog();
}

if (page === "cart") {
    handleCart();
    renderCart();
}