const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");
const { authentication } = require("./controllers/auth/authController");
const port = process.env.PORT;
const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", require("./routes/auth/index"));

app.listen(port, async () => {
  console.log("server Is running on " + port);
});
