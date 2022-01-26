const fs = require('fs');

function removerClienteDoServidor(req, res) {

    const data = fs.readFileSync('database.json');
    const clientes = JSON.parse(data);
   
    const info = Number(req.params.id);

    clientes.forEach(element => {
      
      if(info === element.id) {
        const filtro = clientes.indexOf(element);
        clientes.splice(filtro, 1);
      }
    });

    res.json(clientes)
    fs.writeFileSync('database.json', JSON.stringify(clientes));
    res.json(info)
}

module.exports = removerClienteDoServidor;