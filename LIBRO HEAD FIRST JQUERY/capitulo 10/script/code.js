$(document).ready(function(){

	///se configura la manera de obtner la informacion de la fecha 
		$("#datepicker").datepicker({ changeMonth: true, changeYear: true}); //opciones de cambio de mes y año 


	///seleccion de criatura 
		$( "#type_select" ).buttonset(); ///se cambia el estilo de los botones de radio a unos con mejor aspecto 
		
	

	///para el slider de la distancia 	
		$( "#slide_dist" ).slider({
			value:0,
			min: 0,
			max: 500,
			step: 10,
			slide: function( event, ui ) {
				$( "#distance" ).val( ui.value);
			}
		});
	$( "#distance" ).val( $( "#slide_dist" ).slider( "value" ));
		
		
		
	
///peso de las criaturas
		$( "#slide_weight" ).slider({
			value:0,
			min: 0,
			max: 5000,
			step: 5,
			slide: function( event, ui ) {
				$( "#weight" ).val( ui.value);
			}
		});
		
		$( "#weight" ).val( $( "#slide_weight" ).slider( "value" ));
        
/////altura de las criaturas		
		$( "#slide_height" ).slider({
			value:0,
			min: 0,
			max: 20,
			step: 1,
			slide: function( event, ui ) {
				$( "#height" ).val( ui.value);
			}
		});
		
        $( "#height" ).val( $( "#slide_height" ).slider( "value" ));
        
		
/// sliders para su ubicacion 		
		$( "#slide_lat" ).slider({
			value:0,
			min: -90,
			max: 90,
			step: 0.00001,
			slide: function( event, ui ) {
				$( "#latitude" ).val( ui.value);
			}
		});
		
			
		
		$( "#slide_long" ).slider({
			value:0,
			min: -180,
			max: 180,
			step: 0.00001,
			slide: function( event, ui ) {
				$( "#longitude" ).val( ui.value);
			}
		});

///funcion para el cambio de color rgb	
	function refreshSwatch() {

		var	red = $( "#red" ).slider( "value" );
		var	green = $( "#green" ).slider( "value" );
		var	blue = $( "#blue" ).slider( "value" );
		var	my_rgb = "rgb(" + red + "," + green + "," + blue + ")"; 
			
			$( "#swatch" ).css( "background-color", my_rgb );  ///se usa css para darle el valor e color seleccionado por el usuario
			$( "#red_val" ).val(red );
			$( "#blue_val" ).val( blue);
			$( "#green_val" ).val( green);
			$( "#color_val" ).val( my_rgb);		
	}
///transformando los divs en sliders y agregandoles una funcion para el cambio de color de tipo rgb
	$( "#red, #green, #blue" ).slider({
		orientation: "horizontal",	
		range: "min", 
		max: 255, 
		value: 127, 
		slide: refreshSwatch,   ///se llama la funcion cuando se hace mueve el slider 
		change: refreshSwatch   ////cambia cuando se genera un cambio en los valores 
	});
						
	
///valores iniciales para cuando cargue la pagina 
	$( "#red" ).slider( "value", 127 );
	$( "#green" ).slider( "value", 127 );
	$( "#blue" ).slider( "value", 127 );



    $("button:submit").button();
    

///funcion para evitar el envio vacio de datos
	$("#frmAddSighting").submit(function(){
		return false;
	});
	
	$('#btnSave').click(function() {

        ///serializando el el valor de los inputs en el form
		var data = $("#frmAddSighting :input").serializeArray();
        //generando mensajes de tipo json para indicar el exito o el fracaso del envio 
		$.post($("#frmAddSighting").attr('action'), data, function(json){
			
			if (json.status == "fail") {
				alert(json.message);
			}else if (json.status == "success") {
				alert(json.message);
			}else{alert("Nothing Happened");}
		}, "json");

	});	
	
});
