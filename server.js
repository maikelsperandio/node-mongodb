const express = require("express");
const bodyParser = require('body-parser');
global.db = require('./mongodb');

const app = express();

app.use(bodyParser.json());


app.get("/", (req, res) => {
    res.json("{message:chegou aqui}");
});

app.post("/registro", (req, res) => {
    let reg = req.body;

    global.db.insert(reg, (err, result) => {
        if(err){
            res.status(500).json(new ModelResponse(500, 'Ocorreu um erro no servidor: ' + err.errmsg));
        } else{
            res.status(201).send(new ModelResponse(201, 'Registro salvo com sucesso', result.insertedId));
        }
    });
});

app.listen(3000, () => {
    console.log("Servidor iniciado.");
});

class ModelResponse {
    constructor(status, message, protocolo){
        this.status = status;
        this.message = message;
        this.protocol = protocolo;
    }
}