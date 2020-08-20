const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true})); 

app.get("/", function(req, res){

    res.sendFile(__dirname+"/index.html");
    
});

app.post("/",function(req,res){


    const ciudad=req.body.ciudad;
    const apikey="2a38773c1cdb61184986329145faf8ac";
    const unidades="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ciudad+"&appid="+apikey+"&units="+unidades;
    https.get(url, (response) => {
    
        console.log(response.statusCode)
        response.on("data",function(data){
        const datosclima=  JSON.parse(data);
        const temperatura=datosclima.main.temp;
        const descripcion=datosclima.weather[0].description;  /// en este caso weather era un arreglo 
        const icon=datosclima.weather[0].icon;
        const urlicon="http://openweathermap.org/img/wn/"+icon+"@2x.png";
        res.write("<p>la descripcion es"+descripcion+"</p>");
        res.write("<h1>La temperatura en "+ ciudad +" es :"+temperatura+" grados celsius</h1>");
        res.write("<img src="+urlicon+">");
        res.send();
        })
    
    });


});

    

app.listen(port,function(){
    console.log("Servidor iniciado en el puerto 3000");
});