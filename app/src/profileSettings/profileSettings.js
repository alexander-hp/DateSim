// Example starter JavaScript for disabling form submissions if there are invalid fields
var showAvatars;
var myAvatar = document.getElementById('imgAvatar');
var currentAvatar = 'https://cdn-icons-png.flaticon.com/128/4086/4086652.png';
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
          realizarAccionesAdicionales();
        }
      },
      false
    );
  });
  function realizarAccionesAdicionales() {
    // debugger;
    // Aquí puedes agregar tu código para realizar acciones adicionales una vez que el formulario haya pasado la validación
    console.log(
      'El formulario ha pasado la validación. Realizando acciones adicionales...'
    );
    updateForm();
    // validateLocation();
  }
})();

function updateForm() {
  var parametros = {
    nameUser: nameUser,
    email: emailUser,
    birthdate: birthdateUser,
    gender: genderUser,
    description: descriptionUser,
    hobbies: hobbiesUser,
    lookingFor: lookingForUser,
    searchingByAgeUser: searchingByAgeUser,
    avatarUser: avatarUser,
    cityUser: cityUser,
    countryUser: countryUser,
    stateUser: stateUser,
    zipUser: zipUser,
  };
  console.log(parametros);

  $.ajax({
    data: parametros,
    url: '../../services/updateProfileSettings.php',
    type: 'POST',
    beforeSend: function () {
      $('#resultado').html('Procesando, espere por favor...');
    },
    success: function (response) {
      $('#resultado').html(response);
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
      fillForm('validationName', response.name);
      fillForm('validationBuscando', response.lookingFor);
      fillForm('validationGender', response.gender);
      fillForm('validationGender', response.description);
      $('#userNameHeader').html(response.name);
      emailUser = response.email;
      passwordUser = response.password;
      nameUser = response.name;
      birthdateUser = response.birthdate;
      genderUser = response.gender;
      descriptionUser = response.description;
      hobbiesUser = response.hobbies;
      lookingForUser = response.lookingFor;
      searchingByAgeUser = response.searchingByAge;
      avatarUser = response.avatar;
      cityUser = response.city;
      countryUser = response.country;
      stateUser = response.state;
      zipUser = response.zip;
      // selectAvatar(response.avatar);
      // var password = response.password;
      // password.toString();
      // console.log(password.toString());

      //? Poner avatar
      if (response.avatar != null && response.avatar != undefined) {
        myAvatar.src = urlAvatar;
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
      $('#respuestaBD').html('Session no encontrada');
      window.location.replace('http://localhost/DateSim/app/src');
      console.log('Session no encontrada');
    },
  });
}

function fillForm(idInput, inputValue) {
  if (inputValue != null || inputValue != undefined) {
    console.log(idInput, inputValue);
    document.getElementById(idInput).value = inputValue;
  } else {
    console.log(idInput, inputValue);
    document.getElementById(idInput).value = '';
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
