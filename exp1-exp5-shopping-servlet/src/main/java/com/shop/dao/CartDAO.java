package com.shop.dao;

import com.shop.model.CartItem;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class CartDAO {
    public void addToCart(int userId, int productId) throws SQLException {
        String checkSql = "SELECT id, quantity FROM cart_items WHERE user_id = ? AND product_id = ?";
        String updateSql = "UPDATE cart_items SET quantity = ? WHERE id = ?";
        String insertSql = "INSERT INTO cart_items(user_id, product_id, quantity) VALUES (?, ?, 1)";

        try (Connection connection = DBUtil.getConnection();
             PreparedStatement checkStatement = connection.prepareStatement(checkSql)) {

            checkStatement.setInt(1, userId);
            checkStatement.setInt(2, productId);
            try (ResultSet rs = checkStatement.executeQuery()) {
                if (rs.next()) {
                    int cartItemId = rs.getInt("id");
                    int quantity = rs.getInt("quantity") + 1;
                    try (PreparedStatement updateStatement = connection.prepareStatement(updateSql)) {
                        updateStatement.setInt(1, quantity);
                        updateStatement.setInt(2, cartItemId);
                        updateStatement.executeUpdate();
                    }
                } else {
                    try (PreparedStatement insertStatement = connection.prepareStatement(insertSql)) {
                        insertStatement.setInt(1, userId);
                        insertStatement.setInt(2, productId);
                        insertStatement.executeUpdate();
                    }
                }
            }
        }
    }

    public List<CartItem> findCartItems(int userId) throws SQLException {
        String sql = "SELECT c.id, p.id AS product_id, p.name, p.price, c.quantity " +
                "FROM cart_items c JOIN products p ON p.id = c.product_id WHERE c.user_id = ?";
        List<CartItem> items = new ArrayList<>();

        try (Connection connection = DBUtil.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setInt(1, userId);
            try (ResultSet rs = statement.executeQuery()) {
                while (rs.next()) {
                    items.add(new CartItem(
                            rs.getInt("id"),
                            rs.getInt("product_id"),
                            rs.getString("name"),
                            rs.getBigDecimal("price"),
                            rs.getInt("quantity")
                    ));
                }
            }
        }

        return items;
    }

    public BigDecimal getCartTotal(int userId) throws SQLException {
        String sql = "SELECT SUM(p.price * c.quantity) AS total " +
                "FROM cart_items c JOIN products p ON p.id = c.product_id WHERE c.user_id = ?";

        try (Connection connection = DBUtil.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setInt(1, userId);
            try (ResultSet rs = statement.executeQuery()) {
                if (rs.next() && rs.getBigDecimal("total") != null) {
                    return rs.getBigDecimal("total");
                }
            }
        }

        return BigDecimal.ZERO;
    }

    public void removeItem(int cartItemId, int userId) throws SQLException {
        String sql = "DELETE FROM cart_items WHERE id = ? AND user_id = ?";
        try (Connection connection = DBUtil.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, cartItemId);
            statement.setInt(2, userId);
            statement.executeUpdate();
        }
    }

    public void clearCart(int userId) throws SQLException {
        String sql = "DELETE FROM cart_items WHERE user_id = ?";
        try (Connection connection = DBUtil.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, userId);
            statement.executeUpdate();
        }
    }
}
