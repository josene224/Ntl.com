// Cadastro
document.getElementById('signupForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('signupEmail').value;
  const senha = document.getElementById('signupSenha').value;

  localStorage.setItem('usuarioEmail', email);
  localStorage.setItem('usuarioSenha', senha);

  document.getElementById('signupMensagem').innerText = 'Conta criada com sucesso!';
});

// Login
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const senha = document.getElementById('loginSenha').value;

  const emailSalvo = localStorage.getItem('usuarioEmail');
  const senhaSalva = localStorage.getItem('usuarioSenha');

  if (email === emailSalvo && senha === senhaSalva) {
    document.getElementById('loginMensagem').innerText = 'Login bem-sucedido!';
    // redirecionar para página protegida
    setTimeout(() => window.location.href = "index.html", 1000);
  } else {
    document.getElementById('loginMensagem').innerText = 'Email ou senha inválidos.';
  }
});