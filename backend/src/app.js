const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const usuarioRoutes = require("./routes/usuarioRoutes");
const obraRoutes = require("./routes/obraRoutes");
const avaliacaoRoutes = require("./routes/avaliacaoRoutes");

app.use("/usuarios", usuarioRoutes);
app.use("/obras", obraRoutes);
app.use("/avaliacoes", avaliacaoRoutes);

module.exports = app;
