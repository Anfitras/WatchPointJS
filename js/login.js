function validarEmail(email) {
  var regex = /\S+@\S+\.\S+/;
  return regex.test(email);
}

function validarFormularioLogin(ids) {
  var email = document.getElementById(ids.email).value.trim();
  var senha = document.getElementById(ids.senha).value;

  if (email === "" || !validarEmail(email)) {
    alert("Por favor, insira um e-mail válido.");
    return false;
  }
  if (senha === "" || senha.length < 6 || senha.length > 8) {
    alert("Senha inválida. A senha deve conter entre 6 e 8 caracteres.");
    return false;
  }
  return true;
}

function processarLogin(event) {
  event.preventDefault();
  var idsLogin = { email: "email", senha: "senha" };
  if (!validarFormularioLogin(idsLogin)) return;

  var email = document.getElementById("email").value.trim();
  var senha = document.getElementById("senha").value;

  fetch("http://localhost:3000/usuarios/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email, senha: senha }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Credenciais inválidas");
      }
    })
    .then((data) => {
      alert("Login bem-sucedido!");
      try {
        localStorage.setItem("usuarioLogado", JSON.stringify(data.user));
      } catch (e) {}
      window.location.href = "index.html";
    })
    .catch((erro) => {
      alert("E-mail ou senha incorretos.");
    });
}

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("formulario");
  if (form) form.addEventListener("submit", processarLogin);
});
