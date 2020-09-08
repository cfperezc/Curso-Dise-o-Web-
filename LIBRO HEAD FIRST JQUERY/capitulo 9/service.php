<?php



	if ($_POST['action'] == 'addRunner') {
	
		$fname = htmlspecialchars($_POST['txtFirstName']);   ///se cuida de codigo potencialmente peligroso para la base de datos
		$lname = htmlspecialchars($_POST['txtLastName']);
		$gender = htmlspecialchars($_POST['ddlGender']);
		$minutes = htmlspecialchars($_POST['txtMinutes']);
		$seconds = htmlspecialchars($_POST['txtSeconds']);
		if(preg_match('/[^\w\s]/i', $fname) || preg_match('/[^\w\s]/i', $lname)) {  ///expresion regular para controlar el tipo de dato entrado 
			fail('Invalid name provided.');
		}
		if( empty($fname) || empty($lname) ) {  ////se verifica que no este vacio el campo 
			fail('Please enter a first and last name.');
		}
		if( empty($gender) ) {
			fail('Please select a gender.');
		}
		if( empty($minutes) || empty($seconds) ) {
			fail('Please enter minutes and seconds.');
		}
		
		$time = $minutes.":".$seconds;

		$query = "INSERT INTO runners SET first_name='$fname', last_name='$lname', gender='$gender', finish_time='$time'";
		$result = db_connection($query);
		
		if ($result) {
			$msg = "Runner: ".$fname." ".$lname." added successfully" ;
			success($msg);
		} else {
			fail('Insert failed.');
		}
		exit;

	}
	
	
	if($_GET){
			if($_GET['action'] == 'getRunners'){
			
				$query = "SELECT first_name, last_name, gender, finish_time FROM runners order by finish_time ASC "; ///solicitud a la base de datos 
				$result = db_connection($query);  /// funcion que maneja la conexion con la base de datos
				$runners = array(); ///arreglo que gusarda los datos de los finalistas 
				while ($row = mysqli_fetch_assoc($result)) {  ///se usa este metodo para obtener un arreglo asociativo donde se tenga la informacion de la base de datos 
					array_push($runners, array('fname' => $row['first_name'], 'lname' => $row['last_name'], 'gender' => $row['gender'], 'time' => $row['finish_time']));
				}
				echo json_encode(array("runners" => $runners)); ///metodo para codificar la informacion en formato Json
				//echo var_export($runners,true);
					exit;
				
			}
	}

    function db_connection($query) {
        $con = mysqli_connect('dbip','dbuser','dbpass','dbname'); ///datos de la bd. para establecer la conexion 
        if (mysqli_connect_errno()) 
        {
        printf("Connect failed: %s\n", mysqli_connect_error());
        exit();
        }else{
            //printf("Conectado");
            
            return mysqli_query($con,$query);
        }
   
	}
	
	///funciones para los errores o exito en el codigo 
    function fail($message) {
		die(json_encode(array('status' => 'fail', 'message' => $message)));
	}
	function success($message) {
		die(json_encode(array('status' => 'success', 'message' => $message)));
	}


?>