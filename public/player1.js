"use strict";
async function showAvatar() {
  // read github user
  if (url1.value == "") {
    alert("username must be filled out");
    return false;
  }
  let name = url1.value;

  let githubResponse = await fetch(`https://api.github.com/users/${name}`);
  let githubUser = await githubResponse.json();
  if (githubResponse.status == 404) {
    alert("Username doesn't exist");
    $(".btn1,#url1").show();
    url1.value = "";
  } else {
    // show the avatar
    let img = document.createElement("img");
    img.src = githubUser.avatar_url;
    img.className = "img1";
    document.body.append(img);
  }
}
$(document).ready(function() {
  $(".btn1").click(function() {
    if (url1.value != "") {
      $(".btn1,#url1").hide();
    }
  });
});
