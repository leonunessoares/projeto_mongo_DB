const Router = require('express').Router;
//DB
const db = require('../db/conexao');
const router = Router();
const { ObjectId } = require ('mongodb');


router.get('/', function(req,res){
    res.render ('notas/criar')
})

router.post('/', function(req,res){
    const data  = req.body;
    const titulo = data.titulo;
    const descricao = data.descricao;

    db.getdb()
        .db()
        .collection("notas")
        .insertOne({titulo: titulo, descricao: descricao});

    res.redirect(301, '/');
    
});

module.exports = router;