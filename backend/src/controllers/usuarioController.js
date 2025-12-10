const db = require("../config/database");

exports.getUsuarios = (req, res) => {
  res.json(db.usuarios);
};

exports.criarUsuario = (req, res) => {
  const usuario = req.body;
  usuario.id = db.usuarios.length + 1;
  db.usuarios.push(usuario);
  res.status(201).json(usuario);
};

exports.login = (req, res) => {
  const { email, senha } = req.body;
  const user = db.usuarios.find((u) => u.email === email && u.senha === senha);
  if (user) {
    res.json({ message: "Login ok", user });
  } else {
    res.status(401).json({ message: "Credenciais inválidas" });
  }
};
