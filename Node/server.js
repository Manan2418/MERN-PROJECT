const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const userroutes = require("./routes");
const Visitor = require("./Model/visitor");

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://manan1810suthar:vFWMl5Xkt6PuxMUe@cluster0.baoqnzs.mongodb.net/VisitorManagement")
    .then(() => console.log("Connected"))
    .catch((error) => console.error(error));

app.use("/", userroutes);

app.get("/addVisitors", (req, res) => {
    Visitor.find()
        .then(visitor => res.json(visitor))
        .catch(err => res.json(err));
});



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
