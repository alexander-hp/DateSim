// Example starter JavaScript for disabling form submissions if there are invalid fields
var showAvatars;
var myAvatar = document.getElementById('imgAvatar');
var currentAvatar;
var jsonResponseForm;

var nameUser;
var emailUser;
var passwordUser;
var birthdateUser;
var genderUser;
var descriptionUser;
var hobbiesUser;
var lookingForUser;
var searchingByAgeUser;
var avatarUser;
var cityUser;
var countryUser;
var stateUser;
var zipUser;

document.getElementById('selectAvatar').style.display = 'none';

var paisForm = document.getElementById('validationPais');
var estadioForm = document.getElementById('validationEstado');
var ciudadForm = document.getElementById('validationCiudad');
var zipForm = document.getElementById('validationZIP');

(() => {
  'use profileSettings.html';

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation');

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      'submit',
      (event) => {
        event.preventDefault();
        if (!form.checkValidity()) {
          event.stopPropagation();
          // debugger;
        }

        form.classList.add('was-validated');

        if (form.checkValidity()) {
          // Lógica adicional después de que el formulario haya pasado la validación
          updateForm();
          // realizarAccionesAdicionales();
        }
      },
      false
    );
  });
})();

function updateForm() {
  var parametros = {
    nameUser: document.getElementById('validationName').value,
    emailUser: emailUser,
    birthdate: document.getElementById('validationBirthdate').value,
    gender: document.getElementById('validationGender').value,
    description: document.getElementById('validationDescription').value,
    hobbies: document.getElementById('validationHobbies').value,
    lookingFor: document.getElementById('validationBuscando').value,
    searchingByAgeUser: document.getElementById('validationEdad1').value,
    avatarUser: document.getElementById('imgAvatar').value,
    avatarUser: myAvatar.src,
    cityUser: document.getElementById('validationCiudad').value,
    countryUser: document.getElementById('validationPais').value,
    stateUser: document.getElementById('validationEstado').value,
    zipUser: document.getElementById('validationZip').value,
  };
  // console.log(document.getElementById('validationName').value);
  console.log(parametros);

  $.ajax({
    type: 'POST',
    url: '../../services/updateProfileSettings.php',
    data: parametros,
    // dataType: 'json',
    beforeSend: function () {
      $('#respuestaBD').html('Procesando, espere por favor...');
    },
    success: function (response) {
      $('#respuestaBD').html(response);
      console.table(response);
    },
    error: function (error) {
      $('#respuestaBD').html(error);
      // window.location.replace('http://localhost/DateSim/app/src');
      console.log('Location no encontrada');
    },
  });
}

// function validateLocation() {
//   var parametros = {
//     country: paisForm.value,
//     state: estadioForm.value,
//     city: ciudadForm.value,
//     zip: zipForm.value,
//     email: emailUser,
//   };
//   console.log(emailUser);
//   console.log(paisForm.value);

//   $.ajax({
//     type: 'POST',
//     url: '../../services/location.php',
//     data: parametros,
//     // dataType: 'json',
//     beforeSend: function () {
//       $('#respuestaBD').html('Procesando, espere por favor...');
//     },
//     success: function (response) {
//       $('#respuestaBD').html(response);
//       console.table(response);
//     },
//     error: function (error) {
//       $('#respuestaBD').html(error);
//       // window.location.replace('http://localhost/DateSim/app/src');
//       console.log('Location no encontrada');
//     },
//   });
//   // debugger;
// }

function validateSession() {
  $.ajax({
    type: 'GET',
    url: '../../services/validateSession.php',
    dataType: 'json',
    beforeSend: function () {
      $('#respuestaBD').html('Procesando, espere por favor...');
    },
    success: function (response) {
      console.table(response);
      // fillForm('validationName', response.name);
      // console.log(fillForm('validationName', response.name));
      $('#userNameHeader').html(response.name);
      emailUser = response.email;
      nameUser = fillForm('validationName', response.name);
      // || $('#validationName').value();
      birthdateUser = response.birthdate;
      // || $('#validationBirthdate').value();
      genderUser = fillForm('validationGender', response.gender);
      // || $('#validationGender').value();
      descriptionUser = fillForm('validationDescription', response.description);
      // || $('#validationDescription').value();
      hobbiesUser = fillForm('validationHobbies', response.hobbies);
      // || $('#validationhobbies').value();
      lookingForUser = fillForm('validationBuscando', response.lookingFor);
      // || $('#validationBuscando').value();
      searchingByAgeUser = fillForm('validationEdad1', response.searchingByAge);
      // || $('#validationsearchingByAge').value();
      avatarUser = response.avatar;
      // || $('#validationavatar').value();
      cityUser = fillForm('validationCiudad', response.city);
      // || $('#validationCiudad').value();
      countryUser = fillForm('validationPais', response.country);
      // || $('#validationPais').value();
      stateUser = fillForm('validationEstado', response.state);
      // || $('#validationEstado').value();
      zipUser = fillForm('validationZip', response.zip);
      // document.getElementById('imgAvatar').value = currentAvatar;
      // || $('#validationZip').value();
      // selectAvatar(response.avatar);
      // var password = response.password;
      // password.toString();
      // console.log(password.toString());

      //? Poner avatar
      if (response.avatar != null && response.avatar != undefined) {
        myAvatar.src = response.avatar;
      }
      //? FIN Poner avatar

      // ?Poner fecha
      window.onload = function () {
        var dateInput = document.getElementById('validationBirthdate');
        dateInput.setAttribute('value', response.birthdate);
      };
      // ? fin poner fecha
    },
    error: function (error) {
      $('#respuestaBD').html(error);
      debugger;
      window.location.replace('http://localhost/DateSim/app/src');
      console.log('Session no encontrada');
    },
  });
}

function fillForm(idInput, inputValue) {
  if (inputValue != null || inputValue != undefined) {
    // console.log(idInput, inputValue);
    document.getElementById(idInput).value = inputValue;
    return inputValue;
  } else {
    // console.log(idInput, inputValue);
    document.getElementById(idInput).value = '';
    return '';
  }
}

function swipe() {
  window.location.href = 'http://localhost/DateSim/app/src/swipe/swipe.html';
}

function closeSession() {
  $.ajax({
    type: 'POST',
    url: '../../services/closeSession.php',
    beforeSend: function () {
      $('#respuestaBD').html('Procesando, espere por favor...');
    },
    success: function (response) {
      // var jsonResponse = JSON.parse(response);
      // console.log(jsonResponse);
      console.log(response);
    },
    error: function (error) {
      $('#respuestaBD').html('Session cerrada');
      window.location.replace('http://localhost/DateSim/app/src');
      console.log('Session cerrada');
    },
  });
}

function showSelectAvatar() {
  showAvatars = !showAvatars;
  if (showAvatars) {
    document.getElementById('selectAvatar').style.display = 'block';
    location.href = '#selectAvatar';
  } else {
    document.getElementById('selectAvatar').style.display = 'none';
  }
}

function selectAvatar(urlAvatar) {
  console.log(urlAvatar);
  myAvatar.src = urlAvatar;
  document.getElementById('selectAvatar').style.display = 'none';
}

validateSession();
