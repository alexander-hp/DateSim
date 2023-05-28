const container = document.getElementById('container');
const signInEmail = document.getElementById('signInEmail');
const signUpEmail = document.getElementById('signUpEmail');

function openSignIn() {
  container.classList.remove('right-panel-active');
  $('#respuestaBD').html('');
  if (signUpEmail.value !== '') {
    signInEmail.value = signUpEmail.value;
  }
}

function openSignUp() {
  container.classList.add('right-panel-active');
  $('#respuestaBD').html('');
  if (signInEmail.value !== '') {
    signUpEmail.value = signInEmail.value;
  }
}

function validateSignInBD(email, password) {
  var parametros = {
    email: email,
    password: password,
  };

  $.ajax({
    type: 'POST',
    url: '../services/signin.php',
    data: parametros,
    beforeSend: function () {
      $('#respuestaBD').html('Procesando, espere por favor...');
    },
    success: function (response) {
      // var jsonResponse = JSON.parse(response);
      // console.log(jsonResponse);
      console.log(response);
      $('#respuestaBD').html(response);
      if (response == 'true') {
        // Convertir el objeto JSON en una cadena
        const jsonUsuario = JSON.stringify(parametros);

        // Guardar la cadena en el localStorage con la clave "usuario"
        localStorage.setItem('usuario', jsonUsuario);
        window.location.replace(
          'http://localhost/DateSim/app/src/profileSettings/profileSettings.html'
        );
      } else {
        console.log('Contraseña o correo invalido');
      }
    },
    error: function (error) {
      $('#respuestaBD').html('Contraseña o correo invalido');
      console.log('Contraseña o correo invalido');
    },
  });
}

function validateFormSignIn() {
  var emailSignIn = document.getElementById('signInEmail');
  var passwordSignIn = document.getElementById('signInPss');

  if (emailSignIn.value.length == 0) {
    console.log(emailSignIn.value);
    emailSignIn.focus();
    alert('Porfavor rellena el campo Email');
    return false;
  }

  if (passwordSignIn.value.length == 0) {
    passwordSignIn.focus();
    alert('Porfavor rellena el campo Password');
    return false;
  }

  validateSignInBD(emailSignIn.value, passwordSignIn.value);
  // window.location.replace(
  //   'http://localhost/DateSim/app/src/profileSettings/profileSettings.html'
  // );
}

function createUserBD(name, email, password, birthdate) {
  var parametros = {
    name: name,
    email: email,
    password: password,
    birthdate: birthdate,
  };

  $.ajax({
    type: 'POST',
    url: '../services/signup.php',
    data: parametros,
    beforeSend: function () {
      $('#respuestaBD').html('Procesando, espere por favor...');
    },
    success: function (response) {
      // var jsonResponse = JSON.parse(response);
      // console.log(jsonResponse);
      console.log(response);
      $('#respuestaBD').html(response);
      if (response == 'true') {
        window.location.replace(
          'http://localhost/DateSim/app/src/profileSettings/profileSettings.html'
        );
      } else {
        console.log('No dejar pasar');
      }
    },
    error: function (error) {
      $('#respuestaBD').html('Correo ya existente');
      console.log('Correo ya existente');
    },
  });
}

function validateFormSign() {
  var nameSignUp = document.getElementById('signUpName');
  var BirthdateSignUp = document.getElementById('signUpBirthdate');
  var passwordSignUp = document.getElementById('signUpPass');
  var emailSignUp = document.getElementById('signUpEmail');

  if (emailSignUp.value.length == 0) {
    console.log(emailSignUp.value);
    emailSignUp.focus();
    alert('Porfavor rellena el campo Email');
    return false;
  }

  if (passwordSignUp.value.length == 0) {
    passwordSignUp.focus();
    alert('Porfavor rellena el campo Password');
    return false;
  }

  if (nameSignUp.value.length == 0) {
    nameSignUp.focus();
    alert('Porfavor rellena el campo name');
    return false;
  }

  if (BirthdateSignUp.value.length == 0) {
    BirthdateSignUp.focus();
    alert('Porfavor rellena el campo de edad');
    return false;
  }

  createUserBD(
    nameSignUp.value,
    emailSignUp.value,
    passwordSignUp.value,
    BirthdateSignUp.value
  );
  // window.location.replace(
  //   'http://localhost/DateSim/app/src/profileSettings/profileSettings.html'
  // );
}
