const express = require('express')


//cors import
const cors = require("cors")

//database import
const connection = require("./Config/db");

//routes import
const todoRoutes = require("./Routes/todoRoutes");




const app = express();

app.use(cors())

app.use(express.json());

// use middleware for routing
app.use("/todos", todoRoutes);





app.get('/', (Req,res)=> {
    res.send("Server is running")
})



app.listen(5000, () => {
    console.log("server is running on the port 5000")
})