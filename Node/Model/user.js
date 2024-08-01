const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());

const userSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    contact: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    BirthDay: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model("Users",userSchema);