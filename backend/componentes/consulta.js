const fs = require('fs');

const data = fs.readFileSync('database.json');
const clientes = JSON.parse(data);

function realizarConsultaAoServidor(req, res) {
    let pesquisaPorID;
    let pesquisaPorName;
    let pesquisaPorEmail;

    if (req.query.pesquisaID) {
        pesquisaPorID = clientes.filter((item) => item.id === parseInt(req.query.pesquisaID, 10));
    } else {
        pesquisaPorID = clientes;
    }

    if (req.query.pesquisaNome) {
       pesquisaPorName = pesquisaPorID.filter((item) => item.nome.toLowerCase().includes(req.query.pesquisaNome.toLowerCase()));
    } else {
       pesquisaPorName = pesquisaPorID;
    }
    
    if (req.query.pesquisaEmail) {
        pesquisaPorEmail = pesquisaPorName.filter((item) => item.email.toLowerCase().includes(req.query.pesquisaEmail.toLowerCase()));
    } else {
        pesquisaPorEmail = pesquisaPorName;
    } 
      res.json(pesquisaPorEmail); 		
}

module.exports = realizarConsultaAoServidor;