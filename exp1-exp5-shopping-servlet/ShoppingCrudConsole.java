import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Scanner;

public class ShoppingCrudConsole {
    private static final String URL = "jdbc:mysql://localhost:3306/shoppingdb";
    private static final String USER = "root";
    private static final String PASS = "password";

    public static void main(String[] args) {
        try (Connection connection = DriverManager.getConnection(URL, USER, PASS);
             Scanner scanner = new Scanner(System.in)) {

            int choice;
            do {
                System.out.println("\n1. Add Product");
                System.out.println("2. View Products");
                System.out.println("3. Update Product Price");
                System.out.println("4. Delete Product");
                System.out.println("5. Exit");
                System.out.print("Choice: ");
                choice = scanner.nextInt();

                switch (choice) {
                    case 1:
                        addProduct(connection, scanner);
                        break;
                    case 2:
                        viewProducts(connection);
                        break;
                    case 3:
                        updateProduct(connection, scanner);
                        break;
                    case 4:
                        deleteProduct(connection, scanner);
                        break;
                    case 5:
                        System.out.println("Goodbye");
                        break;
                    default:
                        System.out.println("Invalid option");
                }
            } while (choice != 5);

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private static void addProduct(Connection connection, Scanner scanner) throws SQLException {
        scanner.nextLine();
        System.out.print("Product name: ");
        String name = scanner.nextLine();
        System.out.print("Price: ");
        double price = scanner.nextDouble();
        scanner.nextLine();
        System.out.print("Image URL: ");
        String imageUrl = scanner.nextLine();

        String sql = "INSERT INTO products(name, price, image_url) VALUES (?, ?, ?)";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, name);
            statement.setDouble(2, price);
            statement.setString(3, imageUrl);
            statement.executeUpdate();
        }

        System.out.println("Product inserted successfully");
    }

    private static void viewProducts(Connection connection) throws SQLException {
        String sql = "SELECT id, name, price FROM products ORDER BY id";
        try (Statement statement = connection.createStatement();
             ResultSet rs = statement.executeQuery(sql)) {
            while (rs.next()) {
                System.out.println(rs.getInt("id") + " | " + rs.getString("name") + " | Rs." + rs.getBigDecimal("price"));
            }
        }
    }

    private static void updateProduct(Connection connection, Scanner scanner) throws SQLException {
        System.out.print("Product id: ");
        int id = scanner.nextInt();
        System.out.print("New price: ");
        double price = scanner.nextDouble();

        String sql = "UPDATE products SET price = ? WHERE id = ?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setDouble(1, price);
            statement.setInt(2, id);
            int rows = statement.executeUpdate();
            System.out.println(rows > 0 ? "Updated" : "No product found");
        }
    }

    private static void deleteProduct(Connection connection, Scanner scanner) throws SQLException {
        System.out.print("Product id: ");
        int id = scanner.nextInt();

        String sql = "DELETE FROM products WHERE id = ?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, id);
            int rows = statement.executeUpdate();
            System.out.println(rows > 0 ? "Deleted" : "No product found");
        }
    }
}
