const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("./db");

corsOptions = {
  origin: "*",
};

const app = express();
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var auth = require("./routes/authentication");

app.listen(5000, () => {
  console.log("server running ");
});

app.use("/auth", auth);
