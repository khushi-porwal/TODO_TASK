const express = require('express')

const {getTodo,createTodo,getTodoById,updateTodo,deleteTodo} = require("../Controller/todoController")

const router = express.Router();

router.get("/", getTodo)
router.post("/", createTodo)
router.get("/:id", getTodoById)
router.put("/:id", updateTodo)
router.delete("/:id", deleteTodo)
module.exports = router;