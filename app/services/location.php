<?php
    session_start();
    if( !empty($_POST) )
    {
        if( isset($_POST)) 
        {
            // print($_POST);
            $servidor = "localhost";
            $username = "root";
            $password = "";
            $dbname = "datesim";
            $conexion = mysqli_connect ($servidor, $username, $password, $dbname) 
                or die ("No se puede conectar con el servidor");
            // ! Convertir el password a hash
            $hash = password_hash($password, PASSWORD_DEFAULT);
            // print_r($_POST);
            $country = $_POST['country'];
            $state = $_POST['state'];
            $city = $_POST['city'];
            $zip = $_POST['zip'];
            $email = $_POST['email'];
            // echo("'".$country."' '".$state."' <br>");
            try {
                // print_r($_POST);
                // ?Checar si ya esta registrado el correo en la BD
                echo($email);
                $queryValidateLocation = "SELECT COUNT(*) FROM users WHERE email = '".$email."' AND location_id IS NOT NULL";
                $statementValidateLocation = mysqli_query($conexion, $queryValidateLocation)
                    or die(mysqli_error($conexion));
                // print_r($statement);
                $row = mysqli_fetch_array($statementValidateLocation);
                // print($row[0]);
                echo("Valor de row: ".$row[0]." /n");

                // TODO if para ver si ya existia la locacion
                if ($row[0] > 0 && $row[0] != 0) {
                  // ?Actualiza la locacion
                  echo ("Actualiza la locacion");
                  http_response_code(204);
                  // $response = [
                  //   "status" => false,
                  //   "message" => "El correo: '$email' ya existe"
                  // ];
                  // $jsonResponse = json_encode($response);
                  // return $jsonResponse;
                  // echo ("false");
                  // http_response_code(500);
                  // echo(
                  // "{
                  //   status: false,
                  //   message: "El correo: '$email' ya existe"
                  // };"
                  // )

                    // ? sino la crea
                    $queryAddLocation = "INSERT INTO locations (id, city, state, country, postal_code) VALUES (null, '".$city."' , '".$state."', '".$country."', '".$zip."')";
                    // ?Revisando el query de arriba
                    print($queryAddLocation);
                    $statementAddLocation = mysqli_query($conexion, $queryAddLocation)
                        or die(mysqli_error($conexion));
                    // print_r($statementAddLocation);
                    // $row = mysqli_fetch_array($statementAddLocation);
                    // return true;
                    // echo("true");
                    return "Locacion Creada";
                    http_response_code(204);

                } else {
                    return "Locacion modificada";
                    http_response_code(205);

                }
            
              } catch (PDOException $e) {
                exit("Connection failed: " . $e->getMessage());
            }
        }
        else
        {
            echo "Introduzca todos los datos requeridos";
        }
    }
    else{
        echo "formulario no recibido!!";
    }
 ?>