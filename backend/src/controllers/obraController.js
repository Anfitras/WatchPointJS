const db = require("../config/db");

exports.getObras = (req, res) => {
  db.query("SELECT * FROM obras", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const obrasFormatadas = results.map((obra) => ({
      ...obra,
      generos: JSON.parse(obra.generos || "[]"),
    }));
    res.json(obrasFormatadas);
  });
};

exports.criarObra = (req, res) => {
  const { nome, tipo, urlPoster, sinopse, episodios, nota, generos } = req.body;
  const generosString = JSON.stringify(generos);

  const sql =
    "INSERT INTO obras (nome, tipo, urlPoster, sinopse, episodios, nota, generos) VALUES (?, ?, ?, ?, ?, ?, ?)";

  db.query(
    sql,
    [nome, tipo, urlPoster, sinopse, episodios, nota, generosString],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId, ...req.body });
    }
  );
};

exports.atualizarObra = (req, res) => {
  const { id } = req.params;
  const { nome, tipo, urlPoster, sinopse, episodios, nota, generos } = req.body;
  const generosString = JSON.stringify(generos);

  const sql =
    "UPDATE obras SET nome=?, tipo=?, urlPoster=?, sinopse=?, episodios=?, nota=?, generos=? WHERE id=?";

  db.query(
    sql,
    [nome, tipo, urlPoster, sinopse, episodios, nota, generosString, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Obra atualizada com sucesso" });
    }
  );
};

exports.deletarObra = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM obras WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Obra removida" });
  });
};
