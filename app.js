require('dotenv').config();
const database = require('./database/database');

PORT = process.env.PORT || 3000;

const express = require('express');

const app = express();

app.use(express.json());

async () => {
    await database.sync();
}

database
    .autenthicate()
    .then(() =>{
        console.log("Conexão estabelecida com banco de dados");
    })
    .catch(err => {
        console.log('Erro ao conectar com banco: ' + err);
    });


app.listen(PORT, () => {
    console.log("Rodando na porta " + PORT);
})