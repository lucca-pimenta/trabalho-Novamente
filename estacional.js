// Objetos para armazenar as informações de cada loja
const lojas = [
    { nome: 'A', descontoTag: 'desconto1' },
    { nome: 'B', descontoTag: 'desconto2' },
    { nome: 'C', descontoTag: 'desconto3' },
    { nome: 'D', descontoTag: 'desconto4' }
  ];
  
  function Logar() {
    let Login = formlog.User.value;
    let Senha = formlog.Senha.value;
     
    if (Login == "Adm" && Senha == "admin123") {
      document.getElementById("Tarifa").value = prompt("Informe o valor da tarifa: ");
    }
    
    if (Login == "funcio" && Senha == "funcionario123") {
      alert("Sucesso, logado como funcio");
      document.getElementById("Tarifa").value = 14;
    }
  }
  
  function enviar() {
    let Lojas = Info.Lojas.value;
    let PlacaCarro = Info.PlacaCarro.value;
    let DataEntrada = Info.Data.value;
    let HoraEntrada = parseFloat(Info.Hora.value);
    let DataSai = Info.DataS.value;
    let HoraSai = parseFloat(Info.HoraS.value);
    let tarifa = parseFloat(document.getElementById("Tarifa").value);
    let ValorPago = tarifa + ((HoraSai - HoraEntrada) * (tarifa / 2));
    let desconto = ValorPago;
    
    // Busca a loja selecionada
    let loja = lojas.find(l => l.nome === Lojas);
  
    if (loja) {
      fetch('convenio.xml')  // Caminho para o arquivo XML
        .then(response => response.text())
        .then(xmlString => {
          let parser = new DOMParser();
          let xmlDoc = parser.parseFromString(xmlString, "application/xml");
  
          // Recupera o desconto para a loja
          let descontoXML = xmlDoc.getElementsByTagName(loja.descontoTag)[0];
          if (descontoXML) {
            desconto = ValorPago - parseFloat(descontoXML.textContent);
          }
  
          // Preenche a tabela
          preencherTabela(PlacaCarro, DataEntrada, HoraEntrada, DataSai, HoraSai, desconto);
        });
    } else {
      // Se a loja não for A, B, C ou D, usa o valor normal
      preencherTabela(PlacaCarro, DataEntrada, HoraEntrada, DataSai, HoraSai, ValorPago);
    }
  }
  
  function preencherTabela(PlacaCarro, DataEntrada, HoraEntrada, DataSai, HoraSai, Valor) {
    var table = document.getElementById("Tabelinha");  
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
  
    cell1.innerHTML = PlacaCarro;
    cell2.innerHTML = DataEntrada;
    cell3.innerHTML = HoraEntrada;
    cell4.innerHTML = DataSai;
    cell5.innerHTML = HoraSai;
    cell6.innerHTML = Valor;
  }
  

