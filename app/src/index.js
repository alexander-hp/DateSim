const container = document.getElementById('container');
const signInEmail = document.getElementById('signInEmail');
const signUpEmail = document.getElementById('signUpEmail');

function openSignIn() {
  container.classList.remove('right-panel-active');
  if (signUpEmail.value !== '') {
    signInEmail.value = signUpEmail.value;
  }
}
// hOLA 

function openSignUp() {
  container.classList.add('right-panel-active');
  if (signInEmail.value !== '') {
    signUpEmail.value = signInEmail.value;
  }
}
