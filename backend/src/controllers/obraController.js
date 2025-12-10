const db = require("../config/database");

exports.getObras = (req, res) => {
  res.json(db.obras);
};

exports.criarObra = (req, res) => {
  const obra = req.body;
  obra.id = db.obras.length + 1;
  db.obras.push(obra);
  res.status(201).json(obra);
};

exports.atualizarObra = (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < db.obras.length) {
    db.obras[index] = req.body;
    res.json(db.obras[index]);
  } else {
    res.status(404).json({ message: "Obra não encontrada" });
  }
};

exports.deletarObra = (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < db.obras.length) {
    db.obras.splice(index, 1);
    res.json({ message: "Obra removida" });
  } else {
    res.status(404).json({ message: "Obra não encontrada" });
  }
};
