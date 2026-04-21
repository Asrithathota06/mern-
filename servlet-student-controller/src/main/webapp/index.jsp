<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="com.student.model.Student" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Student Management - Servlet Controller</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 24px; background: #f5f7fb; }
        .card { background: #fff; border: 1px solid #ddd; border-radius: 10px; padding: 18px; margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background: #eef3ff; }
        input { padding: 8px; margin: 6px 0; width: 100%; }
        button, a.btn { background: #0a66c2; color: #fff; border: none; border-radius: 6px; padding: 8px 12px; text-decoration: none; }
        a.btn-delete { background: #b91c1c; }
    </style>
</head>
<body>
<%
    Student editStudent = (Student) request.getAttribute("editStudent");
    List<Student> students = (List<Student>) request.getAttribute("students");
    boolean editing = editStudent != null;
%>

<div class="card">
    <h2><%= editing ? "Update Student" : "Add Student" %></h2>
    <form method="post" action="students">
        <input type="hidden" name="action" value="<%= editing ? "update" : "add" %>" />
        <% if (editing) { %>
            <input type="hidden" name="id" value="<%= editStudent.getId() %>" />
        <% } %>

        <label>Name</label>
        <input type="text" name="name" required value="<%= editing ? editStudent.getName() : "" %>" />

        <label>Age</label>
        <input type="number" name="age" min="1" required value="<%= editing ? editStudent.getAge() : "" %>" />

        <label>Course</label>
        <input type="text" name="course" required value="<%= editing ? editStudent.getCourse() : "" %>" />

        <button type="submit"><%= editing ? "Update" : "Save" %></button>
        <% if (editing) { %>
            <a class="btn" href="students">Cancel</a>
        <% } %>
    </form>
</div>

<div class="card">
    <h2>Students List</h2>
    <table>
        <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Course</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <% if (students != null) {
            for (Student student : students) { %>
            <tr>
                <td><%= student.getId() %></td>
                <td><%= student.getName() %></td>
                <td><%= student.getAge() %></td>
                <td><%= student.getCourse() %></td>
                <td>
                    <a class="btn" href="students?action=edit&id=<%= student.getId() %>">Edit</a>
                    <a class="btn btn-delete" href="students?action=delete&id=<%= student.getId() %>"
                       onclick="return confirm('Delete this student?')">Delete</a>
                </td>
            </tr>
        <%  }
        } %>
        </tbody>
    </table>
</div>
</body>
</html>
