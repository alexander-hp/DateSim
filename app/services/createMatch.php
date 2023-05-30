<?php
    session_start();

    // print($GET);
    $servidor = "localhost";
    $username = "root";
    $password = "";
    $dbname = "datesim";
    $conexion = mysqli_connect ($servidor, $username, $password, $dbname) 
        or die ("No se puede conectar con el servidor");
    $idUser = $_POST['idUser'];
    $idUserToMatch = $_POST['idUserToMatch'];
    $creationDate = $_POST['creationDate'];
    $result = $_POST['result'];
    // print_r($_POST);
    try {
        // print_r($GET);
        // $queryGetUser = "SELECT birthdate, gender, hobbies, lookingFor, searchingByAge, city, country, state, zip FROM users WHERE email = 'hdezppalex@gmail.com' ";
        $users = array();
        $queryGetUser = "INSERT INTO matches VALUES(null, '".$idUser."', '".$idUserToMatch."', '".$creationDate."', 'Pending')";
        print($queryGetUser);
        $statementGetFilterUsers = mysqli_query($conexion, $queryGetUser)
            or die(mysqli_error($conexion));
        $row = mysqli_fetch_array($statementGetFilterUsers);
        print_r($row);
        // while ($row = mysqli_fetch_assoc($statementGetFilterUsers)) {
        //     $users[] = $row;
        // }

        print_r($_POST);
        $jsonData = json_encode($row);
        header('Content-Type: application/json');
        echo($jsonData);
        return $jsonData;
        http_response_code(200);
    
      } catch (PDOException $e) {
        exit("Connection failed: " . $e->getMessage());
    }
        
 ?>