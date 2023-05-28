<?php
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
            $name = $_POST['name'];
            $email = $_POST['email'];
            $password = $_POST['password'];
            $birthdate = $_POST['birthdate'];
            // ! Convertir el password a hash
            $hash = password_hash($password, PASSWORD_DEFAULT);
            // print_r($_POST);
            // echo("'".$name."' '".$email."' <br>");
            try {
                // print_r($_POST);
                // ?Checar si ya esta registrado el correo en la BD
                $queryValidateUser = "SELECT COUNT(*) FROM users WHERE email = '".$email."' ";
                $statementValidateUser = mysqli_query($conexion, $queryValidateUser)
                    or die(mysqli_error($conexion));
                // print_r($statement);
                $row = mysqli_fetch_array($statementValidateUser);
                // print($row[0]);
                // echo("Valor de row: '".$email."' /n");

                // TODO if para ver si ya existia el correo o no
                if ($row[0] > 0) {

                  // echo ("El correo: '$email' ya existe");
                  // $response = [
                  //   "status" => false,
                  //   "message" => "El correo: '$email' ya existe"
                  // ];
                  // $jsonResponse = json_encode($response);
                  // return $jsonResponse;
                  echo ("false");
                  http_response_code(500);
                  // echo(
                  // "{
                  //   status: false,
                  //   message: "El correo: '$email' ya existe"
                  // };"
                  // )

                } else {
                  // ? se convierte la contrase;a a hash
                  $queryAddUser = "INSERT INTO users (id, name, email, password, birthdate) VALUES (null, '".$name."' , '".$email."', '".$hash."', '".$birthdate."')";
                  // ?Revisando el query de arriba
                  // print($queryAddUser);
                  $statement = mysqli_query($conexion, $queryAddUser)
                      or die(mysqli_error($conexion));
                  // print_r($statement);
                  // $row = mysqli_fetch_array($statement);
                  // return true;
                  echo("true");
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