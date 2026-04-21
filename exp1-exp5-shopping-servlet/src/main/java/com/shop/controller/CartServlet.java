package com.shop.controller;

import com.shop.dao.CartDAO;
import com.shop.model.CartItem;
import com.shop.model.User;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;

@WebServlet("/cart")
public class CartServlet extends HttpServlet {
    private CartDAO cartDAO;

    @Override
    public void init() {
        this.cartDAO = new CartDAO();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        User user = getLoggedInUser(request, response);
        if (user == null) {
            return;
        }

        try {
            List<CartItem> items = cartDAO.findCartItems(user.getId());
            BigDecimal total = cartDAO.getCartTotal(user.getId());
            request.setAttribute("items", items);
            request.setAttribute("total", total);
            request.getRequestDispatcher("/cart.jsp").forward(request, response);
        } catch (SQLException e) {
            throw new ServletException("Failed to load cart", e);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        User user = getLoggedInUser(request, response);
        if (user == null) {
            return;
        }

        String action = request.getParameter("action");

        try {
            if ("remove".equals(action)) {
                int cartItemId = Integer.parseInt(request.getParameter("cartItemId"));
                cartDAO.removeItem(cartItemId, user.getId());
            } else if ("checkout".equals(action)) {
                cartDAO.clearCart(user.getId());
            }
            response.sendRedirect(request.getContextPath() + "/cart");
        } catch (SQLException e) {
            throw new ServletException("Failed to update cart", e);
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
