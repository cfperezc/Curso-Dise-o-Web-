const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/frutasDB', {useNewUrlParser: true,useUnifiedTopology: true}); ///se crea la base de datos en este caso llamada frutasDB

const frutaSchema = new mongoose.Schema({

        name: {
            type: String,
            required: [true, 'No hay nombre de fruta']
        },
        rating: {
            type:Number,
            require:true,
            min:1,
            max:10
        },
        review: {
            type: String,
            required:true
        }

});

const Fruta = mongoose.model("Fruta",frutaSchema); //creando una nueva coleccion llamada Frutas

const guanabana = new Fruta({       ///creando los datos o documentos de la coleccion 

    name: "guanabana",
    rating: 10,
    review: "la mejor"

});
guanabana.save();  ///guardando el documento en la coleccion llamada Fruta

const fruta = new Fruta({      

    name: "manzana",
    rating: 7,
    review: "muy buena"

});




const personaSchema = new mongoose.Schema({

    name: String,
    age: Number,
    frutafavorita: frutaSchema            ///se establece la relacion entre las dos coleeciones 

});

const Persona = mongoose.model("Persona",personaSchema);

const persona= new Persona({

        name:"sara",
        age:18,
        frutafavorita:fruta

});
//persona.save();

///agregando varios elementos a la coleccion de frutas

/*
const kiwi = new Fruta({      

    name: "kiwi",
    rating: 10,
    review: "la mejor fruta"

});


const banano = new Fruta({      

    name: "banano",
    rating: 5,
    review: "sabe bien pero se daña rapido"

});

const naranja = new Fruta({      

    name: "naranja",
    rating: 8,
    review: "muy buen sabor combina con todo"

});
*/

///insertando varios elementos 
/*Fruta.insertMany([kiwi,banano,naranja],function(err){

        if(err){
            console.log(err);
        }else{
            console.log("exitoso");
        }

});  */


///obteniendo informacion 
/*
Fruta.find(function(err,frutas){
        if(err){
            console.log(err)
        }else{
            
            mongoose.connection.close();       ////para cerrar la coneccion sin necesidad de usar control+c
            frutas.forEach(function(fruta){
                console.log(fruta.name);
            });
                
            
        }
});
*/
///actulizar 

Fruta.updateOne({_id:"5f3321951a98fc067c526986"},{name:"banano"},function(err){

    if(err){
        console.log(err);
    }else{
        console.log("se cambio con exito");
    }
});

//borrar muchos repetidos 

Persona.deleteMany({name:"manuel"},function(err){
    if(err){
        console.log(err);
    }else{
        console.log("se borro a manuel con exito");
    }
});


///actualizado de coleccion personas agregando fruta favorita de la coleccion de frutas 
Persona.updateOne({name:"martin"},{frutafavorita:guanabana},function(err){

    if(err){
        console.log(err);
    }else{
        mongoose.connection.close();
        console.log("se le asigno una fruta a  martin");
    }
});




