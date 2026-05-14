const products = [
    {
        id: 1,
        name: "Nike Running Shoes",
        price: 4295,
        img: "https://m.media-amazon.com/images/I/61LWV7ZPPZL._AC_SY879_.jpg"
    },
    {
        id: 2,
        name: "Casio Watch GA-700",
        price: 10295,
        img: "https://www.casio.com/content/dam/casio/product-info/locales/in/en/timepiece/product/watch/G/GA/GA7/GA-700-1B/assets/GA-700-1B_Seq1.png.transform/main-visual-pc/image.png"
    },
    {
        id: 3,
        name: "Leather Jacket",
        price: 10000,
        img: "https://www.sacuir.in/cdn/shop/files/preview_images/ee40722fc3354f19b0f721b7061320d6.thumbnail.0000000000.jpg?v=1722796688&width=990"
    },
    {
        id: 4,
        name: "Wireless Headphones",
        price: 8187,
        img: "https://m.media-amazon.com/images/I/61RahTQtAqL._AC_UF1000,1000_QL80_.jpg"
    }
];

function loadProducts() {
    const container = document.getElementById('products');
    if (!container) return;

    container.innerHTML = products.map((product) => `
        <article class="card">
            <img src="${product.img}" alt="${product.name}">
            <div>
                <h4>${product.name}</h4>
                <p class="price">₹${product.price}</p>
            </div>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        </article>
    `).join('');
}

function addToCart(id) {
    const item = products.find((product) => product.id === id);
    if (!item) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart');
}

function loadCart() {
    const container = document.getElementById('cartItems');
    const totalNode = document.getElementById('total');
    if (!container || !totalNode) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = '<p class="muted">Your cart is empty.</p>';
        totalNode.innerText = '₹0';
        return;
    }

    container.innerHTML = cart.map((item, index) => {
        total += item.price;
        return `
            <div class="cart-row">
                <div>
                    <strong>${item.name}</strong>
                    <small>₹${item.price}</small>
                </div>
                <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    }).join('');

    totalNode.innerText = `₹${total}`;
}

function register() {
    const name = document.getElementById('regName').value.trim();
    const username = document.getElementById('regUser').value.trim();
    const pass = document.getElementById('regPass').value;
    const confirmPass = document.getElementById('regConfirmPass').value;

    if (!name || !username || !pass || !confirmPass) {
        alert('Please fill all fields');
        return;
    }

    if (pass.length < 4) {
        alert('Password must be at least 4 characters');
        return;
    }

    if (pass !== confirmPass) {
        alert('Passwords do not match');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const exists = users.some((user) => user.username === username);

    if (exists) {
        alert('Username already exists');
        return;
    }

    users.push({ name, username, password: pass });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registered successfully');
    window.location.href = 'WEEK1.html';
}

function login() {
    const username = document.getElementById('loginUser')?.value?.trim();
    const pass = document.getElementById('loginPass')?.value;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const found = users.find((user) => user.username === username && user.password === pass);

    if (!found) {
        alert('Invalid username or password');
        return;
    }

    localStorage.setItem('activeUser', JSON.stringify(found));
    alert('Login successful');
    window.location.href = 'catalog.html';
}

function removeItem(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}