const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));       ///con body parser podemos incorporar informacion que proviene de un archivo html 

app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
  });

app.post("/",function(req,res){

    //console.log(req.body.num1);        ///body parser nos permite pasar la peticion o request html obtenida tambien podemos acceder a valores de names
    
    var numero1=Number(req.body.num1);
    var numero2=Number(req.body.num2);    ///como son variables de input text toca reasiganrlas 
    var resultado= numero1+numero2;

    res.send("El resultado es:"+resultado);
});

///calculadora de bmi
app.get("/bmicalculator", function(req, res){     /// se genera una nueva ruta donde se manda el nuevo archivo html
    res.sendFile(__dirname+"/BMI.html");
  });

app.post("/bmicalculator",function(req,res){

    var peso=parseFloat(req.body.peso);             ///parseFloat se usa para cambiar el valor de texto a numero flotante 
    var altura=parseFloat(req.body.altura);     
    var resultado2= peso/Math.pow(altura,2);

    res.send("Su BMI es:"+resultado2);
});



app.listen(port,function(){
    console.log("Servidor iniciado en el puerto 3000");
});