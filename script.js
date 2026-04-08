// CLIENTES
let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

function adicionarCliente() {
  let nome = document.getElementById("nome").value;
  let email = document.getElementById("email").value;

  if (nome === "" || email === "") {
    alert("Preencha todos os campos!");
    return;
  }

  let cliente = { nome, email };
  clientes.push(cliente);

  localStorage.setItem("clientes", JSON.stringify(clientes));

  atualizarLista();

  // limpar campos
  document.getElementById("nome").value = "";
  document.getElementById("email").value = "";
}

function atualizarLista() {
  let lista = document.getElementById("listaClientes");
  lista.innerHTML = "";

  clientes.forEach((c) => {
    let item = document.createElement("li");
    item.textContent = c.nome + " - " + c.email;
    lista.appendChild(item);
  });
}


// VENDAS
let vendas = JSON.parse(localStorage.getItem("vendas")) || [];

function adicionarVenda() {
  let nome = document.getElementById("nomeVenda").value;
  let valor = document.getElementById("valorVenda").value;
  let status = document.getElementById("statusVenda").value;

  if (nome === "" || valor === "") {
    alert("Preencha todos os campos!");
    return;
  }

  let venda = { nome, valor, status };
  vendas.push(venda);

  localStorage.setItem("vendas", JSON.stringify(vendas));

  atualizarVendas();

  // automação
  if (status === "Fechada") {
    alert("Venda fechada com sucesso! 🎉");
  }

  // limpar campos
  document.getElementById("nomeVenda").value = "";
  document.getElementById("valorVenda").value = "";
}


// ATUALIZAR VENDAS + TOTAL
function atualizarVendas() {
  let lista = document.getElementById("listaVendas");
  lista.innerHTML = "";

  let total = 0;

  vendas.forEach((v, index) => {
    let item = document.createElement("li");

    item.innerHTML = `
      ${v.nome} - R$ ${v.valor} - ${v.status}
      <button onclick="editarVenda(${index})">Editar</button>
      <button onclick="deletarVenda(${index})">Excluir</button>
    `;

    lista.appendChild(item);

    if (v.status === "Fechada") {
      total += Number(v.valor);
    }
  });

  document.getElementById("totalVendas").textContent = total;
}


// DELETAR VENDA
function deletarVenda(index) {
  vendas.splice(index, 1);

  localStorage.setItem("vendas", JSON.stringify(vendas));

  atualizarVendas();
}


// EDITAR VENDA
function editarVenda(index) {
  let novoNome = prompt("Novo nome:", vendas[index].nome);
  let novoValor = prompt("Novo valor:", vendas[index].valor);
  let novoStatus = prompt("Novo status (Aberta/Fechada):", vendas[index].status);

  if (novoNome && novoValor && novoStatus) {
    vendas[index] = {
      nome: novoNome,
      valor: novoValor,
      status: novoStatus
    };

    localStorage.setItem("vendas", JSON.stringify(vendas));
    atualizarVendas();
  }
}


// INICIALIZAÇÃO
atualizarLista();
atualizarVendas();

function buscarCliente() {
  let termo = document.getElementById("busca").value.toLowerCase();

  let lista = document.getElementById("listaClientes");
  lista.innerHTML = "";

  clientes
    .filter(c => c.nome.toLowerCase().includes(termo))
    .forEach(c => {
      let item = document.createElement("li");
      item.textContent = c.nome + " - " + c.email;
      lista.appendChild(item);
    });
}