<?php
session_start();

// Verificar si el usuario ha iniciado sesión
if (!isset($_SESSION['userName'])) {
    // El usuario no ha iniciado sesión, redirigir al formulario de inicio de sesión
    // header('Location: index.php');
    exit();
} else {

}

// Obtener el nombre de usuario de la sesión
$username = $_SESSION['userName'];
?>

<!DOCTYPE html>
<html>
<head>
    <title>Panel de control</title>
</head>
<body>
    <h1>Bienvenido, <?php echo $username; ?>!</h1>
    <p>Esto es el panel de control de la aplicación.</p>
    
    <a href="http://localhost/DateSim/app/src">Iniciar sesión</a>
    <a href="http://localhost/DateSim/app/src/profileSettings/profileSettings.html">Dashboard</a>
</body>
</html>
