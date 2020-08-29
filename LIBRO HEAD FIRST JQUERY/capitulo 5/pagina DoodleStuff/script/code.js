$(document).ready(function(){


    ////limitando los clicks por cada seccion 
    var headclick = 0, eyesclick=0, noseclick=0, mouthclick=0;

    fondo1(4000);
    fondo2(5000);
    fondo3(7000);

    $("#head").click(function(){
        if(headclick < 6){
            $("#head").animate({left:"-=367px"},500);  ///se genara la animacion para que la imagen cambie de posicion 
            headclick+=1;
        }else{
            $("#head").animate({left:"0px"},500);   ////vuleve todo al inicio 
            headclick=0;
        }
    });

    
    $("#eyes").click(function(){
        if(eyesclick < 6){
            $("#eyes").animate({left:"-=367px"},500);
            eyesclick+=1;
        }else{
            $("#eyes").animate({left:"0px"},500);
            eyesclick=0;
        }
    });

    
    $("#nose").click(function(){
        if(noseclick < 6){
            $("#nose").animate({left:"-=367px"},500);
            noseclick+=1;
        }else{
            $("#eyes").animate({left:"0px"},500);
            noseclick=0;
        }
    });

    
    $("#mouth").click(function(){
        if(mouthclick < 6){
            $("#mouth").animate({left:"-=367px"},500);
            mouthclick+=1;
        }else{
            $("#mouth").animate({left:"0px"},500);
            mouthclick=0;
        }
    });

});
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

