// Example starter JavaScript for disabling form submissions if there are invalid fields
var showAvatars;
var myAvatar = document.getElementById('imgAvatar');
var currentAvatar = 'https://cdn-icons-png.flaticon.com/128/4086/4086652.png';
document.getElementById('selectAvatar').style.display = 'none';
(() => {
  'use profileSettings.html';

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation');

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      'submit',
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add('was-validated');
      },
      false
    );
  });
})();

function swipe() {
  window.location.href = 'http://localhost/DateSim/app/src/swipe/swipe.html';
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
