var usuariosCache = [];
var obrasCache = [];

function preencherSelectUsuarios() {
  fetch("http://localhost:3000/usuarios")
    .then((response) => response.json())
    .then((usuarios) => {
      usuariosCache = usuarios;
      var sel = document.getElementById("selectUsuario");
      if (!sel) return;
      sel.innerHTML = "";

      if (!usuarios || usuarios.length === 0) {
        var opt0 = document.createElement("option");
        opt0.value = "";
        opt0.textContent = "Nenhum usuário cadastrado";
        sel.appendChild(opt0);
        return;
      }

      var optEmpty = document.createElement("option");
      optEmpty.value = "";
      optEmpty.textContent = "-- Escolha um usuário --";
      sel.appendChild(optEmpty);

      for (var i = 0; i < usuarios.length; i++) {
        var u = usuarios[i];
        var opt = document.createElement("option");
        opt.value = u.id;
        opt.textContent =
          (u.nickname || u.email || "Usuário") + " (" + (u.email || "") + ")";
        sel.appendChild(opt);
      }
    })
    .catch((erro) => console.error("Erro ao carregar usuários:", erro));
}

function preencherSelectObras() {
  fetch("http://localhost:3000/obras")
    .then((response) => response.json())
    .then((obras) => {
      obrasCache = obras;
      var sel = document.getElementById("selectObra");
      if (!sel) return;
      sel.innerHTML = "";

      if (!obras || obras.length === 0) {
        var opt0 = document.createElement("option");
        opt0.value = "";
        opt0.textContent = "Nenhuma obra cadastrada";
        sel.appendChild(opt0);
        return;
      }

      for (var j = 0; j < obras.length; j++) {
        var o = obras[j];
        var opt = document.createElement("option");
        opt.value = o.id;
        opt.textContent = o.nome + " (" + (o.tipo || "") + ")";
        sel.appendChild(opt);
      }
    })
    .catch((erro) => console.error("Erro ao carregar obras:", erro));
}

function tratarEnvioAvaliacao(evt) {
  if (evt && evt.preventDefault) evt.preventDefault();

  var usuarioId = parseInt(document.getElementById("selectUsuario").value, 10);
  if (!usuarioId) {
    alert("Selecione um usuário válido.");
    return;
  }

  var obraId = parseInt(document.getElementById("selectObra").value, 10);
  if (!obraId) {
    alert("Selecione uma obra válida.");
    return;
  }

  var notaEl = document.getElementById("nota");
  var nota = notaEl ? notaEl.value : "";
  if (!nota) {
    alert("Informe uma nota entre 1 e 10.");
    return;
  }

  var novaAvaliacao = {
    usuarioId: usuarioId,
    obraId: obraId,
    nota: nota,
  };

  fetch("http://localhost:3000/avaliacoes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(novaAvaliacao),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Avaliação cadastrada com sucesso!");
      var form = document.getElementById("formAvaliacao");
      if (form && form.reset) form.reset();
    })
    .catch((erro) => alert("Erro ao salvar avaliação no servidor."));
}

function initCadastroAvaliacao() {
  var form = document.getElementById("formAvaliacao");
  if (form) form.addEventListener("submit", tratarEnvioAvaliacao);
  preencherSelectUsuarios();
  preencherSelectObras();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCadastroAvaliacao);
} else {
  initCadastroAvaliacao();
}
