const { Pool } = require("pg");
require("dotenv").config();
//configuro il mio database:

//creo una istanza pool e passo un oggetto di configurazione
// faccio riferimento alle environment variables che si trovano in .env
const pool = new Pool({
  database: process.env.DATABASE_NAME,
  //   password: process.env.PASSWORD, non ho impostato una password
  user: process.env.DATABASE_USER, //è meglio non assegnare un user? altrimenti come lo condividiamo all'interno del team??
  port: process.env.DATABASE_PORT,
  host: process.env.DATABASE_HOST,
});

async function connectToDatabase() {
  try {
    await pool.connect();
    console.log("Connected to database");
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectToDatabase;
// esporto la funzione connectToDatabase che viene importata in index.js
// le queries sul database si trovano in routers/authRouter
