$(document).ready(function(){
    ///se crea un arreglo para almacenar las cartas usadas
    var used_cards = new Array();
///constructor del objeto para las  cartas    
function card( name, suit, value ) {
    this.name = name;
    this.suit = suit;
    this.value = value;
}    

//mazo
var deck = [
    new card('Ace', 'Hearts',11),
    new card('Two', 'Hearts',2),
    new card('Three', 'Hearts',3),
    new card('Four', 'Hearts',4),
    new card('Five', 'Hearts',5),
    new card('Six', 'Hearts',6),
    new card('Seven', 'Hearts',7),
    new card('Eight', 'Hearts',8),
    new card('Nine', 'Hearts',9),
    new card('Ten', 'Hearts',10),
    new card('Jack', 'Hearts',10),
    new card('Queen', 'Hearts',10),
    new card('King', 'Hearts',10),
    new card('Ace', 'Diamonds',11),
    new card('Two', 'Diamonds',2),
    new card('Three', 'Diamonds',3),
    new card('Four', 'Diamonds',4),
    new card('Five', 'Diamonds',5),
    new card('Six', 'Diamonds',6),
    new card('Seven', 'Diamonds',7),
    new card('Eight', 'Diamonds',8),
    new card('Nine', 'Diamonds',9),
    new card('Ten', 'Diamonds',10),
    new card('Jack', 'Diamonds',10),
    new card('Queen', 'Diamonds',10),
    new card('King', 'Diamonds',10),
    new card('Ace', 'Clubs',11),
    new card('Two', 'Clubs',2),
    new card('Three', 'Clubs',3),
    new card('Four', 'Clubs',4),
    new card('Five', 'Clubs',5),
    new card('Six', 'Clubs',6),
    new card('Seven', 'Clubs',7),
    new card('Eight', 'Clubs',8),
    new card('Nine', 'Clubs',9),
    new card('Ten', 'Clubs',10),
    new card('Jack', 'Clubs',10),
    new card('Queen', 'Clubs',10),
    new card('King', 'Clubs',10),
    new card('Ace', 'Spades',11),
    new card('Two', 'Spades',2),
    new card('Three', 'Spades',3),
    new card('Four', 'Spades',4),
    new card('Five', 'Spades',5),
    new card('Six', 'Spades',6),
    new card('Seven', 'Spades',7),
    new card('Eight', 'Spades',8),
    new card('Nine', 'Spades',9),
    new card('Ten', 'Spades',10),
    new card('Jack', 'Spades',10),
    new card('Queen', 'Spades',10),
    new card('King', 'Spades',10)
];

///objeto para la mano 
var hand = {
    cards : new Array(),
    current_total : 0,
    
    sumCardTotal: function(){   ////metodo de suma de valor de cartas  
        this.current_total = 0;
       // for(var i=0;i<this.cards.length;i++){
        //   var c = this.cards[i];
        //   console.log(c);
        //    this.current_total += c.value;
        //} 

        for (const card of this.cards) {
            var c = card;
            console.log(c);
            this.current_total += c.value;
            console.log(this.current_total);
        }
        
        $("#hdrTotal").html("Total: " + this.current_total ); ///se selecciona el elemento h3 para ahi mostrar el puntaje 
        
        if(this.current_total > 21){
            $("#btnStick").trigger("click");  
            $("#imgResult").attr('src','images/x2.png'); /// se le agrega el atributo a la imagen con la ruta de una x para la perdida 
            $("#hdrResult").html("BUST!")  
                           .attr('class', 'lose');   ///se dan las clases de perdida 
        }else if(this.current_total == 21){  //// como es blackjack el objetivo es 21 por lo que este se crea cuando el jugador saca este puntaje 
            $("#btnStick").trigger("click");
            $("#imgResult").attr('src','images/check.png'); 
            $("#hdrResult").html("BlackJack!")   
                           .attr('class', 'win');
        }else if(this.current_total <= 21 && this.cards.length == 5){  /// si no se pasa de 21 y ya saco 5 cartas gana 
            $("#btnStick").trigger("click");
            $("#imgResult").attr('src','images/check.png');
            $("#hdrResult").html("BlackJack - 5 card trick!")
                           .attr('class', 'win');
        }else{ }
    }
};
///generar numeros aleatorios
function getRandom(num){
    var my_num = Math.floor(Math.random()*num);
    return my_num;
}

/// delaer
function deal(){
    for(var i=0;i<2;i++){
        hit();
    }
}
///funcion de juego 
function hit(){
    var good_card = false;
    do{
        var index = getRandom(52);  ///se genera un numero aleatorio para las 52 cartas 
        if( !$.inArray(index, used_cards ) > -1 ){  ////se comprueba que la carta no este ya en las usadas 
            good_card = true;
            var c = deck[ index ]; ////se almacena en la variable la nueva carta de la mano 
            used_cards[used_cards.length] = index; 
            hand.cards[hand.cards.length] = c;	/// se almacena en el arreglo del objeto la nueva carta 
            
            ///se crea una mano en un div y este se mete dentro del div  con id my_hand
            var $d = $("<div>");
            $d.addClass("current_hand")
              .appendTo("#my_hand");
            
            ///para agregar la carta y mostrarla  se le agregan los atributos y en donde esta la carta 
            $("<img>").attr('alt', c.name + ' of ' + c.suit )
                      .attr('title', c.name + ' of ' + c.suit )
                      .attr('src', 'images/cards/' + c.suit + '/' + c.name + '.jpg' )
                      .appendTo($d)
                      .fadeOut('slow')
                      .fadeIn('slow');
            
        }
    }while(!good_card); /// se hace el proceso hasta que la carta no este repetida 
    good_card = false;	  
    hand.sumCardTotal(); //se llama el metodo dentro del objeto que suma y muestra el resultado 
}

$("#btnDeal").click( function(){   ////se ceaa un evento con el metodo  de click para que se ejecute la funcion del dealer y salgan en pantalla las iagenes de pedir o quedar  
    deal();
    $(this).toggle();
    $("#btnHit").toggle();
    $("#btnStick").toggle();
});

$("#btnHit").click( function(){  ///si el usuario da en la imgagen del mazo regado se ejecuta la funcion de juego
    hit();
});

function end(){          ///se cambia el estado de los botones 
    $("#btnHit").toggle();
    $("#btnStick").toggle();
    $("#btnRestart").toggle();
}

$("#btnStick").click( function(){   ///para cuando no se haya pasado de 21 
    $("#hdrResult").html('Stick!')
                   .attr('class', 'win');
    $("#result").toggle();
    end();
});

$("#btnRestart").click( function(){
    $("#result").toggle();  ///se deja en blanco el resultado cambiando el estado de la imagen ocultandolo 
    $(this).toggle();
    $("#my_hand").empty();  //se vacia la mano 
    $("#hdrResult").html(''); /// se vacia el contenido del resultado 
    $("#imgResult").attr('src','images/check.png'); ///se muestra si el usaurio gano con una imagen 
    
    ///se vacian las arreglos de cartas, sus puntajes y la mano 
    used_cards.length = 0;
    hand.cards.length = 0;
    hand.current_total = 0;
    
    $("#btnDeal").toggle()    
                 .trigger('click');
});





});


