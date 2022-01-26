const fs = require('fs');

const data = fs.readFileSync('database.json');
const clientes = JSON.parse(data);

function adicionarClienteAoServidor(req, res) {

    const acess = req.body;
    console.log(acess);
    clientes.push(acess);

    fs.writeFileSync('database.json', JSON.stringify(clientes));
    res.json(acess)
}

module.exports = adicionarClienteAoServidor;