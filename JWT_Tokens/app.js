const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3001;
const SECRET_KEY = "week11-secret-key";

app.use(express.json());

let students = [
    { id: 1, name: "Asha", age: 20, course: "CSE" },
    { id: 2, name: "Ravi", age: 21, course: "ECE" }
];

let nextId = 3;

const demoUser = {
    username: "admin",
    password: "admin123"
};

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access token required" });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired token" });
        }

        req.user = user;
        next();
    });
}

app.get("/", (req, res) => {
    res.json({
        message: "Week 11 JWT Student CRUD API",
        publicEndpoints: ["POST /login"],
        protectedEndpoints: [
            "GET /students",
            "GET /students/:id",
            "POST /students",
            "PUT /students/:id",
            "DELETE /students/:id"
        ]
    });
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username !== demoUser.username || password !== demoUser.password) {
        return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
});

app.get("/students", authenticateToken, (req, res) => {
    res.json(students);
});

app.get("/students/:id", authenticateToken, (req, res) => {
    const student = students.find((item) => item.id === Number(req.params.id));

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
});

app.post("/students", authenticateToken, (req, res) => {
    const { name, age, course } = req.body;

    if (!name || !age || !course) {
        return res.status(400).json({ message: "name, age and course are required" });
    }

    const student = {
        id: nextId++,
        name,
        age: Number(age),
        course
    };

    students.push(student);
    res.status(201).json(student);
});

app.put("/students/:id", authenticateToken, (req, res) => {
    const student = students.find((item) => item.id === Number(req.params.id));

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    const { name, age, course } = req.body;

    if (!name || !age || !course) {
        return res.status(400).json({ message: "name, age and course are required" });
    }

    student.name = name;
    student.age = Number(age);
    student.course = course;

    res.json(student);
});

app.delete("/students/:id", authenticateToken, (req, res) => {
    const index = students.findIndex((item) => item.id === Number(req.params.id));

    if (index === -1) {
        return res.status(404).json({ message: "Student not found" });
    }

    const deletedStudent = students.splice(index, 1)[0];
    res.json({ message: "Student deleted successfully", student: deletedStudent });
});

app.listen(PORT, () => {
    console.log(`Week 11 API running at http://localhost:${PORT}`);
});
