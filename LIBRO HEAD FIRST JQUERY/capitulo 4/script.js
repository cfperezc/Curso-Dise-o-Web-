$(document).ready(function(){

    var v = false;
    var $f, $m;   ///variables para las clases de pescado y carne 
    
    $("button#veg").click(function(){   ///se quitan elementos con carne y pesacado pero se agregan reemplazos 
        if (v == false){

            $f = $(".fish").parent().parent().detach();    ///se guarda en variable los elementos borrados con clase de pesacado 
		    $(".hamburger").replaceWith("<li class='portobello'><em>Portobello Mushroom</em></li>");
		    $(".portobello").parent().parent().addClass("veg_leaf");
  		    $(".meat").after("<li class='tofu'><em>Tofu</em></li>");
  		    $m = $(".meat").detach();  ////se guarda en una variable global los elemntos borrados con clase de carne
		    $(".tofu").parent().parent().addClass("hoja");

            v = true;
        }
    });
    $("button#restore").click(function(){   ///restaurando el menu con carne y pesacado 
        if (v == true){         
            $(".portobello").parent().parent().removeClass("veg_leaf");
		    $(".portobello").replaceWith("<li class='hamburger'>Hamburger</li>");
		    $(".menu_entrees li").first().before($f);
		    $(".tofu").parent().parent().removeClass("hoja");
		    $(".tofu").each( function(i){   ///se busca cada elemento con la clase tofu y se reemplaza con la clase carne 
				$(this).after($m[i]);
			});
		    $(".tofu").remove();

            v = false;
        }
    });


});