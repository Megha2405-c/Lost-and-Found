const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const Item = require("./item");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve all files from the current folder
app.use(express.static(__dirname));

// Explicit home page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Add item
app.post("/add-item", async function (req, res) {

    try {

        const newItem = new Item({
            type: req.body.type,
            itemName: req.body.itemName,
            category: req.body.category,
            description: req.body.description,
            location: req.body.location,
            date: req.body.date,
            contact: req.body.contact
        });

        await newItem.save();

        res.json({
            message: "Item reported successfully!"
        });

    } catch (error) {

        console.log("Database error:", error);

        res.status(500).json({
            message: "Error adding item"
        });
    }
});

// Get items
app.get("/items", async function (req, res) {

    try {

        const items = await Item.find();

        res.json(items);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error fetching items"
        });
    }
});

// Start server
app.listen(3000, function () {
    console.log("Server running at http://localhost:3000");
});

// MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/lostAndFound")
    .then(function () {
        console.log("MongoDB Connected");
    })
    .catch(function (error) {
        console.log("MongoDB Error:", error);
    });