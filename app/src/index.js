const container = document.getElementById('container');
const signInEmail = document.getElementById('signInEmail');
const signUpEmail = document.getElementById('signUpEmail');

function openSignIn() {
  container.classList.remove('right-panel-active');
  if (signUpEmail.value !== '') {
    signInEmail.value = signUpEmail.value;
  }
}

function openSignUp() {
  container.classList.add('right-panel-active');
  if (signInEmail.value !== '') {
    signUpEmail.value = signInEmail.value;
  }
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

  window.location.replace(
    'http://localhost/DateSim/app/src/profileSettings/profileSettings.html'
  );
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

  window.location.replace(
    'http://localhost/DateSim/app/src/profileSettings/profileSettings.html'
  );
}
