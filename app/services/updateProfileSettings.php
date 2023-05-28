<?php
    if( !empty($_POST) )
    {
      if( isset($_POST['nameUser'])) 
        {
          // print($_POST);
          $servidor = "localhost";
          $username = "root";
          $password = "";
          $dbname = "datesim";          
          $conexion = mysqli_connect ($servidor, $username, $password, $dbname) 
              or die ("No se puede conectar con el servidor");

          // echo("'".$player."' '".$valorActualizar."' <br>");

          $nameUser = $_POST['nameUser'];
          $emailUser = $_POST['emailUser'];
          $birthdateUser = $_POST['birthdate'];
          $genderUser = $_POST['gender'];
          $descriptionUser = $_POST['description'];
          $hobbiesUser = $_POST['hobbies'];
          $lookingForUser = $_POST['lookingFor'];
          $searchingByAgeUser = $_POST['searchingByAgeUser'];
          $avatarUser = $_POST['avatarUser'];
          $cityUser = $_POST['cityUser'];
          $countryUser = $_POST['countryUser'];
          $stateUser = $_POST['stateUser'];
          $zipUser = $_POST['zipUser'];

          print_r($_POST);
          // return $_POST;
          
          try {
            $queryUpdateUser = "UPDATE users set 
                                name = '".$nameUser."',
                                birthdate ='".$birthdateUser."',
                                hobbies ='".$hobbiesUser."',
                                gender ='".$genderUser."',
                                description ='".$descriptionUser."',
                                lookingFor ='".$lookingForUser."',
                                searchingByAge ='".$searchingByAgeUser."',
                                avatar ='".$avatarUser."',
                                city ='".$cityUser."',
                                country ='".$countryUser."',
                                state ='".$stateUser."',
                                zip ='".$zipUser."'
                                WHERE email = '".$emailUser."';";
            echo($queryUpdateUser );

            $statement = mysqli_query($conexion, $queryUpdateUser)
                          or die(mysqli_error($conexion));
                          print($statement);
                          $row = mysqli_fetch_array($statement);
                          print_r($row);
            http_response_code(204);
            return $row;
          } catch (Exception $e) {
              echo 'Excepcion capturada: ', $e ->getMessage(), "\n";
          }
            
        }
        else
        {
            echo "Introduzca todos los datos requeridos";
        }
        echo "<hr/>";
    }
    else{
        echo "formulario no recibido!!";
    }
 ?>