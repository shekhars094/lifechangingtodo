const path = require("path");
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const todoRouter = require("./routes/todo");

const app = express();
const publicPath = path.join(__dirname, "public");
const templatePath = path.join(__dirname, "views");

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("views", templatePath);
app.set("view engine", "ejs");

// Database Conncection

mongoose
    .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/lifetodos", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log(`Database is connected`);
    })
    .catch(err => {
        console.log(`There is Some Error ${err}`);
    });

// LifeTodo router

app.use("/", todoRouter);

app.get("/todo", (req, res) => {
    console.log("Chutiya");
    res.json({ message: "Chutiya" });
});

app.listen(port, () => {
    console.log("App is running on ", port);
});
