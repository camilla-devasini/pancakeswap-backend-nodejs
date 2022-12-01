const express = require("express");
const cors = require("cors");
const authRouter = require("./routers/authRouter");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.use("/auth", authRouter);
//tutte le richieste inviate al route del server "/auth"
// eseguiranno il middleware authRouter = un express middleware
// stiamo così usando il il router module all'interno di index.js

app.listen(4000, () => {
  console.log("Server listening on port 4000");
});
