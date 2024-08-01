const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const Controller = require("./Controllers.js");
const moment=require("moment-timezone")
const Visitor=require("./Model/visitor.js")


router.post(
    "/register",
    [
        body("email").isEmail().withMessage("Please enter a valid email"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters long"),
        body("user").notEmpty().withMessage("Username is required"),
        body("contact").notEmpty().withMessage("Contact is required"),
        body("BirthDay").notEmpty().withMessage("BirthDay is required"),
    ],
    Controller.register
);

router.post("/login", Controller.login);

router.post("/addVisitors", Controller.Visitor);

router.get("/VisitorStats", async (req, res) => {
    try {
        const today = moment().tz("Asia/Kolkata").format("DD-MM-YYYY");
        const yesterday = moment()
            .subtract(1, "days")
            .tz("Asia/Kolkata")
            .format("DD-MM-YYYY");
        const startOfMonth = moment()
            .startOf("month")
            .tz("Asia/Kolkata")
            .format("DD-MM-YYYY");

        const todayCount = await Visitor.countDocuments({ date: today });
        const yesterdayCount = await Visitor.countDocuments({ date: yesterday });
        const monthCount = await Visitor.countDocuments({
            date: { $gte: startOfMonth },
        });
        const totalCount = await Visitor.countDocuments();

        res.json({
            today: todayCount,
            yesterday: yesterdayCount,
            month: monthCount,
            total: totalCount,
        });
    } catch (error) {
        console.error("Error fetching visitor statistics:", error);
        res
            .status(500)
            .send({ message: "Error fetching visitor statistics", error });
    }
});
// Get all visitors
router.get("/addVisitors", (req, res) => {
    Visitor.find()
        .then(visitor => res.json(visitor))
        .catch(err => res.json(err));
});

// Update a visitor
router.put("/addVisitors/:id", (req, res) => {
    Visitor.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(updatedVisitor => res.json(updatedVisitor))
        .catch(err => res.json(err));
});

// Delete a visitor
router.delete("/addVisitors/:id", (req, res) => {
    Visitor.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: "Visitor deleted" }))
        .catch(err => res.json(err));
});

module.exports = router;



module.exports = router;