const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path=require("path");

const app = express(); // ✅ app MUST be created first

// ✅ middlewares AFTER app creation
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));
// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/task_manager")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// routes
const taskRoutes = require("./routes/tasks");
app.use("/tasks", taskRoutes);
//const userRoutes = require("./routes/user")
//app.use("/api", userRoutes)
// server start
app.get("/", (req, res) => {
    res.send("Task Manager API is running")
})
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
