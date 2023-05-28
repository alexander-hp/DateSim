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
  
    } catch (PDOException $e) {
      exit("Connection failed: " . $e->getMessage());
  }
  }

  // Obtener el nombre de usuario de la sesión
  $username = $_SESSION['userName'];
?>