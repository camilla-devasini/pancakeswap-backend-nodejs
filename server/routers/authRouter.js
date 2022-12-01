const express = require("express");
const validateForm = require("../controllers/validateForm");

const router = express.Router();
// siamo in authRouter.js --> abbiamo creato route MODULE chiamato authRouter.js

//questa è una tipica route function definita tramite il metodo POST
router.post("/login", (req, res) => {
  validateForm(req, res); //callback function che viene invocata quando si ha una richiesta http post with url path "/login"
});

router.post("/signup", (req, res) => {
  validateForm(req, res);
});

module.exports = router;
