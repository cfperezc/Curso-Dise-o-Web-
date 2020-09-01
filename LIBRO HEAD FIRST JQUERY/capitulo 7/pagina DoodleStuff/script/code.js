$(document).ready(function(){


    ////limitando los clicks por cada seccion 
    //var headclick = 0, eyesclick=0, noseclick=0, mouthclick=0;
    var clicx =[0,0,0,0];  ///variable con las porciones de cara 
    //// variables para generar un monstruo aleatorio 
    var ancho = 367; 
    var monstruos = 10;
    //fondo1(4000);
    //fondo2(5000);
    //fondo3(7000);

    $("#btnRandom").click(generar);
    $("#btnReset").click(reset);
///funcion del tiempo del fondo 

    function fondo1(t){
        $("#container #lightning1").fadeIn("fast").fadeOut("fast");
        setTimeout("fondo1()",t);
    }

    function fondo2(t){
        $("#container #lightning2").fadeIn("fast").fadeOut("fast");
        setTimeout("fondo2()",t);
    }

    function fondo3(t){
        $("#container #lightning3").fadeIn("fast").fadeOut("fast");
        setTimeout("fondo3()",t);
    }
    
    var int1, int2, int3;

    function goLightning(){     ////se ejecuta la funcion para el intervalo de tiempo del fondo 
		

        int1 = setInterval( function() {
            fondo1();
        },4000);
            
        int2 = setInterval( function() {
            fondo2();
        },5000);
        int3 = setInterval( function() {
            fondo3();
        },7000);
    }
    
    function stopLightning(){
           window.clearInterval(int1);
           window.clearInterval(int2);
           window.clearInterval(int3);
    
    }

    goLightning();
	window.onblur = stopLightning;  ///cuando se esta en otra pestaña se detiene 
	window.onfocus = goLightning;    ////cuando se esta en la pestaña de la aplicacion se ejecuta la funcion 
	
    ///movimiento de monstruos
    $("#head").click(function(){

        mover(0,this);
        
    });

    
    $("#eyes").click(function(){
        mover(1,this);
    });

    
    $("#nose").click(function(){
        mover(2,this);
    });

    
    $("#mouth").click(function(){
        mover(3,this);
    });


    ////funcion del movimiento de monstruos
    function mover(i,obj){   ////se le pasa el elemeto del arreglo a mover y el objeto que lo representa 
        if(clicx[i] < 9){
            $(obj).animate({left:"-=367px"},500);  ///se genara la animacion para que la imagen cambie de posicion 
            clicx[i]+=1;
        }else{
            $(obj).animate({left:"0px"},500);   ////vuleve todo al inicio 
            clicx[i]=0;
        }
    }



    ///para generar mostruos aleatorios 
    function numeroAleatorio(num){
        var numeroGenerado = Math.floor(Math.random()*num);
        return numeroGenerado;
    }

    function generar(){
        $(".face").each(function(index){  ///se recorre cada elemento dentro del elemento con clase face
            var posicionEsperada = numeroAleatorio(monstruos);
            var posicionActual = clicx[index];
            clicx[index] = posicionEsperada;
            
            if(posicionEsperada>posicionActual){
                var moverA = (posicionEsperada - posicionActual)*ancho;
                $(this).animate({left:"-="+moverA+"px"},500);  ////se mueve la imagen hacia la izquierda ya que la imagen debe ir a la posicion generada aleatoriamente 
            }else if(posicionEsperada<posicionActual){
                var moverA = (posicionActual-posicionEsperada)*ancho;
                $(this).animate({left:"+="+moverA+"px"},500);    ///se mueve la imagen hacia la derecha 
            }else{

            }
       
        });
    };



    ///funcion del boton de reset 
    function reset(){
        $(".face").each(function(index){
            clicx[index]=0;
            $(this).animate({left:"0px"},500);
        });
    }
});


