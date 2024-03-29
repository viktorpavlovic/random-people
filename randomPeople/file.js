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
      modal.innerHTML = `  
      <section class = "modalSection"> 
      <span>&#x2715</span>
      <div class="left">
      <img src="${element.picture.large}" alt="">
      <p class="modal-text">${element.name.first} ${element.name.last}</p>
    </div>
    <div class="right">
      <ul>
        <li>City: ${element.location.city}</li>
        <li>Country: ${element.location.country}</li>
        <li>Postcode: ${element.location.postcode}</li>
        <li>Phone Number: ${element.phone}</li>
        <li>Age: ${element.dob.age}</li>
      </ul>
      <button class = "favorite-beer">My beer today &#127866;</button>
    </div>
    <section>`;
      const goBack = document.querySelector(".modalSection span");
      modal.addEventListener("click", (e) => {
        body.removeChild(modal);
      });
      const modalSection = document.querySelector(".modalSection");
      modalSection.addEventListener("click", (e) => {
        e.stopImmediatePropagation();
      });
      goBack.addEventListener("click", () => {
        body.removeChild(modal);
      });
      document.addEventListener("keyup", (e) => {
        if (e.key === "Escape") {
          body.removeChild(modal);
        }
      });
      const beerBtn = document.querySelector(".favorite-beer");
      beerBtn.addEventListener("click", () => {
        window.location.href = "beer-page.html";
      });
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

const look = document.querySelector(".toggle-btn");

look.addEventListener("click", () => {
  if (sessionStorage.getItem("look") !== "list") {
    sessionStorage.setItem("look", "list");
    main.classList.add("list");
    look.textContent = "Map";
  } else {
    sessionStorage.setItem("look", "map");
    main.classList.remove("list");
    look.textContent = "List";
  }
});
window.addEventListener("load", () => {
  if (sessionStorage.getItem("look") === "map") {
    main.classList.remove("list");
    look.textContent = "List";
  } else {
    main.classList.add("list");
    look.textContent = "Map";
  }
});
