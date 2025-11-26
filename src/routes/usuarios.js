var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");


router.post("/cadastrar", function (req, res) {
    console.log("Chegou NAS ROTAS");
    usuarioController.cadastrar(req, res);
})


module.exports = router;