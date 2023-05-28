const likeButton = document.getElementById('like');
const passButton = document.getElementById('pass');
const container = document.getElementById('container');
const likecounter = document.getElementById('likecounter');
const passcounter = document.getElementById('passcounter');

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

let likecount = 0;
let passcount = 0;

let running = false;

likecounter.innerHTML = 0;
passcounter.innerHTML = 0;

function getFilterSwipe() {
  $.ajax({
    type: 'GET',
    url: '../../services/filterSwipe.php',
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
      emailUser = response.email;
      nameUser = fillForm('validationName', response.name);
      birthdateUser = response.birthdate;
      genderUser = fillForm('validationGender', response.gender);
      descriptionUser = fillForm('validationDescription', response.description);
      hobbiesUser = fillForm('validationHobbies', response.hobbies);
      lookingForUser = fillForm('validationBuscando', response.lookingFor);
      searchingByAgeUser = fillForm('validationEdad1', response.searchingByAge);
      avatarUser = response.avatar;
      cityUser = fillForm('validationCiudad', response.city);
      countryUser = fillForm('validationPais', response.country);
      stateUser = fillForm('validationEstado', response.state);
      zipUser = fillForm('validationZip', response.zip);

      // ?Poner fecha
      // window.onload = function () {
      //   var dateInput = document.getElementById('validationBirthdate');
      //   dateInput.setAttribute('value', response.birthdate);
      // };
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

function redirigir() {
  window.location.href =
    'http://localhost/DateSim/app/src/profileSettings/profileSettings.html#';
}

getFilterSwipe();

const profiles = [];

// could have randomised users but made my own list, got a bit carried away. A few references to famous people.
const user1 = {
  gender: 'Female',
  name: 'Sarah',
  age: '21',
  location: 'London',
  pic: '👩',
};

const user2 = {
  gender: 'Female',
  name: 'Emily',
  age: '35',
  location: 'Birmingham',
  pic: '👩‍🦱',
};

const user3 = {
  gender: 'Female',
  name: 'Jessica',
  age: '29',
  location: 'Cardiff',
  pic: '👩‍🦰',
};

const user4 = {
  gender: 'Female',
  name: 'Inga',
  age: '79',
  location: 'Manchester',
  pic: '👵',
};

const user5 = {
  gender: 'Male',
  name: 'Chad',
  age: '21',
  location: 'Coventry',
  pic: '👨',
};

const user6 = {
  gender: 'Male',
  name: 'Fred',
  age: '32',
  location: 'London',
  pic: '👨‍🦱',
};

const user7 = {
  gender: 'Male',
  name: 'Jacob',
  age: '82',
  location: 'Devon',
  pic: '👴',
};

const user8 = {
  gender: 'Male',
  name: 'Steve',
  age: '41',
  location: 'Margate',
  pic: '👨‍🦲',
};

const user9 = {
  gender: 'Non-Gender',
  name: 'Xanax',
  age: '9856',
  location: 'Mars',
  pic: '👽',
};

const user10 = {
  gender: 'Non-Gender',
  name: 'Ironhead',
  age: '786',
  location: 'Earth',
  pic: '🤖',
};

const user11 = {
  gender: 'Non-Gender',
  name: 'Zovanor',
  age: '666',
  location: 'Earth',
  pic: '👹',
};

const user12 = {
  gender: 'Non-Gender',
  name: 'Caspar',
  age: '18',
  location: 'Earth',
  pic: '👻',
};

const user13 = {
  gender: 'Non-Gender',
  name: 'Spacey',
  age: '45',
  location: 'Space',
  pic: '👾',
};

const user14 = {
  gender: 'Female',
  name: 'Katie',
  age: '35',
  location: 'Mayfair',
  pic: '👸',
};

const user15 = {
  gender: 'Female',
  name: 'Gal',
  age: '35',
  location: 'Mayfair',
  pic: '🦸‍♀️',
};

const user16 = {
  gender: 'Female',
  name: 'Betty',
  age: '65',
  location: 'North Pole',
  pic: '🤶',
};

const user17 = {
  gender: 'Female',
  name: 'Sandra',
  age: '25',
  location: 'Unknown',
  pic: '🦹‍♀️',
};

const user18 = {
  gender: 'Female',
  name: 'Gabrielle',
  age: '29',
  location: 'Utopia',
  pic: '🧙‍♀️',
};

const user19 = {
  gender: 'Female',
  name: 'Faith',
  age: '19',
  location: 'Neverland',
  pic: '🧚‍♀️',
};

const user20 = {
  gender: 'Female',
  name: 'Samantha',
  age: '39',
  location: 'Transylvania',
  pic: '🧛‍♀️',
};

const user21 = {
  gender: 'Female',
  name: 'Daryl',
  age: '60',
  location: 'Pacific Ocean',
  pic: '🧜‍♀️',
};

const user22 = {
  gender: 'Female',
  name: 'Tammy',
  age: '34',
  location: 'Epping Forest',
  pic: '🧝‍♀️',
};

const user23 = {
  gender: 'Female',
  name: 'Melina',
  age: '44',
  location: 'Sahara',
  pic: '🧞‍♀️',
};

const user24 = {
  gender: 'Female',
  name: 'Zelda',
  age: '54',
  location: 'Texas',
  pic: '🧟‍♀️',
};

const user25 = {
  gender: 'Female',
  name: 'Kelly',
  age: '34',
  location: 'Los Angeles',
  pic: '👮‍♀️',
};

const user26 = {
  gender: 'Female',
  name: 'Anne-Marie',
  age: '31',
  location: 'London',
  pic: '💂‍♀️',
};

const user27 = {
  gender: 'Female',
  name: 'Agatha',
  age: '39',
  location: 'Torquay',
  pic: '🕵️‍♀️',
};

const user28 = {
  gender: 'Male',
  name: 'Steven',
  age: '36',
  location: 'Panama',
  pic: '👨‍⚕️',
};

const user29 = {
  gender: 'Male',
  name: 'Richard',
  age: '18',
  location: 'New York',
  pic: '👨‍🎓',
};

const user30 = {
  gender: 'Male',
  name: 'Jack',
  age: '24',
  location: 'Tokyo',
  pic: '👨‍🏫',
};

const user31 = {
  gender: 'Male',
  name: 'Thomas',
  age: '64',
  location: 'Wellington',
  pic: '👨‍⚖️',
};

const user32 = {
  gender: 'Male',
  name: 'Jacob',
  age: '34',
  location: 'Ontario',
  pic: '👨‍🌾',
};

const user33 = {
  gender: 'Male',
  name: 'Sebastian',
  age: '22',
  location: 'Quebec',
  pic: '👨‍🔧',
};

const user34 = {
  gender: 'Male',
  name: 'Tom',
  age: '36',
  location: 'Belize',
  pic: '👨‍🍳',
};

const user35 = {
  gender: 'Male',
  name: 'Johnny',
  age: '31',
  location: 'Antigua',
  pic: '👨‍🏭',
};

const user36 = {
  gender: 'Male',
  name: 'Diego',
  age: '28',
  location: 'Rio',
  pic: '👨‍💼',
};

const user37 = {
  gender: 'Male',
  name: 'Ricardo',
  age: '30',
  location: 'San Salvador',
  pic: '👨‍🔬',
};

const user38 = {
  gender: 'Male',
  name: 'Bill',
  age: '65',
  location: 'Medina',
  pic: '👨‍💻',
};

const user39 = {
  gender: 'Male',
  name: 'Ozzy',
  age: '72',
  location: 'Hidden Hills',
  pic: '👨‍🎤',
};

const user40 = {
  gender: 'Male',
  name: 'Pablo',
  age: '91',
  location: 'Malaga',
  pic: '👨‍🎨',
};

const user41 = {
  gender: 'Male',
  name: 'Sully',
  age: '70',
  location: 'Hudson river',
  pic: '👨‍✈️',
};

const user42 = {
  gender: 'Male',
  name: 'Buzz',
  age: '91',
  location: 'New Jersey',
  pic: '👨‍🚀',
};

const user43 = {
  gender: 'Male',
  name: 'Mike',
  age: '23',
  location: 'Boston',
  pic: '👨‍🚒',
};

const user44 = {
  gender: 'Non-Gender',
  name: 'Cutie',
  age: '999',
  location: 'Down under',
  pic: '💀',
};

const user45 = {
  gender: 'Non-Gender',
  name: 'Beautiful',
  age: '66',
  location: 'Local park',
  pic: '💩',
};

const user46 = {
  gender: 'Non-Gender',
  name: 'Speedy',
  age: '19',
  location: 'Route 66',
  pic: '🏎️',
};

const user47 = {
  gender: 'Non-Gender',
  name: 'Stoppy',
  age: '29',
  location: 'Street corner',
  pic: '🚏',
};

const user48 = {
  gender: 'Non-Gender',
  name: 'Rocky',
  age: '500',
  location: 'Easter Island',
  pic: '🗿',
};

const user49 = {
  gender: 'Non-Gender',
  name: 'Jamie',
  age: '18',
  location: 'Pantry',
  pic: '🍯',
};

const user50 = {
  gender: 'Non-Gender',
  name: 'Squirty',
  age: '21',
  location: 'Hawaii',
  pic: '🔫',
};

profiles.push(
  user1,
  user2,
  user3,
  user4,
  user5,
  user6,
  user7,
  user8,
  user9,
  user10,
  user11,
  user12,
  user13,
  user14,
  user15,
  user16,
  user17,
  user18,
  user19,
  user20,
  user21,
  user22,
  user23,
  user24,
  user25,
  user26,
  user27,
  user28,
  user29,
  user30,
  user31,
  user32,
  user33,
  user34,
  user35,
  user36,
  user37,
  user38,
  user39,
  user40,
  user41,
  user42,
  user43,
  user44,
  user45,
  user46,
  user47,
  user48,
  user49,
  user50
);

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

  pic.innerHTML = filterProfiles[r].pic;
}

// display a profile on page loading
window.onload = function () {
  addProfile();
};

// filters the array based on gender passed
function filterItems(arr, query) {
  return arr.filter(function (el) {
    return el.gender == query;
  });
}

// enables the profile to be draggable using GSAP Draggable.
function swipe() {
  Draggable.create('#profile', {
    throwProps: true,
    onDrag: checkPosition,
    onDragEnd: function (endX) {
      if (Math.round(this.endX) > 0) {
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

  // the tricky bit of inserting the profile into the HTML..in JQUERY this is done with 'prepend' but I do it with insertAdjacentHTML, basically it inserts the profile class directly at the start of the content class.
  content.insertAdjacentHTML(
    'afterbegin',
    "<div class='profile' id='profile'><div class='profile-header'><div class='profile-wording' id='wording'>" +
      filterProfiles[r].name +
      ' ' +
      filterProfiles[r].age +
      ' • ' +
      filterProfiles[r].location +
      "&nbsp;&nbsp;&nbsp<span style='color:blue;cursor:pointer'>View Profile</span></div></div><div class='profile-photos'><div class='pic' id='pic'><div class='profile-cross' id='profile-cross'>X</div>" +
      filterProfiles[r].pic +
      "<div class='profile-heart' id='profile-heart'>🤍</div></div></div><div class='swipe-wording'>Drag and throw me!</div></div>"
  );
  const qmark = document.getElementById('qmark');
  qmark.style.opacity = 0;
  swipe(); // allow the inserted class to be draggable.
}
