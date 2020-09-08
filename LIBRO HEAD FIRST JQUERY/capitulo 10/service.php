<?php
    date_default_timezone_set('America/Bogota');
    
///como solo se esta agregando criaturas no se esta leydendo se certifica que sea una accion post
if($_POST){
	if ($_POST['action'] == 'addSighting') {
	
		$date = $_POST['sighting_date'] ;
		$type = htmlspecialchars($_POST['creature_type']);
		$distance = htmlspecialchars($_POST['creature_distance']);
		$weight = htmlspecialchars($_POST['creature_weight']);
		$height = htmlspecialchars($_POST['creature_height']);
		$color = htmlspecialchars($_POST['creature_color_rgb']);
		$lat = htmlspecialchars($_POST['sighting_latitude']);
		$long = htmlspecialchars($_POST['sighting_longitude']);
		
		$my_date = date('Y-m-d', strtotime($date));
		
		if($type == ''){
			$type = "Other";
		}
		////se le pasan los valores a la tabla que almacena las criaturas con las variables que almacenan lo sleccionado por el usuario 
		$query = "INSERT INTO sightings (sighting_date, creature_type, creature_distance, creature_weight, creature_height, creature_color, sighting_latitude, sighting_longitude) ";
		$query .= "VALUES ('$my_date', '$type', '$distance', '$weight', '$height', '$color', '$lat', '$long') ";

		$result = db_connection($query);
        
        ///se comprueba la conexion y cargado de informacion en la base de datos 
		if ($result) {
			$msg = "Creature added successfully";
			success($msg);
		} else {
			fail('Insert failed.');
		}
		exit;
	}
}	
	function db_connection($query) {
		$con = mysqli_connect('dbip','dbuser','dbpass','dbname');
        if (mysqli_connect_errno()) 
        {
        printf("Connect failed: %s\n", mysqli_connect_error());
        exit();
        }else{
            
            return mysqli_query($con,$query);
        }
   
	}
	
	function fail($message) {
		die(json_encode(array('status' => 'fail', 'message' => $message)));
	}
	function success($message) {
		die(json_encode(array('status' => 'success', 'message' => $message)));
	}
?>
