
var patronusuario=[];
var patronjuego=[];
var coloresboton=["red", "blue", "green", "yellow"];
var inicio= false;
var nivel = 0;

/// llamado del metodo on con su evento keydown para hacer un cambio apenas se prsione una tecla 
$(document).on("keydown",function(){

    if (!inicio) {

        $("#level-title").text("Nivel"+nivel);
        Secuencia();    
        inicio = true;
      }    
});
/// llamado del metodo on con su evento clik para conocer el elemento al que se le esta dando click 
$(".btn").on("click",function(){
    var colorusuario= $(this).attr("id");

    patronusuario.push(colorusuario);
    reproducirsonido(colorusuario);
    Animacion(colorusuario);

    checkrespuesta(patronusuario.length-1);  ///se pasa el ultimo patron dado por el usuario a la funcionde verificacion 
    
});
///funcion de chequeo 
function checkrespuesta(nivelactual){
    if(patronusuario[nivelactual]===patronjuego[nivelactual]){     ///se hace un chequeo de valores en los patrones de usuario y del juego 
        console.log("exito");
        if(patronusuario.length===patronjuego.length){          ///se verifica si los patrones ademas tienen el mismo tamaño

            setTimeout(function(){                              ///de ser asi se establece un tiempo de ejecucion del patron
    
                Secuencia();
            
            },1000);
        }

    }else{
        console.log("fallo");
        reproducirsonido("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){                              ///de ser asi se establece un tiempo de ejecucion del patron
            $("body").removeClass("game-over");

        },200);
        $("#level-title").text(" Game Over presione una tecla para reinciar");
        reinicio();
    }
}

/// funcion dedicada a la ejecucion de la secuencia del juego simon dice 
function Secuencia() {

    patronusuario=[];
    nivel++;
    $("#level-title").text(" Nivel " + nivel);
    

    var numeroaleatorio=Math.floor(Math.random()*4); 
    var coloraleatorio = coloresboton[numeroaleatorio];
    patronjuego.push(coloraleatorio);

    $("#" + coloraleatorio).fadeIn(100).fadeOut(100).fadeIn(100);
    
    reproducirsonido(coloraleatorio);
   
}
/// funcion dedicada a la ejecucion del sonido al presionar un boton  
function reproducirsonido(nombre){
    var sonido = new Audio("sounds/" + nombre + ".mp3");
    sonido.play();
}
/// funcion dedicada a la animacion de los botones 
function Animacion(botonpresionado){
    
    $("#" + botonpresionado).addClass("pressed");
    setTimeout(function(){                                             /// funcion para que una funcion haga algo por determinado tiempo 
        $("#" + botonpresionado).removeClass("pressed");                   ///a la funcion setTimeout se le pasa la funcion y el tiempo deseado 

    },100);

}
/// funcion de reincio del juego 
function reinicio(){
    nivel=0;
    patronjuego=[];
    inicio=false;
}
