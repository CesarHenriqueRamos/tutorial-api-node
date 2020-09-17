const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req,res)=>{
    return res.json({'Titulo':'Como Criar Uma API?'});
})

app.listen(8080, ()=>{
    console.log('Servidor Rodando')
})