var showAvatars = false;

function showSelectAvatar() {
  if (showAvatars) {
    document.getElementById('selectAvatar').style.display = 'block';
  } else {
    document.getElementById('selectAvatar').style.display = 'none';
  }
  showAvatars = !showAvatars;
}
