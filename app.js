require('dotenv').config();
const session = require('express-session');
const database = require('./database/database');
const checkLogin = require('./src/middlewares/checkLogin')
const path = require('path');

PORT = process.env.PORT || 3000;
const express = require('express');

const app = express();
app.use(express.json());

app.set('views', path.join(__dirname, './frontend/views/'));
app.set('view engine', 'ejs');

app.use(session({
    secret: 'clinica',
    cookie: {
        maxAge: 1200000,
    },
    resave: false,
    saveUninitialized: false
}));

const pacienteRoute = require('./src/routes/pacienteRoute');
const medicoRoute = require('./src/routes/medicoRoute');
const exameRoute = require('./src/routes/exameRoute');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './frontend/public')));

/*
//Sincronizacao do banco de dados
(async () => {
    
    const Paciente = require('./src/models/paciente');
    const Especializacao = require('./src/models/especializacao');
    const Medico = require('./src/models/medico');
    const Exame = require('./src/models/exame');
    const Atestado = require('./src/models/atestado');

    await database.sync();
})() 
*/

database
    .authenticate()
    .then(() =>{
        console.log("Conexão estabelecida com banco de dados");
    })
    .catch(err => {
        console.log('Erro ao conectar com banco: ' + err);
    });

app.use('/pacientes', pacienteRoute);
app.use('/medicos', medicoRoute);
app.use('/exame', exameRoute)
//app.use('/', checkLogin, (req, res, next) => {
  //  res.render('index');
//});

app.listen(PORT, () => {
    console.log("Rodando na porta " + PORT);
})

