const adicionarClienteAoServidor = require('./componentes/adicionar.js');
const realizarConsultaAoServidor = require('./componentes/consulta.js');
const removerClienteDoServidor = require('./componentes/remover.js');
const { json } = require('express/lib/response');
const req = require('express/lib/request');
const bodyParser = require('body-parser')
const express = require('express');
const cors = require("cors");

const fs = require('fs');
const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json())

app.get("/consultar", realizarConsultaAoServidor);
app.post("/adicionar", adicionarClienteAoServidor);
app.delete("/remover/:id", removerClienteDoServidor);

app.listen(port, () => {
    console.log(`Servidor funcionando na porta ${port}!`);
});