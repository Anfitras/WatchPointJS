const db = require("../config/db");

exports.getUsuarios = (req, res) => {
  db.query("SELECT id, nickname, email FROM usuarios", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.criarUsuario = (req, res) => {
  const { nickname, email, senha } = req.body;
  const sql = "INSERT INTO usuarios (nickname, email, senha) VALUES (?, ?, ?)";

  db.query(sql, [nickname, email, senha], (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Erro ao cadastrar: Email pode já existir." });
    res.status(201).json({ id: result.insertId, nickname, email });
  });
};

exports.login = (req, res) => {
  const { email, senha } = req.body;
  const sql = "SELECT * FROM usuarios WHERE email = ? AND senha = ?";

  db.query(sql, [email, senha], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length > 0) {
      res.json({ message: "Login ok", user: results[0] });
    } else {
      res.status(401).json({ message: "Credenciais inválidas" });
    }
  });
};
