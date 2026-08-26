const express = require("express");
const cors = require("cors");
// 1. Make sure this variable name has a capital 'R'
const authRoutes = require("./routes/authroutes"); 

const app = express();

app.use(cors());
app.use(express.json());

// 2. Make sure this variable name matches with a capital 'R' as well!
app.use("/api/auth", authRoutes); 

app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Job Board API is running" });
});

module.exports = app;
