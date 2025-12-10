const express = require("express");
const router = express.Router();
const obraController = require("../controllers/obraController");

router.get("/", obraController.getObras);
router.post("/", obraController.criarObra);
router.put("/:index", obraController.atualizarObra);
router.delete("/:index", obraController.deletarObra);

module.exports = router;
