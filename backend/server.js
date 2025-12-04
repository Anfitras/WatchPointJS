const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let usuarios = [];
let obras = [];
let avaliacoes = [];

app.get("/usuarios", (req, res) => {
  res.json(usuarios);
});

app.post("/usuarios", (req, res) => {
  const usuario = req.body;
  usuario.id = usuarios.length + 1;
  usuarios.push(usuario);
  res.status(201).json(usuario);
});

app.post("/login", (req, res) => {
  const { email, senha } = req.body;
  const user = usuarios.find((u) => u.email === email && u.senha === senha);
  if (user) {
    res.json({ message: "Login ok", user });
  } else {
    res.status(401).json({ message: "Credenciais inválidas" });
  }
});

app.get("/obras", (req, res) => {
  res.json(obras);
});

app.post("/obras", (req, res) => {
  const obra = req.body;
  obra.id = obras.length + 1;
  obras.push(obra);
  res.status(201).json(obra);
});

app.put("/obras/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < obras.length) {
    obras[index] = req.body;
    res.json(obras[index]);
  } else {
    res.status(404).json({ message: "Obra não encontrada" });
  }
});

app.delete("/obras/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < obras.length) {
    obras.splice(index, 1);
    res.json({ message: "Obra removida" });
  } else {
    res.status(404).json({ message: "Obra não encontrada" });
  }
});

app.get("/avaliacoes", (req, res) => {
  res.json(avaliacoes);
});

app.post("/avaliacoes", (req, res) => {
  const avaliacao = req.body;
  const usuarioExiste = usuarios.find(
    (u) => u.id == avaliacao.usuarioId || u.email == avaliacao.usuarioEmail
  );

  if (!usuarioExiste) {
    return res
      .status(400)
      .json({ message: "Usuário não encontrado (Chave Estrangeira)" });
  }

  avaliacao.id = avaliacoes.length + 1;
  avaliacoes.push(avaliacao);
  res.status(201).json(avaliacao);
});

app.put("/avaliacoes/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < avaliacoes.length) {
    const avaliacaoAntiga = avaliacoes[index];
    avaliacoes[index] = { ...avaliacaoAntiga, ...req.body };
    res.json(avaliacoes[index]);
  } else {
    res.status(404).json({ message: "Avaliação não encontrada" });
  }
});

app.delete("/avaliacoes/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < avaliacoes.length) {
    avaliacoes.splice(index, 1);
    res.json({ message: "Avaliação removida" });
  } else {
    res.status(404).json({ message: "Avaliação não encontrada" });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
