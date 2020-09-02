$(document).ready(function(){

    var repeat=true;
    const FREQ = 10000; 
 

    ///FUNCION PARA EL EL PERIODO DE TIEMPO DE INICIO DE AJAX
    function startAJAXcalls(){
        if(repeat){                        
        setTimeout(function(){        ////se establece el tiempo en el que se espera se ejecuten las funciones 
            getXMLRacers();
            startAJAXcalls();
        },FREQ);
        }
        
    }
    ///boton para detener actualizaciones 
    $("#btnStop").click(function(){
        repeat = false;
        $('#freq').html("Updates stoped");
    });

    ///boton para iniciar actualizaciones 
    $("#btnStart").click(function(){
        repeat = true;
        startAJAXcalls();
        showFrequency();
    });
    
    ///FUNCION PARA OBTENER DATOS DEL XML
    function getXMLRacers(){
        $.ajax({     ///mediante el metodo de Jquery se obtiene informacion de un documento xml con los datos de los finalistas
            url: "finishers.xml",
            cache: false,
            dataType: "xml",
            success: function(xml){
                ///se vacian los elementos ul para cada categoria 
                $('#finishers_m').empty();
                $('#finishers_f').empty();
                $('#finishers_all').empty();
                ////se busca en el xml dependiendo a la etiqueta necesaria 	
                $(xml).find("runner").each(function() {
                    var info = '<li>Name: ' + $(this).find("fname").text() + ' ' + $(this).find("lname").text() + '. Time: ' + $(this).find("time").text() + '</li>'; ///se almacena en una variable los datos de nombre y tiempo de llegada 
                    
                    ///se establece la condicion de acuerdo al genero para separar información y mostrarla en su respectivo campo 
                    if( $(this).find("gender").text() == "m" ){
                        $('#finishers_m').append( info );
                    }else if ( $(this).find("gender").text() == "f" ){
                        $('#finishers_f').append( info );
                    }else{  }
                        $('#finishers_all').append( info );
                });
                    
                //getTime();/// se actualiza la pagina con la ultima vez que se cargo el archivo xml 
                getTimeAjax();
            }
        });
    }
   	
	/*function getTime(){
        var a_p = "";
        var d = new Date();   //// llamado del objeto para la fecha 
        var curr_hour = d.getHours();  ///se llama al metodo del objeto Data para obtener horas 
        
        (curr_hour < 12) ? a_p = "AM" : a_p = "PM";
        (curr_hour == 0) ? curr_hour = 12 : curr_hour = curr_hour;
        (curr_hour > 12) ? curr_hour = curr_hour - 12 : curr_hour = curr_hour;
        
        var curr_min = d.getMinutes().toString();
        var curr_sec = d.getSeconds().toString();
        
        if (curr_min.length == 1) { curr_min = "0" + curr_min; }  ////proceso para tener dos digitos al dar los minutos y luego lo mismo con los segundos
        if (curr_sec.length == 1) { curr_sec = "0" + curr_sec; } 
        
        $('#updatedTime').html(curr_hour + ":" + curr_min + ":" + curr_sec + " " + a_p );  ///actualizand la hora en el index
    }

    */

    function getTimeAjax(){
        
            $('#updatedTime').load("time.php");   ///metodo load de jquery , convenitne para usar con ajax
          
    }

    function showFrequency(){
        $('#freq').html("Page refreshes every " + FREQ/1000 + " second(s).");
    }
      ///llamado de las funciones 
      getXMLRacers();
      startAJAXcalls();
      showFrequency();
});
