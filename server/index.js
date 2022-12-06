const express = require("express");
const cors = require("cors");
const authRouter = require("./routers/authRouter");
const connectToDatabase = require("./database/db");
const session = require("express-session");
require("dotenv").config();

const app = express();
app.use(cors());

app.use(express.json());

//imposto i cookies:
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    credentials: true,
    name: "sessionid",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.ENVIRONMENT === "production" ? "true" : "auto",
      httpOnly: true,
      sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
    },
  })
);
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRouter);

// tutte le richieste inviate al route del server "/auth"
// eseguiranno il middleware authRouter = un express middleware
// stiamo così usando il il router module all'interno di index.js

app.listen(4000, () => {
  console.log("Server listening on port 4000");
});

connectToDatabase();
