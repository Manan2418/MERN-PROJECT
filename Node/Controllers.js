const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY || "secretkey";
const Visitor = require("./Model/visitor.js");
const User = require("./Model/user.js");
const { json } = require("body-parser");
const moment = require('moment-timezone');

exports.register = async (req, res) => {
    try {
        console.log("Register endpoint called with body:", req.body);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("Validation errors:", errors.array());
            return res.status(400).json({ errors: errors.array() });
        }

        const { password, user, email, contact, BirthDay } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("Email already registered:", email);
            return res.status(400).send({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            user,
            email,
            contact,
            password: hashedPassword,
            BirthDay,
        });

        const addUser = await newUser.save();
        console.log("New user registered:", newUser);

        res.status(200).send({
            message: "User registered successfully",
            data: addUser,
        });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send({ message: "Error registering user", error });
    }
};

exports.login = async (req, res) => {
    try {
        console.log("Login endpoint called with body:", req.body);

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            console.log("Email not found:", email);
            return res.status(404).send({ message: "Email not found" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            console.log("Invalid password for email:", email);
            return res.status(401).send({ message: "Invalid Password" });
        }

        const token = jwt.sign({ email: user.email }, secretKey, {
            expiresIn: "1h",
        });

        console.log("User logged in:", user);
        res.status(200).send({ message: "Login Successful", token });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).send({ message: "Error logging in", error });
    }
};
const currentTimeIST = moment().tz("Asia/Kolkata");
const currentDateIST = currentTimeIST.format('DD-MM-YYYY');
const currentTimeISTFormatted = currentTimeIST.format('HH:mm:ss');
exports.Visitor = async (req, res) => {
    try {
        console.log("AddVisitor is called:", req.body);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("Validation errors:", errors.array());
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            date: dateInput,
            firstName,
            lastName,
            phoneNumber,
            email,
            address,
            purposeOfVisit,
            whomToMeet,
            inTime: inTimeInput
        } = req.body;

        // Parse and format date and time to IST
        const currentDateIST = moment(dateInput).tz("Asia/Kolkata").format('DD-MM-YYYY');
        const currentTimeISTFormatted = moment(currentTimeIST).tz("Asia/Kolkata").format('HH:mm:ss');

        // Create a new Visitor instance
        const visitor = new Visitor({
            date: currentDateIST,
            firstName,
            lastName,
            phoneNumber,
            email,
            address,
            purposeOfVisit,
            whomToMeet,
            inTime: currentTimeISTFormatted
        });

        // Save the visitor to the database
        const newVisitor = await visitor.save();
        console.log("New visitor registered:", newVisitor);

        res.status(200).send({
            message: "Visitor registered successfully",
            data: newVisitor
        });
    } catch (error) {
        console.error("Error registering visitor:", error);
        res.status(500).send({ message: "Error registering visitor", error });
    }
};