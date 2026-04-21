<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Register</title>
    <link rel="stylesheet" href="assets/styles.css" />
</head>
<body>
<header>
    <h2>ShopEasy</h2>
    <nav>
        <a href="auth?action=login">Login</a>
        <a href="auth?action=register">Register</a>
    </nav>
</header>
<div class="container">
    <div class="card">
        <h3>Register</h3>
        <% if (request.getAttribute("error") != null) { %>
            <p class="error"><%= request.getAttribute("error") %></p>
        <% } %>
        <form method="post" action="auth" class="form-grid">
            <input type="hidden" name="action" value="register" />
            <div>
                <label>Name</label>
                <input type="text" name="name" required />
            </div>
            <div>
                <label>Username</label>
                <input type="text" name="username" required />
            </div>
            <div class="full">
                <label>Password</label>
                <input type="password" name="password" required />
            </div>
            <div class="full">
                <button type="submit">Create Account</button>
            </div>
        </form>
    </div>
</div>
</body>
</html>
