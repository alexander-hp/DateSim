const likeButton = document.getElementById('like');
const passButton = document.getElementById('pass');
const container = document.getElementById('container');
const likecounter = document.getElementById('likecounter');
const passcounter = document.getElementById('passcounter');

var currentUser;

var idUser;
var emailUser;
var birthdateUser;
var genderUser;
var hobbiesUser;
var lookingForUser;
var searchingByAgeUser;
var cityUser;
var countryUser;
var stateUser;
var zipUser;

var usersToShow;

let likecount = 0;
let passcount = 0;

let running = false;

var profiles = [];

likecounter.innerHTML = 0;
passcounter.innerHTML = 0;

function validateSession() {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: '../../services/validateSession.php',
      dataType: 'json',
      beforeSend: function () {
        $('#respuestaBD').html('Procesando, espere por favor...');
      },
      success: function (response) {
        console.log(response);
        idUser = response.id;
        emailUser = response.email;
        nameUser = fillForm(response.name);
        birthdateUser = response.birthdate;
        genderUser = fillForm(response.gender);
        descriptionUser = fillForm(response.description);
        hobbiesUser = fillForm(response.hobbies);
        lookingForUser = fillForm(response.lookingFor);
        searchingByAgeUser = fillForm(response.searchingByAge);
        avatarUser = response.avatar;
        cityUser = fillForm(response.city);
        countryUser = fillForm(response.country);
        stateUser = fillForm(response.state);
        zipUser = fillForm(response.zip);
        console.log(emailUser);
        console.log(hobbiesUser);
        resolve();
      },
      error: function (error) {
        $('#respuestaBD').html(error);
        window.location.replace('http://localhost/DateSim/app/src');
        console.log('Session no encontrada');
        reject();
      },
    });
  });
}

