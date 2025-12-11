const db = require("../config/db");

exports.getAvaliacoes = (req, res) => {
  const sql = `
    SELECT a.id, a.nota, 
           u.email as usuarioEmail, 
           o.nome as obraNome, o.urlPoster as obraPoster 
    FROM avaliacoes a
    JOIN usuarios u ON a.usuarioId = u.id
    JOIN obras o ON a.obraId = o.id
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.criarAvaliacao = (req, res) => {
  const { usuarioId, obraId, nota } = req.body;

  const sql =
    "INSERT INTO avaliacoes (usuarioId, obraId, nota) VALUES (?, ?, ?)";

  db.query(sql, [usuarioId, obraId, nota], (err, result) => {
    if (err) return res.status(500).json({ error: "Erro ao criar avaliação" });
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

exports.atualizarAvaliacao = (req, res) => {
  const { id } = req.params;
  const { nota } = req.body;

  db.query(
    "UPDATE avaliacoes SET nota = ? WHERE id = ?",
    [nota, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Avaliação atualizada" });
    }
  );
};

exports.deletarAvaliacao = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM avaliacoes WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Avaliação removida" });
  });
};
