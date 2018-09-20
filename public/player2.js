//player2
"use strict";
async function showAvatar2() {
  // read github user
  if (url2.value == "") {
    alert("username must be filled out");
    return false;
  }
  let name = url2.value;
  let githubResponse = await fetch(`https://api.github.com/users/${name}`);
  let githubUser = await githubResponse.json();
  if (githubResponse.status == 404) {
    alert("Username doesn't exist");
    $(".btn2,#url2").show();
    url2.value = "";
  } else {
    // show the avatar
    let img = document.createElement("img");
    img.src = githubUser.avatar_url;
    img.className = "img2";
    document.body.append(img);
  }
}
$(document).ready(function() {
  $(".btn2").click(function() {
    if (url2.value != "") {
      $(".btn2,#url2").hide();
    }
  });
});
