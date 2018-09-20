$("document").ready(function() {
  let battle = document.createElement("button");
  var t = document.createTextNode("Battle");
  $("button").click(function() {
    if (url1.value != "" && url2.value != "") {
      battle.className = "battleBtn btn-success animated bounceInUp slow";
      battle.appendChild(t);
      document.body.appendChild(battle);
    }
  });

  battle.onclick = go;
  async function go(e) {
    this.parentNode.removeChild(this);

    let name = url1.value;
    let githubResponse = await fetch(`https://api.github.com/users/${name}`);
    let githubUser = await githubResponse.json();

    //p1 star
    const getStar = await fetch(
      `https://api.github.com/search/repositories?q=user:${name}`
    );
    const getStarLoad = await getStar.json();

    //caculating total star in p1

    const starCount = getStarLoad.items.reduce((count, value) => {
      return count + value.stargazers_count;
    }, 0);

    //status
    const oneStatus =
      githubUser.followers * 2 +
      githubUser.public_repos -
      githubUser.following +
      starCount;

    const div = document.createElement("div");
    div.className = "player1 animated fadeInLeft";
    div.innerHTML =
      "Name : " +
      githubUser.name +
      "<br/>Followers : " +
      githubUser.followers +
      "<br/>Following : " +
      githubUser.following +
      "<br/>Repository : " +
      githubUser.public_repos +
      "<br/>Location : " +
      githubUser.location +
      "<br/><b style='font-size:20px;'>Score : </b>" +
      `<b  style='font-size:20px;'>${oneStatus}</b>`;

    document.body.append(div);
    //player2info
    let name2 = url2.value;
    let githubResponse2 = await fetch(`https://api.github.com/users/${name2}`);
    let githubUser2 = await githubResponse2.json();
    const div2 = document.createElement("div");
    //p2 star

    const getStar2 = await fetch(
      `https://api.github.com/search/repositories?q=user:${name2}`
    );
    const getStarLoad2 = await getStar2.json();
    const starCount2 = getStarLoad2.items.reduce((count, value) => {
      return count + value.stargazers_count;
    }, 0);
    const twoStatus =
      githubUser2.followers * 2 +
      githubUser2.public_repos -
      githubUser2.following +
      starCount2;

    div2.className = "player2 animated fadeInRight";
    div2.innerHTML =
      "Name : " +
      githubUser2.name +
      "<br/>Followers : " +
      githubUser2.followers +
      "<br/>Following : " +
      githubUser2.following +
      "<br/>Repository : " +
      githubUser2.public_repos +
      "<br/>Location : " +
      githubUser2.location +
      "<br/><b style='font-size:20px;'>Score : </b>" +
      `<b  style='font-size:20px;'>${twoStatus}</b>`;

    document.body.append(div2);

    const winner = document.createElement("h3");
    if (oneStatus > twoStatus) {
      setTimeout(ray, 2000);
      function ray() {
        winner.className = "win1";
        winner.innerHTML = `<strong><span class='animated infinite flash'>Winner</span> <span style ='color:red;'>Loser</span></strong>`;
        document.body.appendChild(winner);
      }
    } else if (oneStatus == twoStatus) {
      setTimeout(draw, 2000);
      function draw() {
        winner.className = "win2";
        winner.innerHTML = `<strong>Draw</strong>`;
        document.body.appendChild(winner);
      }
    } else {
      setTimeout(say, 2000);

      function say() {
        winner.className = "win1";
        winner.innerHTML = `<strong><span style ='color: red;'>Loser</span> <span style ='color:green;' class='animated infinite flash'>Winner</span></strong>`;
        document.body.appendChild(winner);
      }
    }
  }
});
