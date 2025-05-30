document.getElementById("registroForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const tipo = document.getElementById("tipo").value;
  const valor = parseFloat(document.getElementById("valor").value);
  const categoria = document.getElementById("categoria").value;
  const descricao = document.getElementById("descricao").value;
  const inventario = document.getElementById("inventario").checked;

  console.log("Tipo:", tipo);
  console.log("Valor:", valor);
  console.log("Categoria:", categoria);
  console.log("Descrição:", descricao);
  console.log("Adicionar ao inventário:", inventario);

  alert("Registro salvo com sucesso!");
});