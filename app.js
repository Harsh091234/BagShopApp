const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const cookieParser = require("cookie-parser");
const db = require("./config/mongooseconnection");
const productsRouter = require("./routes/productsrouter");
const usersRouter = require("./routes/usersrouter");
const ownersRouter = require("./routes/ownersrouter");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");

const port = process.env.port | 8001;

app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use("/owners", ownersRouter);



app.listen(port, () => console.log(`server connect at port: ${port}`));
