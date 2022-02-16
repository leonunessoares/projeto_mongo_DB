const express  = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

//DB
const db = require('./db/conexao');


//Template engine
app.engine('handlebars', exphbs.engine());
app.set('view engine','handlebars');
app.use(express.static ('public'));
app.use (bodyParser.urlencoded({extended: true }));

//Importar Rotas
const notasRoutes = require ('./routes/notas');
const minhasnotasRoutes = require ('./routes/minhasnotas');

//rotas
app.get('/',function(req,res){
    res.render('home');
});


app.listen(port, () => {
    //console.log('projeto ok');
})

db.initdb((err,db) => {
    if (err){
        console.log (err);
    }else{
        console.log ('conectou');
    }
})

app.use ('/notas', notasRoutes,minhasnotasRoutes);


