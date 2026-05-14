const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

let students = [
    { id: 1, name: "Asha", age: 20, course: "CSE" },
    { id: 2, name: "Ravi", age: 21, course: "ECE" }
];

let nextId = 3;

app.get("/", (req, res) => {
    res.json({
        message: "Week 10 Student CRUD API",
        endpoints: [
            "GET /students",
            "GET /students/:id",
            "POST /students",
            "PUT /students/:id",
            "DELETE /students/:id"
        ]
    });
});

app.get("/students", (req, res) => {
    res.json(students);
});

app.get("/students/:id", (req, res) => {
    const student = students.find((item) => item.id === Number(req.params.id));

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
});

app.post("/students", (req, res) => {
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

app.put("/students/:id", (req, res) => {
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

app.delete("/students/:id", (req, res) => {
    const index = students.findIndex((item) => item.id === Number(req.params.id));

    if (index === -1) {
        return res.status(404).json({ message: "Student not found" });
    }

    const deletedStudent = students.splice(index, 1)[0];
    res.json({ message: "Student deleted successfully", student: deletedStudent });
});

app.listen(PORT, () => {
    console.log(`Week 10 API running at http://localhost:${PORT}`);
});
