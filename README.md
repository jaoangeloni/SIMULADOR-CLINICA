# SIMULADOR-CLINICA
Projeto simples em Node.js que simula agendamento, atendimento e diagnóstico de exames entre pacientes e médicos.

Para testar, modifique as configurações de banco de dados no arquivo **.env** de acordo com sua necessidade e sistema. (Necessário a pré-existência de um banco de dados.)

---

Clone o repositório com o git bash:
```
git clone https://github.com/jaoangeloni/SIMULADOR-CLINICA.git
```

No terminal, instale as dependências na pasta do projeto:
```
npm i
```

No terminal, utilize o seguinte comando para rodar o servidor e buildar o front:
```
npm run dev
```


Para obter as telas do banco de dados execute o comando: 
```
npx sequelize-cli db:migrate
```

Para popular as tabelas após as migrations, digite o comando:
```
npx sequelize-cli db:seed:all
```

