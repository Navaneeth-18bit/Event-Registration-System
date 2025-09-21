const express = require("express");
const app = express();
const router = require("./routes");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.get("/", (req, res) =>{
    res.send("Build It Up!")
})

app.listen(3000, () => {
    console.log("App running on port 3000")
})