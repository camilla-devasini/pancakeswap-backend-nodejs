const express = require("express");
const validateForm = require("../controllers/validateForm");
const pool = require("./../database/db");
const bcrypt = require("bcrypt");

// siamo in authRouter.js --> abbiamo creato route MODULE chiamato authRouter.js
const router = express.Router();

//url path di signup
router.post("/signup", async (req, res) => {
  validateForm(req, res);
  //queries sul database:
  const existingUser = await pool.query(
    "SELECT username from users WHERE username=$1",
    [req.body.username]
  );

  if (existingUser.rowCount === 0) {
    //trovo 0 righe nel database con lo username inserito --> procedo alla registrazione
    //creo la password criptata
    const saltRounds = 10;
    const hashedPass = await bcrypt.hash(req.body.password, saltRounds); //vedi nota in fondo
    //inserisco la password nel database
    const newUserQuery = await pool.query(
      "INSERT INTO users(username, passhash) values($1,$2) RETURNING id, username",
      [req.body.username, hashedPass]
    );
    //salvo lo user nella sessione
    req.session.user = {
      username: req.body.username,
      id: newUserQuery.rows[0].id,
    };
    res.json({ loggedIn: true, username: req.body.username });
  } else {
    res.json({ loggedIn: false, status: "Username taken" });
  }
});

//url path di login
router.post("/login", async (req, res) => {
  validateForm(req, res); //callback function che viene invocata quando si ha una richiesta http post with url path "/login"
  //queries sul database:

  //cerco il primo valore con quello username inserito nel form, dentro alla table
  const potentialLogin = await pool.query(
    "SELECT id, username, passhash FROM users u WHERE u.username=$1",
    [req.body.username]
  );
  //Ho trovato almeno una riga in tabella per quell'utente
  if (potentialLogin.rowCount > 0) {
    //controllo che lo user abbia inserito la password corretta - controllo la password della prima riga (primo risultato = row[0])
    const isSamePass = await bcrypt.compare(
      req.body.password,
      potentialLogin.rows[0].passhash
    );
    if (isSamePass) {
      //salvo lo user nella sessione
      req.session.user = {
        username: req.body.username,
        id: potentialLogin.rows[0].id,
      };
      res.json({ loggedIn: true, username: req.body.username });
    } else {
      res.json({ loggedIn: false, status: "Wrong username or password!" });
      console.log("not good");
    }
  } else {
    console.log("not good");
    res.json({ loggedIn: false, status: "Wrong username or password!" });
  }
});
module.exports = router;

//"salt round" = the cost factor.
//controlla quanto tempo è necessario per calcolare 1 singola bcrypt hash
//Più è alto il numero di cost factor, più hashing rounds sono eseguiti.
//Aumentare il cost factor di 1 significa raddoppiare il tempo necessario.
