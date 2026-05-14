const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// GET all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST new task (THIS SAVES TO MONGO)
router.post("/", async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const newTask = new Task({
      title,
      completed: false,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
// UPDATE task (mark completed)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { completed },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // check id format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
