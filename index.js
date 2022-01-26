const express = require('express');
const req = require('express/lib/request');
const { json } = require('express/lib/response');
const app = express();
const port = 4000;
const fs = require('fs');

app.use(express.json());

const data = fs.readFileSync('database.json');
const clientes = JSON.parse(data);


app.get("/", (req, res) => {
  
    fs.readFile("frontend/src/index.html", (err, data) => {
        res.setHeader("content-type", "text/html");
        res.send(data);
    });
});	  
 
app.get("/user", (req, res) => {
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
});
	
app.post("/user", (req, res) => {

    const acess = req.body;
    console.log(acess);
    clientes.push(acess);

    fs.writeFileSync('database.json', JSON.stringify(clientes));
    res.json(acess)
});

app.delete("/user/:id", (req, res) => {

    const data = fs.readFileSync('database.json');
    const clientes = JSON.parse(data);
   
    const info = Number(req.params.id);

    clientes.forEach(element => {
      
      if(info === element.id) {
        const a = clientes.indexOf(element);
        clientes.splice(a, 1);
      }
    });

    res.json(clientes)
    fs.writeFileSync('database.json', JSON.stringify(clientes));
    res.json(info)



});


app.listen(port, () => {
    console.log(`Servidor funcionando na porta ${port}!`);
});