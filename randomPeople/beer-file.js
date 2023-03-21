const newBeers = new XMLHttpRequest();
const main = document.querySelector("main");
newBeers.open("GET", "https://api.punkapi.com/v2/beers/random");
newBeers.send();

const getRandomBeer = (obj) => {
  main.innerHTML = `
    <div class>
    <h3>Beer Name: ${obj[0].name}</h3>
    <figcaption>
    <p class="link">Click on the beer and go back to users <span> &#9755; </span></p>
    <img src="${obj[0].image_url}" alt="">
    </figcaption>
    <p>Alcohol: ${obj[0].abv}</p>
    <p>Goes with food: ${obj[0].food_pairing}</p>
    <p>Created year: ${obj[0].first_brewed}</p>
</div>`;
  const beerImg = document.querySelector("img");
  beerImg.addEventListener("click", () => {
    window.location.href = "index.html";
  });
};

newBeers.onload = () => {
  if (newBeers.status >= 200 && newBeers.status < 400) {
    const response = JSON.parse(newBeers.response);
    getRandomBeer(response);
    console.log(response);
  }
};
