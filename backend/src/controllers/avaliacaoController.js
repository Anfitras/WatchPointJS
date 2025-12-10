const db = require("../config/database");

exports.getAvaliacoes = (req, res) => {
  res.json(db.avaliacoes);
};

exports.criarAvaliacao = (req, res) => {
  const avaliacao = req.body;
  const usuarioExiste = db.usuarios.find(
    (u) => u.id == avaliacao.usuarioId || u.email == avaliacao.usuarioEmail
  );

  if (!usuarioExiste) {
    return res
      .status(400)
      .json({ message: "Usuário não encontrado (Chave Estrangeira)" });
  }

  avaliacao.id = db.avaliacoes.length + 1;
  db.avaliacoes.push(avaliacao);
  res.status(201).json(avaliacao);
};

exports.atualizarAvaliacao = (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < db.avaliacoes.length) {
    const avaliacaoAntiga = db.avaliacoes[index];
    db.avaliacoes[index] = { ...avaliacaoAntiga, ...req.body };
    res.json(db.avaliacoes[index]);
  } else {
    res.status(404).json({ message: "Avaliação não encontrada" });
  }
};

exports.deletarAvaliacao = (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < db.avaliacoes.length) {
    db.avaliacoes.splice(index, 1);
    res.json({ message: "Avaliação removida" });
  } else {
    res.status(404).json({ message: "Avaliação não encontrada" });
  }
};