function getFilterSwipe() {
  var parametros = {
    email: emailUser,
    birthdate: birthdateUser,
    avatar: avatarUser,
    city: cityUser,
    state: stateUser,
    country: countryUser,
    zip: zipUser,
    gender: genderUser,
    hobbies: hobbiesUser,
    lookingFor: lookingForUser,
    searchingByAge: searchingByAgeUser,
  };

  $.ajax({
    type: 'GET',
    url: '../../services/filterSwipe.php',
    dataType: 'json',
    data: parametros,
    beforeSend: function () {
      $('#respuestaBD').html('Procesando, espere por favor...');
    },
    success: function (response) {
      $('#respuestaBD').html(response);
      console.table(response);
      usersToShow = response;
      profiles.push(response);
      console.log('profiles.push(response) = ', profiles);
    },
    error: function (error) {
      $('#respuestaBD').html(error);
      console.log('Error filter = ', error);
      console.log('Location no encontrada');
    },
  });
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

function createMatch() {
  var fechaActual = new Date();

  // Obtener los componentes de la fecha
  var year = fechaActual.getFullYear();
  var month = ('0' + (fechaActual.getMonth() + 1)).slice(-2); // Agregar cero inicial si es necesario
  var day = ('0' + fechaActual.getDate()).slice(-2); // Agregar cero inicial si es necesario

  // Formatear la fecha en el formato deseado
  var fechaFormateada = year + '-' + month + '-' + day;
  var parametros = {
    idUser: idUser,
    idUserToMatch: currentUser.id,
    creationDate: fechaFormateada,
    result: 'pending',
  };

  $.ajax({
    type: 'POST',
    url: '../../services/createMatch.php',
    data: parametros,
    dataType: 'json',
    beforeSend: function () {
      $('#respuestaBD').html('Procesando, espere por favor...');
    },
    success: function (response) {
      // var jsonResponse = JSON.parse(response);
      // console.log(jsonResponse);
      console.log(response);
      // debugger;
    },
    error: function (error) {
      $('#respuestaBD').html('Session cerrada');
      // window.location.replace('http://localhost/DateSim/app/src');
      // console.log('Session cerrada');
      console.log('error CreateMatch: ', error);
      // debugger;
    },
  });
}

function fillForm(inputValue) {
  if (inputValue != null || inputValue != undefined) {
    return inputValue;
  } else {
    return '';
  }
}

function redirigir() {
  window.location.href =
    'http://localhost/DateSim/app/src/profileSettings/profileSettings.html#';
}

validateSession()
  .then(function () {
    getFilterSwipe();
    filterItems();
  })
  .catch(function (error) {
    console.log('hay un error', error);
  });

// when 'looking for' changed then update the profile

lfor.addEventListener('change', updateLookingfor);

// when like button clicked activate the swipe like
likeButton.addEventListener(
  'click',
  function (e) {
    if (running == false) {
      const heart = document.getElementById('profile-heart');
      heart.style.opacity = 0.5;
      running = true;
      swipeLike();
    }
  },
  false
);

// when pass button clicked activate the swipe pass
passButton.addEventListener(
  'click',
  function (e) {
    if (running == false) {
      const pass = document.getElementById('profile-cross');
      pass.style.opacity = 0.5;
      running = true;
      swipePass();
    }
  },
  false
);

// sets the profile to a random user based on the 'looking for'
function setProfile() {
  const lforv = document.getElementById('lfor').value;
  let filterProfiles = filterItems(profiles, lforv);
  const r = Math.floor(Math.random() * filterProfiles.length);
  wording.innerHTML = `${filterProfiles[r].name}  ${filterProfiles[r].age} • ${filterProfiles[r].location}&nbsp;&nbsp;&nbsp;<span style='color:blue;cursor:pointer'>View Profile</span>`;
  console.log(filterProfiles);
  pic.innerHTML = filterProfiles[r].pic;
}

// display a profile on page loading
window.onload = function () {
  addProfile();
};

// filters the array based on gender passed
function filterItems(arr, query) {
  console.log('Arr = ', arr);
  console.log('Query = ', query);
  var filteredArr = [];
  query = lookingForUser;
  arr.forEach(function (el) {
    el.forEach(function (item) {
      if (item.gender == query) {
        filteredArr.push(item);
      }
    });
  });
  return filteredArr;
}

// enables the profile to be draggable using GSAP Draggable.
function swipe() {
  Draggable.create('#profile', {
    throwProps: true,
    onDrag: checkPosition,
    onDragEnd: function (endX) {
      if (Math.round(this.endX) > 0) {
        console.log('checkposition = ', checkPosition);
        swipeLike(); // like if drag the right
      } else {
        swipePass(); // pass if drag to the left
      }
    },
  });
}

// checks drag position and hides/shows heart or cross depending
function checkPosition() {
  const heart = document.getElementById('profile-heart');
  const cross = document.getElementById('profile-cross');
  const qmark = document.getElementById('qmark');

  if (this.x > 0) {
    cross.style.opacity = 0;
    heart.style.opacity = 0.5;
    qmark.style.opacity = 0.5;
    heart.style.animationPlayState = 'running';
  }
  if (this.x < 0) {
    heart.style.opacity = 0;
    cross.style.opacity = 0.5;
    qmark.style.opacity = 0.5;
    cross.style.animationPlayState = 'running';
  }
}

// profile is liked so we move it and rotate it, then on complete it is removed from the HTML so it vanishes.
function swipeLike() {
  const profile = document.getElementById('profile');
  let tl = new gsap.timeline({
    repeat: 0,
    yoyo: false,
    repeatDelay: 0,
    onComplete: remove,
    onCompleteParams: [profile],
  });

  tl.to('#profile', 0.8, {
    x: '+=400',
    y: '+=350',
    rotation: '60',
    ease: Power1.easeInOut,
  });

  console.log('Le dio like');
  console.log('Profile = ', profile);
  createMatch();
  likecount++;
  likecounter.innerHTML = likecount;
}

// profile is passed so we move it and rotate it, then on complete it is removed from the HTML so it vanishes.
function swipePass() {
  const profile = document.getElementById('profile');
  let tl = new gsap.timeline({
    repeat: 0,
    yoyo: false,
    repeatDelay: 0,
    onComplete: remove,
    onCompleteParams: [profile],
  });

  tl.to('#profile', 0.8, {
    x: '-=400',
    y: '+=350',
    rotation: -60,
  });

  console.log('Se paso');
  passcount++;
  passcounter.innerHTML = passcount;
}

// after liking or passing this removes the profile from the HTML so it vanishes. Immediately after it is added back in to start again.
function remove(element) {
  element.parentNode.removeChild(element);
  running = false;
  addProfile();
}

// on changing the 'looking for' remove the existing profile and add a new one.
function updateLookingfor() {
  const profile = document.getElementById('profile');
  remove(profile);
  // reset the counters if we change the looking for
  likecount = 0;
  passcount = 0;
  likecounter.innerHTML = 0;
  passcounter.innerHTML = 0;
}

// add a new random profile to the HTML that matches the selected 'looking for'
function addProfile() {
  const lforv = document.getElementById('lfor').value;
  let filterProfiles = filterItems(profiles, lforv);
  const r = Math.floor(Math.random() * filterProfiles.length);
  const wording = document.getElementById('wording');
  console.log('filterProfiles = ', filterProfiles);
  console.log(`filterProfiles[r] ${r} =  `, filterProfiles[r]);
  // console.log(`filterProfiles[r].name = `, filterProfiles[r].name);
  // console.log(`filterProfiles[r].name = `, filterProfiles[r].avatar);
  currentUser = filterProfiles[r];
  console.log('currentUser : ', currentUser);

  // the tricky bit of inserting the profile into the HTML..in JQUERY this is done with 'prepend' but I do it with insertAdjacentHTML, basically it inserts the profile class directly at the start of the content class.
  content.insertAdjacentHTML(
    'afterbegin',
    "<div class='profile' id='profile'><div class='profile-header'><div class='profile-wording' id='wording'>" +
      filterProfiles[r].name +
      ' ' +
      filterProfiles[r].birthdate +
      ' • ' +
      filterProfiles[r].city +
      "&nbsp;&nbsp;&nbsp<span style='color:blue;cursor:pointer'>View Profile</span></div></div><div class='profile-photos'><div class='pic' id='pic' style='background-image: url(" +
      `" ${filterProfiles[r].avatar}"` +
      ");touch-action: none;width: auto;background-repeat: no-repeat;'>" +
      "<div class='profile-cross' id='profile-cross'>X</div>" +
      // filterProfiles[r].avatar +
      "<div class='profile-heart' id='profile-heart'>🤍</div></div></div><div class='swipe-wording'>Drag and throw me!</div></div>"
  );
  const qmark = document.getElementById('qmark');
  qmark.style.opacity = 0;
  swipe(); // allow the inserted class to be draggable.
}
