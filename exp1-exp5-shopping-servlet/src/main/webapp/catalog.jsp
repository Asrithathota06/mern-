<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="com.shop.model.Product" %>
<%@ page import="com.shop.model.User" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Catalog</title>
    <link rel="stylesheet" href="assets/styles.css" />
</head>
<body>
<%
    User user = (User) session.getAttribute("user");
    List<Product> products = (List<Product>) request.getAttribute("products");
%>
<header>
    <h2>ShopEasy - Welcome <%= user.getName() %></h2>
    <nav>
        <a href="catalog">Catalog</a>
        <a href="cart">Cart</a>
        <a href="auth?action=logout">Logout</a>
    </nav>
</header>
<div class="container">
    <div class="top-actions">
        <h3>Product Catalog</h3>
        <a href="cart">Go to Cart</a>
    </div>

    <div class="product-grid">
        <% for (Product p : products) { %>
            <div class="card product-card">
                <img src="<%= p.getImageUrl() %>" alt="<%= p.getName() %>" />
                <h4><%= p.getName() %></h4>
                <p class="price">Rs. <%= p.getPrice() %></p>
                <form method="post" action="catalog">
                    <input type="hidden" name="action" value="addToCart" />
                    <input type="hidden" name="productId" value="<%= p.getId() %>" />
                    <button type="submit">Add to Cart</button>
                </form>
            </div>
        <% } %>
    </div>
</div>
</body>
</html>
