const connection = require("../Config/db");

//Get Request
const getTodo = (req, res) => {
  try {
    const query = "SELECT * FROM Todo";

    connection.query(query, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error during fetching data",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Sucessfully fetched",
        data: result,
      });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//create request

const createTodo = (req, res) => {
  try {
    const { title, status } = req.body;

    if (!title || !status) {
      return res.status(400).json({
        success: false,
        message: "empty titles and status are not allowed",
      });
    }

    const query = "INSERT INTO Todo (title,status) VALUES(?,?)";

    connection.query(query, [title, status], (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error during created todo",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Sucessfully created",
        data: result,
      });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//update todo

const updateTodo = (req, res) => {
  const { id } = req.params;
  const { title, status } = req.body;

  if (!title || !status) {
    return res.status(400).json({
      success: false,
      message: "empty titles and status are not allowed",
    });
  }
  const query = "UPDATE Todo SET title = ?, status = ? where id= ?";

  connection.query(query, [title, status, id], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error during updated todo",
      });
    }

    if (result.length == 0) {
      return res.status(404).json({
        success: false,
        message: "Todo id not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Sucessfully updated",
      data: result,
    });
  });
};

//GET todo by ID

const getTodoById = (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "id is not their",
      });
    }

    const query = "SELECT * FROM Todo where id = ?";

    connection.query(query, [id], (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "error fetching during todo",
        });
      }

      if (result.length == 0) {
        return res.status(404).json({
          success: false,
          message: "Todo id not found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Todo fetched successfully",
        data: result,
      });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};


//deleted todo
const deleteTodo = (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM TODO WHERE id = ?";

    connection.query(query, [id], (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "error deleting during todo",
        });
      }

      if (result.length == 0) {
        return res.status(404).json({
          success: false,
          message: "Todo id not found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Todo deleted successfully",
        data: result,
      });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
module.exports = {
  getTodo,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo
};
