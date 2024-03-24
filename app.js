require('dotenv').config();
PORT = process.env.PORT || 3000;

const express = require('express');

const app = express();

app.use(express.json());

app.listen(PORT, () => {
    console.log("Rodando na porta " + PORT);
})