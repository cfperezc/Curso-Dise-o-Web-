$("body").keydown(function(e){
    var tecla=e.key;
    $("h1").text(tecla);
})