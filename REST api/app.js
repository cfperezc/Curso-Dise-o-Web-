const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose=require("mongoose");

const app = express();
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost:27017/wikiDB', {useNewUrlParser: true,useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



const articuloSchema = {

    titulo: {
        type:String,
        required:true
    },
    contenido:String
  
  };
  
const Articulo = mongoose.model("Articulo",articuloSchema);

app.route("/articulos")

.get(function(req,res){
    Articulo.find({},function(err,resultado){

        if(!err){
            res.send(resultado);
        }else{
            res.send(err);
        }
    });
    })

.post(function(req,res){

        const articulo = new Articulo({                              
            titulo: req.body.titulo,           
            contenido: req.body.contenido
        });

        articulo.save(function(err){

        if(!err){
            res.send("se añadio con exito");
        }else{
            res.send(err);
        }

        });
    })

.delete(function(req,res){

    Articulo.deleteMany({},function(err,estado){
        if(!err){
            res.send("se borro todo con exito");
        }else{
            res.send(err);
        }
    });
});


///nueva ruta especifia

app.route("/articulos/:tituloArticulo")

.get(function(req,res){

        Articulo.findOne({titulo: req.params.tituloArticulo},function(err,articuloEncontrado){
                if(articuloEncontrado){
                    res.send(articuloEncontrado);
                }else{
                    res.send("no se encontro ese articulo");
                }
        });
})
.put(function(req,res){

    Articulo.update({titulo: req.params.tituloArticulo},{titulo:req.body.titulo,contenido:req.body.contenido},{overwrite:true},function(err){
        if(!err){
            res.send("se actualizo con exito");
        }
    });

})
.patch(function(req,res){
    Articulo.update({titulo: req.params.tituloArticulo},{$set:req.body},function(err){
        if(!err){
            res.send("se actualizo con exito el campo deseado");
        }
    });
})

.delete(function(req,res){

    Articulo.deleteOne({titulo:req.params.tituloArticulo},function(err,estado){
        if(!err){
            res.send("se borro en articulo específico con exito");
        }else{
            res.send(err);
        }
    });
});


app.listen(3000, function() {
    console.log("Server started on port 3000");
  });
  