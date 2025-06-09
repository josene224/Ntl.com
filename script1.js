document.getElementById('cyberForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const form = event.target;

  fetch(form.action, {
    method: 'POST',
    body: new FormData(form)
  }).then(response => {
    if (response.ok) {
      form.style.display = 'none';
      document.getElementById('mensagemInicial').style.display = 'none';
      document.getElementById('mensagemConfirmacao').style.display = 'block';
    } else {
      alert('Erro ao enviar. Tente novamente.');
    }
  });
});

function voltarAoFormulario() {
  document.getElementById('cyberForm').style.display = 'block';
  document.getElementById('mensagemInicial').style.display = 'block';
  document.getElementById('mensagemConfirmacao').style.display = 'none';
}
function mostrarConfirmacao() {
  document.getElementById("cyberForm").style.display = "none";
  document.getElementById("mensagemConfirmacao").style.display = "block";
}

function voltarAoFormulario() {
  document.getElementById("mensagemConfirmacao").style.display = "none";
  document.getElementById("cyberForm").style.display = "block";
}