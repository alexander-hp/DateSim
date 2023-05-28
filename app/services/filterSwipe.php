<?php
    session_start();

    // print($GET);
    $servidor = "localhost";
    $username = "root";
    $password = "";
    $dbname = "datesim";
    $conexion = mysqli_connect ($servidor, $username, $password, $dbname) 
        or die ("No se puede conectar con el servidor");
    try {
        // print_r($GET);
        $queryGetUser = "SELECT birthdate, gender, hobbies, lookingFor, searchingByAge, city, country, state, zip FROM users WHERE email = 'hdezppalex@gmail.com' ";
        $statementGetUser = mysqli_query($conexion, $queryGetUser)
            or die(mysqli_error($conexion));
        $row = mysqli_fetch_array($statementGetUser);
        // print_r($row);
        // return $row;
        http_response_code(200);

        // // ?Checar si ya esta registrado el correo en la BD
        // $queryValidateUser = "SELECT * FROM users WHERE (city = 'huatusco' OR country = "México") AND email <> 'hdezppalex@gmail.com' AND gender = "Mujer" ";
        // $statementValidateUser = mysqli_query($conexion, $queryValidateUser)
        //     or die(mysqli_error($conexion));
        // // print_r($statement);
        // $row = mysqli_fetch_array($statementValidateUser);
        // // print($row[0]);
        // $hashAlmacenado = $row[0]; // Hash almacenado en la base de datos
        // // TODO if para ver si contrase;a es correcta
        // if (password_verify($password, $hashAlmacenado)) {
        //   $_SESSION["userName"] = $row[1];
        //   // print($row[1]);
        //   $_SESSION["userEmail"] = $email;
        //   // $_SESSION["userPassword"] = $password;
        //     // La contraseña es válida
        //     echo("true");
        //     // echo "Contraseña correcta";
        //     http_response_code(200);
        // } else {
        //     // La contraseña es inválida
        //     http_response_code(500);
        //     echo ("false");
        //     // echo "Contraseña incorrecta";
        // }
    
      } catch (PDOException $e) {
        exit("Connection failed: " . $e->getMessage());
    }
        
 ?>