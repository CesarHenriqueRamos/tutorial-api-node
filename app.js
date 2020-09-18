const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('./models/Artigo');

const Artigo = mongoose.model('artigo');

const app = express();

app.use(express.json());

app.use((req,res,next)=>{
    //para qualque saite pode acessar
    res.header("Access-Control-Allow-Origin","*");
    //para saite exclusivo
    //res.header("Access-Control-Allow-Origin","http://localhost:3000/);
    res.header("Access-Control-Allow-Methods","GET,PUT,POST,DELETE");
    app.use(cors());
    next();
})
mongoose.connect('mongodb://localhost/cesar_api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(()=>{
    console.log('Coneção realiada com sucesso')
}).catch(err=>{
    console.log('Falhou'+err);
});
app.get('/', (req,res)=>{
    Artigo.find({}).then((artigos)=>{
        return res.json(artigos);
    }).catch(err=>{
        console.error(err);
        return res.status(400).json({
            error: true,
            mensage:"Nenhum artigo encontrado"
        })
    })
})
app.get('/artigo/:id', (req,res)=>{
    Artigo.findOne({_id:req.params.id}).then((artigo)=>{
        return res.json(artigo)
    }).catch(err=>{
        return res.status(400).json({
            error: true,
            mensage:"Artigo não encontrado"
        })
    })
})
//POST
app.post('/artigo', (req,res)=>{
    const artigo = Artigo.create(req.body, err =>{
        if(err) return res.status(400).json({
            error: true,
            mensage:'Artigo não foi cadastrado com sucesso'
        })
        return res.status(200).json({
            error: false,
            mensage:'Artigo cadastrado com sucesso'
        })
    })
})
//PUT
app.put('/artigo/:id', (req,res)=>{
    const artigo = Artigo.updateOne({_id:req.params.id}, req.body,(err)=>{
        if(err){
            return res.status(400).json({
                error:true,
                mensage:"Erro ao Atualizar"
            })
        }
            return res.status(200).json({
                error:false,
                mensage:"Atualizado com Sucesso"
            })          
    })
})
//DELETE
app.delete('/artigo/:id', (req,res)=>{
    const artigo = Artigo.deleteOne({_id:req.params.id}, err=>{
        if(err){
            return res.status(400).json({
                error: true,
                mensage:"Erro ao Deletar o Artigo"
            })
        }
        return res.status(200).json({
            error: false,
            mensage:"Artigo Deletado com Sucesso"
        })
    })
})
app.listen(8080, ()=>{
    console.log('Servidor Rodando')
})