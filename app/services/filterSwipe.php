<?php
    session_start();

    // print($GET);
    $servidor = "localhost";
    $username = "root";
    $password = "";
    $dbname = "datesim";
    $conexion = mysqli_connect ($servidor, $username, $password, $dbname) 
        or die ("No se puede conectar con el servidor");
    $email = $_GET['email'];
    $birthdate = $_GET['birthdate'];
    $city = $_GET['city'];
    $state = $_GET['state'];
    $country = $_GET['country'];
    $zip = $_GET['zip'];
    $gender = $_GET['gender'];
    $hobbies = $_GET['hobbies'];
    $lookingFor = $_GET['lookingFor'];
    $searchingByAge = $_GET['searchingByAge'];
    // print_r($_GET);
    try {
        // print_r($GET);
        // $queryGetUser = "SELECT birthdate, gender, hobbies, lookingFor, searchingByAge, city, country, state, zip FROM users WHERE email = 'hdezppalex@gmail.com' ";
        $users = array();
        $queryGetUser = "SELECT *, password 
            FROM users WHERE (city = '".$city."' OR country = '".$country."') 
            AND email <> '".$email."' AND gender = '".$lookingFor."';";

        $statementGetFilterUsers = mysqli_query($conexion, $queryGetUser)
            or die(mysqli_error($conexion));
        // $row = mysqli_fetch_array($statementGetFilterUsers);
        // print_r($row);
        while ($row = mysqli_fetch_assoc($statementGetFilterUsers)) {
            $users[] = $row;
        }

        $jsonData = json_encode($users);
        header('Content-Type: application/json');
        echo($jsonData);
        return $jsonData;
        http_response_code(200);
    
      } catch (PDOException $e) {
        exit("Connection failed: " . $e->getMessage());
    }
        
 ?>