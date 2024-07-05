let navLink = document.querySelectorAll(".nav-link");
let btnClose = document.querySelector(".btn-close");
let row = document.querySelector(".row");
let mainSection = document.querySelector("main .container");

// for display game details
let detailsWindow = document.querySelector(".details-window");
let gamePic = document.querySelector(".details-window img");
let gameSpanArray = document.querySelectorAll(".game-info span"); // 4 [id - title - platform - status]
let gameDescription = document.querySelector(".game-description");
let gameLink = document.querySelector(".game-info a");

let menuBars = document.querySelector("nav .container>img");
let navList = document.querySelector("nav .container>ul");
let loader = document.querySelector(".loader-box");
console.log(loader);
let url;

menuBars.addEventListener("click", () => {
    console.log("clicked");
  navList.classList.toggle("small-list");
});



async function main() {
  url = "https://free-to-play-games-database.p.rapidapi.com/api/games";
  const mydata = await fetchAll(url);
  new UiGames(mydata);
  loader.style.display="none";
  cardClick();
}

// active-nav-link
navLink.forEach((nlink) => {
  nlink.addEventListener("click", async (e) => {
    row.innerHTML = "";
    navLink.forEach((dLink) => {
      dLink.classList.remove("active-link");
    });
    e.target.classList.add("active-link");
    let category = e.target.innerHTML;
    url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
    const mydata = await fetchAll(url);
    new UiGames(mydata);
    loader.style.display="none";
    cardClick();
  });
});

async function fetchAll(url) {
    loader.style.display="flex";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "b796a7fb1cmshdf42fd9e87c113fp1b8e41jsn8a77efd552e1",
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

//display ui games list &by category
class UiGames {
  constructor(allData) {
    for (let game of allData) {
      this.createDiv(game);
    }
  }
  createDiv(gameData) {
    let newCard = document.createElement("div");
    newCard.innerHTML = `
<div class="">
<div class="game-card rounded-3 border" id="${gameData.id}">
<div class="card-body p-3">
        <img class="rounded-3 w-100" src="${gameData.thumbnail}" />
        <div class="card-description position-relative py-3">
            <h2 class="h5">${gameData.title}</h2>
            <span class="btn btn-info position-absolute"> Free</span>
            <p class="text-center">
            ${gameData.short_description}
            </p>
        </div>
    </div>

    <div class="card-footer border-top px-3 py-2">
        <span class="btn btn-dark">${gameData.genre}</span>
        <span class="btn btn-dark float-end">${gameData.platform}</span>
    </div>
</div>
</div>
      `;

    newCard.classList.add(
      "col-xxl-3",
      "col-xl-3",
      "col-lg-4",
      "col-md-6",
      "col-sm-12",
      "my-3"
    );
    row.appendChild(newCard);
  }
}

//display game details
class GameDetails {
  constructor(gameData) {
    this.id = gameData.id;
    this.displayDetailsDiv();
    this.fillDiv(gameData);
  }

  displayDetailsDiv() {
    detailsWindow.style.display = "block";
    mainSection.style.display = "none";
  }
  fillDiv(gameData) {
    gamePic.src = `${gameData.thumbnail}`;
    gameSpanArray[0].innerHTML = `${gameData.title}`;
    gameSpanArray[1].innerHTML = `${gameData.genre}`;
    gameSpanArray[2].innerHTML = `${gameData.platform}`;
    gameSpanArray[3].innerHTML = `${gameData.status}`;
    gameDescription.innerHTML = `${gameData.description}`;
    gameLink.href = `${gameData.game_url}`;
  }
}

// close details container
btnClose.addEventListener("click", () => {
  detailsWindow.style.display = "none";
  mainSection.style.display = "block";
});

// display details container
function cardClick() {
  let gameCards = document.querySelectorAll(".game-card");
  gameCards.forEach((card) => {
    card.addEventListener("click", async (e) => {
      let gameId = card.getAttribute("id");
      url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`;
      mydata = await fetchAll(url);
      new GameDetails(mydata);
      loader.style.display="none";
    });
  });
}


main();