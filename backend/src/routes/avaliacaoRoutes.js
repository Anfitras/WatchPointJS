const express = require("express");
const router = express.Router();
const avaliacaoController = require("../controllers/avaliacaoController");

router.get("/", avaliacaoController.getAvaliacoes);
router.post("/", avaliacaoController.criarAvaliacao);
router.put("/:id", avaliacaoController.atualizarAvaliacao);
router.delete("/:id", avaliacaoController.deletarAvaliacao);

module.exports = router;
