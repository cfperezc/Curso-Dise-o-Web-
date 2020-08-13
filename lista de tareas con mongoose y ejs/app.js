const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const lodash=require("lodash");
const mongoose = require('mongoose');
const port = 3000;
app.use(express.static("public"));   ///necesaria para poder cargar contenido estatico como estilos 
app.set('view engine', 'ejs');   ////linea necesaria para ejs funcione 
mongoose.connect('mongodb://localhost:27017/tareasDB', {useNewUrlParser: true,useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended:true})); 




const valores = new mongoose.Schema({

    name: {
        type:String,
        required:true
    }
    
});
const Valor = mongoose.model("Valor",valores);   ///nueva coleccion con el nombre de valors , aunque se ponga valor
///creando items de inicio o por defecto 

const tarea1= new Valor({
    name:"comer"
});

const tarea2= new Valor({
    name:"dormir"
});
const tarea3= new Valor({
    name:"hacer ejercicio"
});

const tareasDefautl =[tarea1,tarea2,tarea3];


///se crea un nuevo esquema para las diferentes listas , incluyendo el esquema de los valores o tareas 
const listas = new mongoose.Schema({

    name:String,
    tareas:[valores]
    
});
const Lista = mongoose.model("Lista",listas);





app.get("/",function(req,res){

    Valor.find({},function(err,itemsEncontrados){

        if(itemsEncontrados.length===0){     ////condicion para que no se llene cada vez que se corre el programa 
            Valor.insertMany(tareasDefautl,function(error){

                if(error){
                    console.log(err);
                }else{
                    console.log("se ingresaron las tareas por defecto ");
                }
            
            });
            res.redirect("/");  /// se redirecciona para que carguen los items recien subidos 
        }else{    /// en caso de ya tener valores solo renderiza el archivo 

            if(err){
                console.log(err);
           }else{
                   
               res.render("list",{titulo: "Hoy", nuevositems:itemsEncontrados});    ///se le pasan los items generados en la bd. para ser renderizados
           }
        }

    });
         
});

app.post("/",function(req,res){      ///se crea un post ya que se obtendra valores de la pagina list.ejs

    
    const nuevaEntrada =req.body.item;          /// se obtiene el valor que proviene del input con el nombre llamado item
    const nombreLista= req.body.lista;       /// se almacena el valor el boton de tipo submit + que agrega tareas 
    
    const tareaNueva= new Valor({
        name:nuevaEntrada
    });
    
    if(nombreLista=== "Hoy"){         /// se verifica la peticion de post hecha por el usuario viene con el titulo de la ruta base 
        tareaNueva.save();
        res.redirect("/");
    }else{                                              ///si no lo es busca el nombre de la lista en la coleccion de listas , para asi crear un nuevo documento en la coleccion 

        Lista.findOne({name:nombreLista},function(err,listaEncontrada){
            listaEncontrada.tareas.push(tareaNueva);
            listaEncontrada.save();
            res.redirect("/" + nombreLista);    /// como es una ruta dinamica se concatena con el nombre de la lista que se obtiene del boton +
        });
      
    }

});
///ruta para borrado 
app.post("/delete",function(req,res){

        const tareaSeleccionada= req.body.seleccion;   ///se obtiene el id del item seleccionado en la checkbox
        const listaNombre =  req.body.listaNombre;     ///se obtiene con input de tipo hidden el valor de la lista en la que se selecciono el checkbox

        if(listaNombre==="Hoy"){
            Valor.findOneAndDelete({_id:tareaSeleccionada},function(err,doc){   ///se usa este metodo que busca el elemento y luego lo elimina

                if(err){
                        console.log(err);
                }else{
                    console.log("se borro con exito la tarea seleccionada");
                    res.redirect("/");
                }
            });
        }else{

            Lista.findOneAndDelete({name:listaNombre},{$pull:{tareas:{_id:tareaSeleccionada}}},function(err,doc){    ///como era un arreglo en la coleccion toco usar el metodo de pull para navegar en el JSON
                
                if(!err){
                    res.redirect("/" + listaNombre);    /// como es una ruta dinamica se concatena con el nombre de la lista que se obtiene del input hidden
                }
                
            });
        }
     

});


//creando nueva seccion para tareas de trabajo

app.get("/:postName",function(require,response){

    const nombreLista= lodash.camelCase(require.params.postName);  ///para que el usuario no entre con mayusculas o minusculas a la ruta se usa lodash
    Lista.findOne({name:nombreLista}, function(err, encontrado){
        if(!err){
            if(!encontrado){   /// si no encontro la lista la crea , con las tareas por default
                const nuevaLista= new Lista({
                    name:nombreLista,
                    tareas: tareasDefautl
                });
                nuevaLista.save();
                response.redirect("/" + nombreLista);    /// redirecciona a la nueva lista 
            }else{
                response.render("list",{titulo:encontrado.name, nuevositems:encontrado.tareas});  //si ya esta la carga con el nombre y los valores que debe tener 
            }
        }
    });
});


app.listen(port,function(){
    console.log("Servidor iniciado en el puerto 3000");
});