const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/todos", require("./routes/todoRoutes"));

app.listen(5000, () => console.log("🚀 Server running on port 5000"));