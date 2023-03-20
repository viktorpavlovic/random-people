"use strict";
const body = document.body;
const newXmlFemale = new XMLHttpRequest();
const newXmlMale = new XMLHttpRequest();

const main = document.querySelector("main");

const maleAndFemale = [];

function printCards(arr) {
  arr.forEach((element) => {
    console.log(element);
    const card = document.createElement("div");
    card.classList.add("cardStyle");
    card.innerHTML = `
    <img src="${element.picture.large}" alt="">
    <span class = "name-style">${element.name.first}</span>
    <div class = "wrapper-text">
    <p class="text"> E-mail: ${element.email}</p>
    <p class="text"> Age: ${element.dob.age} </p>
    </div>
  `;
    main.append(card);
    card.addEventListener("click", () => {
      const modal = document.createElement("div");
      modal.classList.add("modalWrap");
      body.prepend(modal);
    });
  });
}

function fetchMale() {
  newXmlMale.open("GET", `https://randomuser.me/api/?gender=male&results=10`);
  newXmlMale.send();
  newXmlMale.onload = () => {
    if (newXmlMale.status >= 200 && newXmlMale.status < 400) {
      const response = JSON.parse(newXmlMale.response);
      maleAndFemale.push(...response.results);
    }
  };
}

function fetchFemale() {
  newXmlFemale.open(
    "GET",
    `https://randomuser.me/api/?gender=female&results=10`
  );
  newXmlFemale.send();
  newXmlFemale.onload = () => {
    if (newXmlFemale.status >= 200 && newXmlFemale.status < 400) {
      const response = JSON.parse(newXmlFemale.response);
      maleAndFemale.push(...response.results);
      printCards(maleAndFemale);
    }
  };
}

setTimeout(fetchMale, 0);
setTimeout(fetchFemale, 100);
