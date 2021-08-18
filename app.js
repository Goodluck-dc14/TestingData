const express = require("express");
const port = 2020;
require("dotenv").config();
const app = express();
app.use(express.json());

const studentData = [
  { id: 1, name: "Goodluck", course: "fullstack" },
  { id: 2, name: "cynthia", course: "ui/ux" },
  { id: 3, name: "judith", course: "frontend" },
  { id: 4, name: "chris", course: "backend" },
  { id: 5, name: "lucky", course: "transformational leadership" },
];

app.get("/studentData", (req, res) => {
  res.status(200).json({ studentData });
});

app.post("/api/studentData", (req, res) => {
  if (!req.body.name || !req.body.course) {
    return res.status(400).send("cant be found");
  }
  const newStudent = {
    id: studentData.length + 1,
    name: req.body.name,
    course: req.body.course,
  };
  studentData.push(newStudent);
  res.status(200).json({ studentData });
});

app.get("/api/student/:id", (req, res) => {
  const studentId = studentData.find(
    (stud) => stud.id === parseInt(req.params.id)
  );
  if (!studentId) {
    console.log(`no user with this id: ${req.params.id}`);
  }
  res
    .status(200)
    .json({ message: `student id: ${req.params.id}`, data: studentId });
});

app.get("/", (req, res) => {
  res.send("me and my team just finished working on static db");
});

app.listen(port, () => {
  console.log(`server is listening on port: ${port} `);
});
