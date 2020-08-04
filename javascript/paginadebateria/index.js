for (var i= 0; i < document.querySelectorAll(".drum").length; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click",function (){
        
        var boton_presionado = this.innerHTML;  /// con esta linea sabemos que elemento esta siendo presionado en la pagina HTML

        sonido(boton_presionado);
        animacion(boton_presionado);
        

    });    
}
//esta funcion se encarga de generar los sonidos en la pagina 
function sonido(boton){
    switch (boton) {
        case "w":
            var bombo1= new Audio("sounds/tom-1.mp3");
            bombo1.play();
            break;
        case "a":
            var bombo2= new Audio("sounds/tom-2.mp3");
            bombo2.play();
            break;
        case "s":
            var bombo3= new Audio("sounds/tom-3.mp3");
            bombo3.play();
            break;
        case "d":
            var bombo4= new Audio("sounds/tom-4.mp3");
            bombo4.play();
            break;
        case "j":
            var redoblante= new Audio("sounds/snare.mp3");
            redoblante.play();
            break;
        case "k":
            var platillo= new Audio("sounds/crash.mp3");
            platillo.play();
            break;
        case "l":
            var bombo_bajo= new Audio("sounds/kick-bass.mp3");
            bombo_bajo.play();
            break;
        default:
            break;
    }
}

document.addEventListener("keydown",function(event){   ///al agregar event se esta dando la iformacion sobre los valores usados en este
                                                        ///caso la tecla que se presiono

    sonido(event.key);
    animacion(event.key);
    

});

function animacion(boton){

    var activar = document.querySelector("."+boton);
    activar.classList.add("pressed");                    ///se agrego una clase con estilo css para que asi simule una animación
    setTimeout(function(){                                /// funcion para que una funcion haga algo por determinado tiempo 
        activar.classList.remove("pressed");                   ///a la funcion setTimeout se le pasa la funcion y el tiempo deseado 

    },100);

}