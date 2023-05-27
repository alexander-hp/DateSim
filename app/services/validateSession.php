<?php
  session_start();
  // Verificar si el usuario ha iniciado sesión
  if (!isset($_SESSION['userName'])) {
      // El usuario no ha iniciado sesión, redirigir al formulario de inicio de sesión
      header('Location: http://localhost/DateSim/app/src');
      http_response_code(500);
      exit();
  } else {
    $servidor = "localhost";
    $username = "root";
    $password = "";
    $dbname = "datesim";
    $conexion = mysqli_connect ($servidor, $username, $password, $dbname) 
        or die ("No se puede conectar con el servidor");
    $email = $_SESSION['userEmail'];
    try {

      // ?Checar si ya esta registrado el correo en la BD
      $queryValidateUser = "SELECT * FROM users WHERE email = '".$email."' ";
      $statementValidateUser = mysqli_query($conexion, $queryValidateUser)
          or die(mysqli_error($conexion));
      // print_r($statement);
      $row = mysqli_fetch_array($statementValidateUser);
      // print_r($row);

      http_response_code(200);
      $jsonData = json_encode($row);
      header('Content-Type: application/json');
      echo($jsonData);

      $hashAlmacenado = $row[0]; // Hash almacenado en la base de datos
      // TODO if para ver si contrase;a es correcta
      // if (password_verify($password, $hashAlmacenado)) {
      //   $_SESSION["userName"] = $row[1];
      //   // print($row[1]);
      //   // $_SESSION["userEmail"] = $email;
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
  }

  // Obtener el nombre de usuario de la sesión
  $username = $_SESSION['userName'];
?>