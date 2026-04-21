<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="java.math.BigDecimal" %>
<%@ page import="com.shop.model.CartItem" %>
<%@ page import="com.shop.model.User" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Cart</title>
    <link rel="stylesheet" href="assets/styles.css" />
</head>
<body>
<%
    User user = (User) session.getAttribute("user");
    List<CartItem> items = (List<CartItem>) request.getAttribute("items");
    BigDecimal total = (BigDecimal) request.getAttribute("total");
%>
<header>
    <h2>ShopEasy - <%= user.getName() %></h2>
    <nav>
        <a href="catalog">Catalog</a>
        <a href="cart">Cart</a>
        <a href="auth?action=logout">Logout</a>
    </nav>
</header>
<div class="container">
    <div class="card">
        <h3>Your Cart</h3>
        <% if (items == null || items.isEmpty()) { %>
            <p class="muted">Your cart is empty.</p>
        <% } else { %>
            <% for (CartItem item : items) { %>
                <div class="cart-row">
                    <div>
                        <strong><%= item.getProductName() %></strong>
                        <p class="muted">Rs. <%= item.getPrice() %> x <%= item.getQuantity() %></p>
                    </div>
                    <div>
                        <strong>Rs. <%= item.getLineTotal() %></strong>
                        <form method="post" action="cart" style="margin-top:6px;">
                            <input type="hidden" name="action" value="remove" />
                            <input type="hidden" name="cartItemId" value="<%= item.getCartItemId() %>" />
                            <button class="danger" type="submit">Remove</button>
                        </form>
                    </div>
                </div>
            <% } %>
            <h4>Total: Rs. <%= total %></h4>
            <form method="post" action="cart">
                <input type="hidden" name="action" value="checkout" />
                <button type="submit">Checkout</button>
            </form>
        <% } %>
    </div>
</div>
</body>
</html>
