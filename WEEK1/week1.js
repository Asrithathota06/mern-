let user=JSON.parse(localStorage.getItem('users'))||[];
let cart=JSON.parse(localStorage.getItem('cart'))||[];
const products=[
    {
        id:1,
        name:"Nike Running Shoes",
        price:4295,
        img:"https://m.media-amazon.com/images/I/61LWV7ZPPZL._AC_SY879_.jpg"
    },{
        id:2,
        name:"Casio Watch GA-700",
        price:10295,
        img:"https://www.casio.com/content/dam/casio/product-info/locales/in/en/timepiece/product/watch/G/GA/GA7/GA-700-1B/assets/GA-700-1B_Seq1.png.transform/main-visual-pc/image.png"
    },{
        id:3,
        name:"Leather Jacket",
        price:10000,
        img:"https://www.sacuir.in/cdn/shop/files/preview_images/ee40722fc3354f19b0f721b7061320d6.thumbnail.0000000000.jpg?v=1722796688&width=990"
    },{
        id:4,
        name:"Wirless Headphones",
        price:8187,
        img:"https://m.media-amazon.com/images/I/61RahTQtAqL._AC_UF1000,1000_QL80_.jpg"
}]

window.onload = function () {
    if (document.getElementById("products")) {
        loadProducts();
    }

    if (document.getElementById("cartItems")) {
        loadCart();
    }
};

function loadProducts(){
    let container=document.getElementById('products');
    if(!container) return;
    container.innerHTML = '';
    products.forEach(p=>{
        container.innerHTML += `
        <div class="card">
            <img src="${p.img}" width="100%">
            <h4>${p.name}</h4>
            <p>₹${p.price}</p>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>`;
    });
}

function addToCart(id){
    let item = products.find(p => p.id === id);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert("Added to cart");
}
function loadCart(){
    let container = document.getElementById('cartItems');
    let total = 0;
    container.innerHTML = '';
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.forEach((c,i)=>{
        total += c.price;
        container.innerHTML += `
        <div class="flex">
            <span>${c.name} - ₹${c.price}</span>
            <button onclick="removeItem(${i})">X</button>
        </div>`;
    });

    document.getElementById('total').innerText = "Total: ₹" + total;
}

function register(){
    let name=document.getElementById(regName).value;
    let username=document.getElementById(regUser).value;
    let pass=document.getElementById(password).value;
    let cpass=document.getElementById(confirmpass).value;
    if(pass!==cpass){
        alert("Password are not matching");
        return;
    }
    let users=JSON.parse(localStorage.getItem("users"))||[];
    users.push({
        name:name,
        username:username,
        password:pass
    })
    localStorage.setItem("users",JSON.stringify(users));
    alert("Register Sucesfully");
    window.location.href="WEEK1.html";
}

function login(){
    let username = document.getElementById('loginUser')?.value?.trim();
    let pass = document.getElementById('loginPass')?.value;
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let found = users.find(u => u.username === username && u.password === pass);

    if(!found){
        alert('Invalid username or password');
        return;
    }

    alert('Login successful');
    window.location.href = 'catalog.html';
}

function removeItem(i){
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.splice(i,1);
    localStorage.setItem('cart', JSON.stringify(cart));

    loadCart();
}