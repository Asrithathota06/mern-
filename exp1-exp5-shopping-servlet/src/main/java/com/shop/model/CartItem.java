package com.shop.model;

import java.math.BigDecimal;

public class CartItem {
    private int cartItemId;
    private int productId;
    private String productName;
    private BigDecimal price;
    private int quantity;

    public CartItem(int cartItemId, int productId, String productName, BigDecimal price, int quantity) {
        this.cartItemId = cartItemId;
        this.productId = productId;
        this.productName = productName;
        this.price = price;
        this.quantity = quantity;
    }

    public int getCartItemId() {
        return cartItemId;
    }

    public int getProductId() {
        return productId;
    }

    public String getProductName() {
        return productName;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public int getQuantity() {
        return quantity;
    }

    public BigDecimal getLineTotal() {
        return price.multiply(BigDecimal.valueOf(quantity));
    }
}
