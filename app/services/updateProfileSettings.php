<?php
    if( !empty($_POST) )
    {
      if( isset($_POST['nameUser'])) 
        {
          // print($_POST);
          $servidor = "localhost";
          $username = "root";
          $password = "";
          $dbname = "conecta4php";          
          $conexion = mysqli_connect ($servidor, $username, $password, $dbname) 
              or die ("No se puede conectar con el servidor");

          // echo("'".$player."' '".$valorActualizar."' <br>");

          $nameUser = $_POST['nameUser']
          $emailUser = $_POST['emailUser']
          $birthdateUser = $_POST['birthdateUser']
          $genderUser = $_POST['genderUser']
          $descriptionUser = $_POST['descriptionUser']
          $hobbiesUser = $_POST['hobbiesUser']
          $lookingForUser = $_POST['lookingForUser']
          $searchingByAgeUser = $_POST['searchingByAgeUser']
          $avatarUser = $_POST['avatarUser']
          $cityUser = $_POST['cityUser']
          $countryUser = $_POST['countryUser']
          $stateUser = $_POST['stateUser']
          $zipUser = $_POST['zipUser']

          print_r($_POST);
          return $_POST;
          
          try {
            


            // $queryAddUser = "UPDATE jugador set JuegosGanados = 1, JuegosPerdidos = 2, JuegosEmpatados = 3 WHERE NombreJugador = '".$nombreJugador."' ";
            // echo($queryUpdate . "<br>" . $queryUpdate1 );
            // $statement = mysqli_query($conexion, $queryUpdate)
            //               or die(mysqli_error($conexion));
            // $statement = mysqli_query($conexion, $queryUpdate1)
            //               or die(mysqli_error($conexion));
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