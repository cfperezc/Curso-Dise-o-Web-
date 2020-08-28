$(document).ready(function(){

    $(".guess_box").click(checkForCode);  /// al usuario dar click se ejecuta la funcion que revisa el codigo 

    function getRandom(num){
        var descuento = Math.floor((Math.random()*num));
        return descuento;
    }

    var hideCode= function esconder(){               ////funcion para crear el codigo de descuento aleatorio en los elementos div 
        var numRand = getRandom(4);
        $(".guess_box" ).each(function(index, value) {    ///el indice varia 
            if(numRand == index){
                $(this).append("<span id='has_discount'></span>");   ///de considir el aleatorio con el index se agrega un 
                return false;
            }
        });
    }


    hideCode();   
    function checkForCode(){
        var msg_descuento;
        if($.contains(this, document.getElementById("has_discount") ) ){    ///se usa el metodo de contain para comparar que el div clickeado tenga adentro un span con id: has_discount 
            descuento=getRandom(100);
            msg_descuento = "<p>Su codigo de Descuento es: "+ descuento+ "</p>";  ////se le agrega un elmento p con el descuento al dar click en una de las imagenes
        ///alert(discount_msg);
        }else{
            msg_descuento = "<p> lo siento no hay descuento </p>"; 
        }

        $(".guess_box").each(function() {     ///se recorre cada elemento para darle estilo de acuerdo a si tiene o no descunento 
            if($.contains(this, document.getElementById("has_discount"))){
                $(this).addClass("discount");
            }else{
                $(this).addClass("no_discount");
        }
        $(this).unbind('click'); ///se cancela el evento de dar click para no tener posibilidad de dar en dos div y obtener doble descuento 
    });

        $("#result").append(msg_descuento);
    }
    
    //// agregando funcion para que al pasar el cursor por  un div se cambie de fondo 
    $(".guess_box").hover(
        function () {

            $(this).addClass("my_hover");
        },
        function () {
            $(this).removeClass("my_hover");
    });



});


