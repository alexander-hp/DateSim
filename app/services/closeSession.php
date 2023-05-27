<?php
  session_start();

  // Destruir la sesión y redirigir al formulario de inicio de sesión
  session_destroy();
  // header('Location: ');
  http_response_code(500);
  exit();
?>
