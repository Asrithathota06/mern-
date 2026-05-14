import java.sql.*;
import java.util.Scanner;

public class StudentCRUD {

    static final String URL = "jdbc:mysql://localhost:3306/studentdb";
    static final String USER = "root";
    static final String PASS = "root123";

    static Connection con;

    public static void main(String[] args) {
        try {
            con = DriverManager.getConnection(URL, USER, PASS);
            System.out.println("Connected to database!");

            Scanner sc = new Scanner(System.in);
            int choice;

            do {
                System.out.println("\n1.Insert\n2.View\n3.Update\n4.Delete\n5.Exit");
                System.out.print("Enter choice: ");
                choice = sc.nextInt();

                switch (choice) {
                    case 1: insert(sc); break;
                    case 2: view(); break;
                    case 3: update(sc); break;
                    case 4: delete(sc); break;
                    default: break;
                }

            } while (choice != 5);

            con.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    static void insert(Scanner sc) throws SQLException {
        System.out.print("Enter name: ");
        String name = sc.next();
        System.out.print("Enter age: ");
        int age = sc.nextInt();
        System.out.print("Enter course: ");
        String course = sc.next();

        String query = "INSERT INTO students(name,age,course) VALUES(?,?,?)";
        try (PreparedStatement ps = con.prepareStatement(query)) {
            ps.setString(1, name);
            ps.setInt(2, age);
            ps.setString(3, course);
            ps.executeUpdate();
            System.out.println("Record inserted!");
        }
    }

    static void view() throws SQLException {
        String query = "SELECT * FROM students";
        try (Statement st = con.createStatement();
             ResultSet rs = st.executeQuery(query)) {
            while (rs.next()) {
                System.out.println(rs.getInt("id") + " "
                        + rs.getString("name") + " "
                        + rs.getInt("age") + " "
                        + rs.getString("course"));
            }
        }
    }

    static void update(Scanner sc) throws SQLException {
        System.out.print("Enter ID to update: ");
        int id = sc.nextInt();

        System.out.print("Enter new name: ");
        String name = sc.next();

        String query = "UPDATE students SET name=? WHERE id=?";
        try (PreparedStatement ps = con.prepareStatement(query)) {
            ps.setString(1, name);
            ps.setInt(2, id);
            ps.executeUpdate();
            System.out.println("Record updated!");
        }
    }

    static void delete(Scanner sc) throws SQLException {
        System.out.print("Enter ID to delete: ");
        int id = sc.nextInt();

        String query = "DELETE FROM students WHERE id=?";
        try (PreparedStatement ps = con.prepareStatement(query)) {
            ps.setInt(1, id);
            ps.executeUpdate();
            System.out.println("Record deleted!");
        }
    }
}