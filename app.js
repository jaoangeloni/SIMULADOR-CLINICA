require('dotenv').config();
const database = require('./database/database');

PORT = process.env.PORT || 3000;

const express = require('express');

const app = express();

app.use(express.json());

async () => {
    
    const Paciente = require('./models/paciente');
    const Especializacao = require('./models/especializacao');
    const Medico = require('./models/medico');
    const Exame = require('./models/exame');
    const Atestado = require('./models/atestado');

    await database.sync();
}

database
    .authenticate()
    .then(() =>{
        console.log("Conexão estabelecida com banco de dados");
    })
    .catch(err => {
        console.log('Erro ao conectar com banco: ' + err);
    });


app.listen(PORT, () => {
    console.log("Rodando na porta " + PORT);
})