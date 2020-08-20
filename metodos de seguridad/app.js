require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const session = require("express-session");
const passport= require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const passportLocalMongoose= require("passport-local-mongoose");
///const bcrypt = require('bcrypt');   ///se quita el bcrypt pues se usaran cookies
const mongoose=require("mongoose");
const { initialize } = require('passport');

///const saltRounds = 10;   //// numero de veces que se pasara la contraseña por una funcion de hash dependiente de bcrypt

///const encrypt = require("mongoose-encryption");      ///se usara ahora un metodo de hash pues es mas seguro que la encriptación
///const md5 = require('md5');     ///se usara bcrypt ya que usa mas rondas de hash 
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(session({                ///1. para cookies luego de hacer el require de los paquetes se establece las opciones de session 
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  }));

app.use(passport.initialize());    ////2. para cookies se inicializa passport y se le establece la session 
app.use(passport.session());

mongoose.connect('mongodb://localhost:27017/userDB', {useNewUrlParser: true,useUnifiedTopology: true});
mongoose.set('useCreateIndex', true); ///se uso por el warnign al usar  paquetes externos 

const userSchema= new mongoose.Schema({
    email:String,
    password:String,
    googleId:String,
    facebookId:String,
    secret:String
});

userSchema.plugin(passportLocalMongoose);      ///3.para cookies , se le agrega al esquema el pluguin de localmongoose 
userSchema.plugin(findOrCreate);      ///se agrega para el metodo de autentificacion con oauth

///const secret= "palabra secreta";  ///es como la llave que contiene nuestro metodo de ncriptacion. 

///userSchema.plugin(encrypt,{secret:process.env.SECRET,encryptedFields:["password"]});   ///segunda forma de seguridad, se le agrega esto para que el esquema tenga una encriptacion en la contraseña

const User = mongoose.model("User",userSchema);   ///creando el modelo del esquema 

passport.use(User.createStrategy());                                ///4. para cookies, configuracion passport-local 3 lineas de codigo con una estrategia para los usuarios 

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
////estrategia de google passport
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL:"https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

///estrategia de facebook passport
passport.use(new FacebookStrategy({
    clientID: process.env.CLIENT_ID_FACE,
    clientSecret: process.env.CLIENT_SECRET_FACE,
    callbackURL: "http://localhost:3000/auth/facebook/secrets"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));


app.get("/",function(req,res){
    res.render("home");
});
////google
app.get("/auth/google",
passport.authenticate("google", { scope: ["profile"] }));    ////se crea la ruta para ingresar con google los datos y se pone a que datoa se quiere en el campo de scopes 


app.get("/auth/google/secrets", 
  passport.authenticate("google", { failureRedirect: "/login" }),     ///se crea la ruta para que se complete la verificacion de datos y se acceda al contenido de la pagina , y  en caso de no ser correctos los datos manda al login 
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("/secrets");
});
////faebook
app.get("/auth/facebook",
passport.authenticate("facebook"));    ////para facebook el scope no fuciona bien 


app.get('/auth/facebook/secrets',                               ///ruta configurada en el developer de facebook
passport.authenticate('facebook', { failureRedirect: '/login' }),   ///verifica que el usuario tenga cuenta en facebook y este autenticado 
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/secrets');     ///si es asi lo redirecciona a la pagina con el contenido de los secretos 
});


///codigo base
app.get("/register",function(req,res){
    res.render("register");
});


app.get("/login",function(req,res){
    res.render("login");
});

app.get("/secrets",function(req,res){ 

    User.find({"secret":{$ne:null}},function(err,data){        ///s verifica que en la bd haya algun usuario con el campo de secrets y asi listarlos en pantalla 
        if(err){
            console.log(err);

        }else{
            if(data){
                res.render("secrets",{usersWithSecrets:data});
            }
        }
    });
    
});

app.get("/logout",function(req,res){
    req.logOut();         ///metodo para loguear 
    res.redirect("/");     
});

app.get("/submit",function(req,res){
    if(req.isAuthenticated()){
        res.render("submit");     /// se comprueba que el usuario este logueado y sea su sesion de lo contrario lo manda a loguearse 
    }else{
        res.redirect("/login");   
    }
});

app.post("/register",function(req,res){

    ////usando coookies

    User.register({username:req.body.username},req.body.password,function(err,user){
        if(err){
            console.log(err);
            res.redirect("/register");
        }else{
            passport.authenticate("local")(req,res,function(){    ///esto se hace para que en la cookie se guarde la informacion de session
                res.redirect("/secrets");   ///como esta funcion solo se activa al autrntificar es decir sabe si esta logueado toca crear la ruta 
            });
        }
    });

    ///usando bcrypt o metodo de salting hashes
    /*bcrypt.hash(req.body.password, saltRounds, function(err, hash) {    ////se usa la funcion para que con las rondas sea mas dificil robar contraseñas 
        
        const newUser = new User({
            email: req.body.username,
            password: hash
          });
        
        newUser.save(function(err){
            if(!err){
                res.render("secrets");
            }else{
                console.log(err);
            }
        });

    });
    */

    
});

app.post("/login",function(req,res){

    ///usando cookies 
    const user = new User({
        username:req.body.username,      
        password:req.body.password
    });
   
    req.login(user,function(err){     ///se usa el metodo proveniente de passport para comprobar el usuario ingresado este autentificado 

        if(err){
            console.log(err);
        }else{
            passport.authenticate("local")(req,res,function(){   
                res.redirect("/secrets");  
            });
        }


    });
    
    
    
    ///usando bcrypt
    /*User.findOne({email:req.body.username},function(err,data){
        if(err){
            res.redirect("/login");
            console.log(err);
            
        }else{
            if(data){
                bcrypt.compare(req.body.password, data.password, function(err, result) {   ///se compara la contraseña ingresada con la generada en la bd
                    if(result===true){
                        res.render("secrets");
                    }   
                });
                ///if(data.password === req.body.password){     ///primera verificacion de seguridad que comprueba los datos de contraseña del mismo tipo 
            }
        }
    }); */
});


app.post("/submit",function(req,res){

    const submitedSecret= req.body.secret;   ///se obtiene el valor del nuevo secreto dado por el usuario registrado 

    User.findOne({_id:req.user._id},function(err,data){   ///se busca con el id del usuario que esta en ese momento en sesion y se le agrega el valor de su secreto 
        if(err){
            console.log(err);
        }else{
            if(data){            ////se comprueba que el id esta dentor de la bd, se guarda en el objeto que le pertenece el id , el nuevo secreto 
                data.secret= submitedSecret;
                data.save(function(){
                    res.redirect("/secrets");  ////se redirecciona a secrets para que se publique en pagina el nuevo secreto 
                });
            }
        }

    });

});

app.listen(3000, function() {
    console.log("Server started on port 3000");
  });
  