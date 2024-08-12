const express = require("express");
const mongoose = require("mongoose");
const User = require("./Model/User");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(express.json());

const corsOptions = {
    origin: "https://userinfo-1-wg7g.onrender.com"
}
app.use(cors(corsOptions))

const port = process.env.PORT || 4000;
const url = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database is connected");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1); // Exit the process with failure
    }
};

app.post("/add", (req, res) => {
    try {
        const createUser = new User(req.body);
        createUser
            .save()
            .then(() => {
                res.status(200).json({ message: "User Created Successfully" });
            })
            .catch(() => {
                res.status(500).json({ message: "Unable to Create User" });
            });
    } catch (error) {
        res.status(500).json({ message: "Unable to Create User" });
    }
});

app.get("/get", (req, res) => {
    try {
        User.find()
            .then((users) => {
                res.status(200).json({ users });
            })
            .catch(() => {
                res.status(500).json({ message: "Users are Not found" });
            });
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

app.put("/update/:id", (req, res) => {
    try {
        const id = req.params.id;
        const UpdateUser = req.body;
        User.findByIdAndUpdate(id, UpdateUser, { new: true })
            .then((user) => {
                res.status(200).json({ message: user });
            })
            .catch((err) => {
                res.status(500).json({ message: err });
            });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    User.findByIdAndDelete(id)
        .then((result) => res.json(result))
        .catch((err) => res.status(500).json({ err: err.message }));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectDB(); // Connect to the database when the server starts
});
