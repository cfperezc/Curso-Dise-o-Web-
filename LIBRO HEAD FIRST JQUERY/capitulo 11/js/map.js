$(document).ready(function(){  
	var map;
	var info_window = new google.maps.InfoWindow({content: ''});
	var markersArray = []; ///para tener almacenados los marcadores 
	var bounds = new google.maps.LatLngBounds();

	///funcion para el inicializado del objeto del mapa 
	function initialize(){  
		var lat = 45.519098;
		var lng = -122.672138;
		//se crea el mapa con las coordenadas deseadas 
		var latlng = new google.maps.LatLng(lat,lng); 
		///opciones de la api de google para el mapa 
		var mapOpts = {
			zoom: 13,
			center: latlng,
			mapTypeId: google.maps.MapTypeId.HYBRID ///mapa que convina imagen satelital con vista normal de un mapa 
		};
		map = new google.maps.Map(document.getElementById("map_canvas"), mapOpts); ///se agrega el mapa al elemento que contiene la clase map_canvas
		
		if ( $('#ddlTypes').length ) {
			
			getAllTypes();
		}else{
			
			getAllSightings();  ////se llama la funcion encargada de listar en el mapa las criaturas 
			
		}
    }
    
    function getAllSightings(){
    	$.getJSON("service.php?action=getAllSightings", function(json) {
			if (json.sightings.length > 0) {
				$('#sight_list').empty();	
				
				$.each(json.sightings,function() {
					var info = 'Date: ' +  this['date'] + ', Type: ' +  this['type']; ///se obtiene la infomacion de la base de datos y se almacena en una variable
					
					///se lista la informacion de la variable creando elementos li en el documento , ademas de una clase para los estilos 
					var $li = $("<li />");
					$li.html(info);
					$li.addClass("sightings");
					$li.attr('id', this['id']) ;
					$li.click(function(){
						getSingleSighting( this['id'] ); ///se llama la funcio encargada de listar las caracteristicas de una criatura en caso de darle click 	
					});
					$li.appendTo("#sight_list");	
				});
			}
		});
    }
	///funcion encargada de listar una sola criatura ponindo un marcador en el mapa 
	function getSingleSighting(id){
	
    	$.getJSON("service.php?action=getSingleSighting&id="+id, function(json) {
			if (json.sightings.length > 0) {
				
				$.each(json.sightings,function() {
					var loc = new google.maps.LatLng(this['lat'], this['long']);
				
					var my_marker = new google.maps.Marker({
						position: loc, 
						map: map,
						title:this['type'] 
					}); 
					map.setCenter(loc, 20);

				});
				
			}
		});	
	}
	///funcion para poder seleccionar del mapa las criaturas y saber su tipo de acuerdo a lo obtenido en la base de datos para el archivo display_type
    function getAllTypes(){
    	$.getJSON("service.php?action=getSightingsTypes", function(json_types) {
			if (json_types.creature_types.length > 0) {
				
				$.each(json_types.creature_types,function() {
					var info =  this['type'];
					var $li = $("<option />");
					$li.html(info);
					$li.appendTo("#ddlTypes");	
				});
			}
		});
    }	
	///se obtiene la informacion de la base de datos 
    function getSightingsByType(type){
    	$.getJSON("service.php?action=getSightingsByType&type="+type, function(json) {
			if (json.sightings.length > 0) {
				$('#sight_list').empty();	
				
				$.each(json.sightings,function() {
					var info = 'Distance: ' +  this['distance'] + '<br>';
					info += ' Height: ' +  this['height'] + ', Weight: ' +  this['weight'] + ', Color: ' +  this['color'] + '<br>';
					info += 'Latitude: ' +  this['lat'] + ', Longitude: ' +  this['long'];

					var loc = new google.maps (this['lat'], this['long']);
						var opts = {
							map: map,
							position:loc
						};
						var marker = new google.maps.Marker(opts);
						markersArray.push(marker);
						google.maps.event.addListener(marker, 'click', function() {
							info_window.content = info;
							info_window.open(map, marker);
						});
						var $li = $("<li />");
						$li.html('Date: ' + this['date'] + ', Type: ' + this['type']);
						$li.addClass("sightings");
						$li.click(function(){
							info_window.content = info;
							info_window.open(map, marker);		
						});
						$li.appendTo("#sight_list");	
						bounds.extend(loc);
				});
				map.fitBounds(bounds);
			}
		});
    }	
    ///se borran los marcadores antiguos
    $('#ddlTypes').change(function() {
    	if($(this).val() != ""){
  			clearOverlays(); ///se limpian los marcadores antes de adicionar infromacion 
  			getSightingsByType( $(this).val()); ///se le pasa el valor de la lista desplegable
  		}
	});
	

	function clearOverlays() {
		if (markersArray) {
			for (i in markersArray) {
				markersArray[i].setMap(null); ///se remueve el marcador del mapa 
			}
			markersArray.length = 0;
			bounds = null;
			bounds = new google.maps.LatLngBounds();
		}
	}
    initialize();

});