function validarEmail(email) {
  var regex = /\S+@\S+\.\S+/;
  return regex.test(email);
}

function validarFormularioCadastro(ids) {
  var email = document.getElementById(ids.email).value.trim();
  var senha = document.getElementById(ids.senha).value;
  var confirmarSenha = document.getElementById(ids.confirmar).value;
  var nickname = document.getElementById("nickname")
    ? document.getElementById("nickname").value.trim()
    : "";

  if (email === "" || !validarEmail(email)) {
    alert("Por favor, insira um e-mail válido.");
    return false;
  }
  if (nickname === "" || nickname.length < 3) {
    alert("Por favor, insira um nickname com pelo menos 3 caracteres.");
    return false;
  }
  if (senha === "" || senha.length < 6 || senha.length > 8) {
    alert("Senha inválida. A senha deve conter entre 6 e 8 caracteres.");
    return false;
  }
  if (confirmarSenha === "" || confirmarSenha !== senha) {
    alert("Confirmação Inválida! As senhas não correspondem.");
    return false;
  }
  return true;
}

function processarCadastro(event) {
  event.preventDefault();
  var idsCadastro = { email: "email", senha: "senha", confirmar: "confirmar" };
  if (!validarFormularioCadastro(idsCadastro)) return;

  var nickname = document.getElementById("nickname").value.trim();
  var email = document.getElementById(idsCadastro.email).value.trim();
  var senha = document.getElementById(idsCadastro.senha).value;

  var novoUsuario = {
    nickname: nickname,
    email: email,
    senha: senha,
  };

  fetch("http://localhost:3000/usuarios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(novoUsuario),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erro no cadastro");
      }
    })
    .then((data) => {
      alert("Usuário cadastrado com sucesso!");
      event.target.reset();
    })
    .catch((erro) => {
      alert("Erro ao cadastrar. Verifique se o e-mail já está em uso.");
    });
}

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("formulario");
  if (form) form.addEventListener("submit", processarCadastro);
});
