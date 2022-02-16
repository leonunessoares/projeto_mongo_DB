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

//Salvar as alterações
router.post('/update', function(req,res){
    const data  = req.body;
    const id = new ObjectId(data.id);
    const titulo = data.titulo;
    const descricao = data.descricao;

    db.getdb()
        .db()
        .collection("notas")
        .updateOne({_id:id }, {$set: {titulo: titulo, descricao: descricao}});

    res.redirect(301, '/');
    
});


//Deletar uma nota
router.post('/delete', function(req,res){
    const data  = req.body;
    const id = new ObjectId(data.id);
    
    db.getdb()
        .db()
        .collection("notas")
        .deleteOne({_id: id});

    res.redirect(301, '/');
    
});

//Visualizar uma nota
router.get('/:id', async function(req,res){
    
    const id = new ObjectId(req.params.id);
    
    const notas = await db.getdb().db().collection("notas").findOne({_id: id});

    res.render('notas/detail', {notas});
    
});

//Editar uma nota
router.get('/edit/:id', async function(req,res){
    
    const id = new ObjectId(req.params.id);
    
    const notas = await db.getdb().db().collection("notas").findOne({_id: id});

    res.render('notas/edit', {notas});
    
});

module.exports = router;