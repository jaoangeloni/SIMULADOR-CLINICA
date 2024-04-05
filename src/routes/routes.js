app.route('/paciente')
    .post('/registro/paciente', function(req, res){
    Paciente.create({
        nome: req.body.nome,
        email: req.body.email, 
        senha: req.body.senha
    }).then(function(){
        
        res.redirect('/')
    }).catch(function(erro){
        res.send("Houve um erro " + erro)
    })
}) 
.delete("/paciente/:id/deletar", function(req, res){
    Paciente.destroy({where: {'id': req.params.id}}).then(function(){
        res.send("Conta deletada com sucesso!")
    }).catch(function(erro){
        res.send("Conta nao existe!")
    })
});
