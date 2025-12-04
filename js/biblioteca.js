var avaliacoesCache = [];

function montarTabela() {
  fetch("http://localhost:3000/avaliacoes")
    .then((response) => response.json())
    .then((avaliacoes) => {
      avaliacoesCache = avaliacoes;
      renderizarLinhas(avaliacoes);
    })
    .catch((erro) => console.error("Erro ao carregar avaliações", erro));
}

function renderizarLinhas(listaAvaliacoes) {
  var tbody = document.getElementById("tbody-avaliacoes");
  if (!tbody) return;
  tbody.innerHTML = "";

  if (!listaAvaliacoes || listaAvaliacoes.length === 0) {
    var tr0 = document.createElement("tr");
    var td0 = document.createElement("td");
    td0.colSpan = 5;
    td0.textContent =
      "Nenhuma avaliação encontrada. Use a página de teste para adicionar.";
    td0.style.textAlign = "center";
    tr0.appendChild(td0);
    tbody.appendChild(tr0);
    return;
  }

  for (var i = 0; i < listaAvaliacoes.length; i++) {
    var av = listaAvaliacoes[i];
    var tr = document.createElement("tr");

    var tdUsuario = document.createElement("td");
    tdUsuario.textContent = av.usuarioEmail || "Desconhecido";

    var tdObra = document.createElement("td");
    tdObra.textContent = av.obraNome || "Obra Desconhecida";

    var tdPoster = document.createElement("td");
    var img = document.createElement("img");
    img.className = "poster";
    img.alt = av.obraNome || "Poster";
    img.style.maxWidth = "80px";
    img.style.maxHeight = "110px";
    img.src = av.obraPoster || "img-gerais/sem_poster.jpg";
    tdPoster.appendChild(img);

    var tdNota = document.createElement("td");
    tdNota.textContent = av.nota;
    tdNota.style.fontWeight = "bold";

    var tdAcoes = document.createElement("td");

    var btnEditar = document.createElement("button");
    btnEditar.className = "botao-editar";
    btnEditar.type = "button";
    btnEditar.textContent = "Editar Nota";
    btnEditar.dataset.avIndex = i;

    var btnRemoverAvaliacao = document.createElement("button");
    btnRemoverAvaliacao.className = "botao-remover-avaliacao";
    btnRemoverAvaliacao.type = "button";
    btnRemoverAvaliacao.textContent = "Excluir";
    btnRemoverAvaliacao.dataset.avIndex = i;

    tdAcoes.appendChild(btnEditar);
    tdAcoes.appendChild(btnRemoverAvaliacao);

    tr.appendChild(tdUsuario);
    tr.appendChild(tdObra);
    tr.appendChild(tdPoster);
    tr.appendChild(tdNota);
    tr.appendChild(tdAcoes);
    tbody.appendChild(tr);
  }
}

var tbody = document.getElementById("tbody-avaliacoes");
if (tbody) {
  tbody.addEventListener("click", function (e) {
    var target = e.target;

    if (target.classList && target.classList.contains("botao-editar")) {
      var avIndex = target.dataset.avIndex;
      var avObj = avaliacoesCache[avIndex];

      var novaNota = prompt("Editar nota (1-10):", avObj.nota || "");
      if (novaNota === null) return;

      novaNota = parseFloat(novaNota);
      if (isNaN(novaNota) || novaNota < 1 || novaNota > 10) {
        alert("Informe uma nota válida entre 1 e 10.");
        return;
      }

      fetch("http://localhost:3000/avaliacoes/" + avIndex, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nota: novaNota }),
      }).then((r) => {
        if (r.ok) montarTabela();
        else alert("Erro ao editar.");
      });
    }

    if (
      target.classList &&
      target.classList.contains("botao-remover-avaliacao")
    ) {
      var avIndex = target.dataset.avIndex;
      var confirmar = confirm("Tem certeza que deseja excluir esta avaliação?");
      if (!confirmar) return;

      fetch("http://localhost:3000/avaliacoes/" + avIndex, {
        method: "DELETE",
      }).then((r) => {
        if (r.ok) montarTabela();
        else alert("Erro ao excluir.");
      });
    }
  });
}

function aplicarFiltroTabela() {
  var input = document.getElementById("tabela-pesquisa");
  if (!input) return;

  var termo = input.value.toLowerCase();

  var filtrados = avaliacoesCache.filter(function (av) {
    var nomeObra = (av.obraNome || "").toLowerCase();
    var emailUser = (av.usuarioEmail || "").toLowerCase();
    return nomeObra.includes(termo) || emailUser.includes(termo);
  });

  renderizarLinhas(filtrados);
}

var searchInput = document.getElementById("tabela-pesquisa");
if (searchInput) {
  searchInput.addEventListener("input", aplicarFiltroTabela);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", montarTabela);
} else {
  montarTabela();
}
