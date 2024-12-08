const express = require("express");
const bodyParser = require("body-parser");
const dssRoutes = require("./routes/dss");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
});

app.use("/dss", dssRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
