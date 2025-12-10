const express = require("express");
const router = express.Router();
const avaliacaoController = require("../controllers/avaliacaoController");

router.get("/", avaliacaoController.getAvaliacoes);
router.post("/", avaliacaoController.criarAvaliacao);
router.put("/:index", avaliacaoController.atualizarAvaliacao);
router.delete("/:index", avaliacaoController.deletarAvaliacao);

module.exports = router;
