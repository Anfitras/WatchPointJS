const express = require("express");
const router = express.Router();
const obraController = require("../controllers/obraController");

router.get("/", obraController.getObras);
router.post("/", obraController.criarObra);
router.put("/:id", obraController.atualizarObra); 
router.delete("/:id", obraController.deletarObra); 

module.exports = router;
