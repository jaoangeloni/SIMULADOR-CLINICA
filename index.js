const express = require('express');
const bodyParser = require('body-parser');
const Paciente = require('./src/models/paciente');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
PORT = process.env.PORT || 3000;




   
app.post("/paciente/registro", function(req, res) {
    if (!req.body.nome || !req.body.email || !req.body.senha) {
        res.status(400).send({message: "Todos os campos são obrigatórios"});
        return;
    }

    var newPaciente = Paciente.build({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha
    });

    newPaciente.save()
    .then(function(data) {
        res.send(data); 
    })
    .catch(function(err) {
        console.log(err);
        res.status(500).send({message: "Ocorreu um erro ao criar o paciente."});
    });
})


.delete("/paciente/:id/deletar", function(req, res){
    Paciente.destroy({where: {'id': req.params.id}}).then(function(){
        res.send("Conta deletada com sucesso!")
    }).catch(function(erro){
        res.send("Conta nao existe!")
    })
});



app.listen(PORT, () => {
    console.log("Rodando na porta " + PORT);
})