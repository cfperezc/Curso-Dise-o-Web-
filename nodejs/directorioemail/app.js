///api key 943fda8369ece74f81e09669401d4dad-us17

///id audiencia 16d649fec0

const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
//const { stringify } = require('querystring');
const app = express();
const port = process.env.PORT;    ///se declara de esta forma para que heroku lo pueda poner en un enlace 

app.use(bodyParser.urlencoded({extended:true})); 
app.use(express.static("public"));            //// se usa este metodo static pues permite cargar los archivos estaticos como estilos css e imagenes 


///cargado de la pagina 
app.get("/",function(req,res){

    res.sendFile(__dirname + "/registro.html");               
    
})

app.post("/",function(req,res){

    const nombre=req.body.nombre;               
    const apellido=req.body.apellido;
    const correo=req.body.email;
    ///se escribe una variable JSON pues la api mailchimp recibe este en la version raw
    const data={
        members:[
            {
                email_address: correo,
                status:"subscribed",
                merge_fields: {
                    FNAME: nombre,
                    LNAME: apellido
                }
            }
        ]
    };
    ///se convierte el archivo JSON en su version raw o compacta 
    const jsonData=JSON.stringify(data);
    ///se establecen los datos de la api mailchimp  donde al final se agrega la id de audiencia obtenida de la pagina y en auth la apikey 
    const url = "https://us17.api.mailchimp.com/3.0/lists/16d649fec0";
    const options ={
        method:"POST",
        auth:"user:943fda8369ece74f81e09669401d4dad-us17"
    };
    /// se hace el llamado de las paginas para registro exitoso o fallo de acuerdo al status 
  const request=  https.request(url, options, function(response){
            
            if(response.statusCode===200){

                res.sendFile(__dirname + "/exito.html");
            }else{
                res.sendFile(__dirname + "/fallo.html");
            }

            
            response.on("data",function(data){
            console.log(JSON.parse(data));
        });
    });
    ///como se esta usando el metodo https para enviar datos se usa la los metodos write y end ademas se usa la palabra request para no confundir con la req del post 
    request.write(jsonData);
    request.end();
});

///como se crea un boton en la pagina de fallo para reiniciar el registro se crea la ruta 
app.post("/fallo",function(req,res){
        res.redirect("/");
});


app.listen(port || 3000,function(){
    console.log("Servidor iniciado en el puerto 3000");
});