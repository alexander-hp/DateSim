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
            $email = $_POST['email'];
            $password = $_POST['password'];
            // ! Convertir el password a hash
            $hash = password_hash($password, PASSWORD_DEFAULT);
            // print_r($_POST);
            // echo("'".$name."' '".$email."' <br>");
            try {
                // print_r($_POST);

                // ?Checar si ya esta registrado el correo en la BD
                $queryValidateUser = "SELECT password, name FROM users WHERE email = '".$email."' ";
                $statementValidateUser = mysqli_query($conexion, $queryValidateUser)
                    or die(mysqli_error($conexion));
                // print_r($statement);
                $row = mysqli_fetch_array($statementValidateUser);
                // print($row[0]);
                $hashAlmacenado = $row[0]; // Hash almacenado en la base de datos
                // TODO if para ver si contrase;a es correcta
                if (password_verify($password, $hashAlmacenado)) {
                  $_SESSION["userName"] = $row[1];
                  // print($row[1]);
                  $_SESSION["userEmail"] = $email;
                  // $_SESSION["userPassword"] = $password;
                    // La contraseña es válida
                    echo("true");
                    // echo "Contraseña correcta";
                    http_response_code(200);
                } else {
                    // La contraseña es inválida
                    http_response_code(500);
                    echo ("false");
                    // echo "Contraseña incorrecta";
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