package com.shop.controller;

import com.shop.dao.CartDAO;
import com.shop.dao.ProductDAO;
import com.shop.model.Product;
import com.shop.model.User;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

@WebServlet("/catalog")
public class CatalogServlet extends HttpServlet {
    private ProductDAO productDAO;
    private CartDAO cartDAO;

    @Override
    public void init() {
        this.productDAO = new ProductDAO();
        this.cartDAO = new CartDAO();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        User user = getLoggedInUser(request, response);
        if (user == null) {
            return;
        }

        try {
            List<Product> products = productDAO.findAll();
            request.setAttribute("products", products);
            request.getRequestDispatcher("/catalog.jsp").forward(request, response);
        } catch (SQLException e) {
            throw new ServletException("Failed to load catalog", e);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        User user = getLoggedInUser(request, response);
        if (user == null) {
            return;
        }

        String action = request.getParameter("action");
        if (!"addToCart".equals(action)) {
            response.sendRedirect(request.getContextPath() + "/catalog");
            return;
        }

        try {
            int productId = Integer.parseInt(request.getParameter("productId"));
            cartDAO.addToCart(user.getId(), productId);
            response.sendRedirect(request.getContextPath() + "/cart");
        } catch (SQLException e) {
            throw new ServletException("Failed to add to cart", e);
        }
    }

    private User getLoggedInUser(HttpServletRequest request, HttpServletResponse response) throws IOException {
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("user") == null) {
            response.sendRedirect(request.getContextPath() + "/auth?action=login");
            return null;
        }
        return (User) session.getAttribute("user");
    }
}
