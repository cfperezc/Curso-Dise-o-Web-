$(document).ready(function(){

    $(".guess_box").click(function(){

        $(".guess_box p").remove();
        var descuento = Math.floor((Math.random()*5) + 5);
        var msg_descuento = "<p>Your Discount is "+ descuento+ "%</p>";  ////se le agrega un elmento p con el descuento al dar click en una de las imagenes
        ///alert(discount_msg);
        $(this).append(msg_descuento);
    });

});


