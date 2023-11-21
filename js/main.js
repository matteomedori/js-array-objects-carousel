"use strict";

/*
FUNCTIONS
*/

//funzione che va sulla prossima immagine
function nextImg() {
  allItems[counterActive].classList.remove("active");
  //rimuovo classe selected a aggiungo not-selected
  allThumbnailImages[counterActive].classList.remove("selected");
  allThumbnailImages[counterActive].classList.add("not-selected");
  if (counterActive < allItems.length - 1) {
    counterActive++;
  } else {
    counterActive = 0;
  }
  allItems[counterActive].classList.add("active");
  //rimuovo classe not-selected a aggiungo selected
  allThumbnailImages[counterActive].classList.add("selected");
  allThumbnailImages[counterActive].classList.remove("not-selected");
}

//funzione che va sulla precedente immagine
function prevImg() {
  allItems[counterActive].classList.remove("active");
  //rimuovo classe selected a aggiungo not-selected
  allThumbnailImages[counterActive].classList.remove("selected");
  allThumbnailImages[counterActive].classList.add("not-selected");
  if (counterActive > 0) {
    counterActive--;
  } else {
    counterActive = allItems.length - 1;
  }
  allItems[counterActive].classList.add("active");
  //rimuovo classe not-selected a aggiungo selected
  allThumbnailImages[counterActive].classList.add("selected");
  allThumbnailImages[counterActive].classList.remove("not-selected");
}

//funzione che gestisce il click sul thumbnail
function changeThumbImg(img, indexImg) {
  //faccio qualcosa solo se l'elemento non è gia selezionato
  if (img.classList.contains("not-selected")) {
    //seleziono elemento img in posizione counterActive ovvero quello attivo
    const imgSelected = allThumbnails[counterActive].querySelector("img");
    //aggiorno la classe dell'elemento
    imgSelected.classList.add("not-selected");
    imgSelected.classList.remove("selected");
    //aggiorno la classe dell'elemento su cui ho cliccato
    img.classList.add("selected");
    img.classList.remove("not-selected");
    //rimuovo classe active all'item attivo prima del click
    allItems[counterActive].classList.remove("active");
    //aggiorno counterActive
    counterActive = indexImg;
    //aggiungo classe active all'item relativo alla thumbnail su cui ho cliccato
    allItems[counterActive].classList.add("active");
  }
}

//funzione che aggiunge le immagini ad avvio programma
function addImg(element, index) {
  //per la prima immagine c'è anche la classe active e nell'immagine del thumbnail anche la classe selected
  if (index === 0) {
    //aggiungo un item
    items.innerHTML += `<div class="item active">
        <img src="./img/${element.imageURL}" alt="Immagine ${index + 1}" />
        <div class="title-description"><h2>${element.title}</h2>
        <p>${element.description}</p></div>
        </div>`;
    //aggiungo un thumbnail
    thumbnails.innerHTML += `<div class="thumbnail ">
        <img src="./img/${element.imageURL}" alt="Immagine ${
      index + 1
    }" class="selected" />
        </div>`;
  } else {
    items.innerHTML += `<div class="item">
        <img src="./img/${element.imageURL}" alt="Immagine ${index + 1}" />
        <div class="title-description"><h2>${element.title}</h2>
        <p>${element.description}</p></div>
        </div>`;
    thumbnails.innerHTML += `<div class="thumbnail ">
    <img src="./img/${element.imageURL}" alt="Immagine ${
      index + 1
    }" class="not-selected" />
    </div>`;
  }
}

/*
OPERATIONS
*/

const objects = [
  {
    imageURL: "01.jpg",
    title: "Immagine 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, facere perspiciatis autem praesentium",
  },
  {
    imageURL: "02.jpg",
    title: "Immagine 2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, facere perspiciatis autem praesentium",
  },
  {
    imageURL: "03.jpg",
    title: "Immagine 3",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, facere perspiciatis autem praesentium",
  },
  {
    imageURL: "04.jpg",
    title: "Immagine 4",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, facere perspiciatis autem praesentium",
  },
  {
    imageURL: "05.jpg",
    title: "Immagine 5",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, facere perspiciatis autem praesentium",
  },
];

//elemento html che dovrà contenere le immagini
const items = document.querySelector(".items");
//elemento html che dovrà contenere le thumbnails
const thumbnails = document.querySelector(".thumbnails");

objects.forEach((element, index) => {
  addImg(element, index);
});

//bottoni prev e next
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
//seleziono tutti gli item
const allItems = document.querySelectorAll(".item");
//seleziono tutti i thumbnail
const allThumbnailImages = document.querySelectorAll(".thumbnail > img");
// contatore che dice quale elemento ha classe active
let counterActive = 0;

//evento sul click di prev
prev.addEventListener("click", function () {
  prevImg();
});

//evento sul click di next
next.addEventListener("click", function () {
  nextImg();
});

//seleziono la lista di thumbnail
const allThumbnails = document.querySelectorAll(".thumbnail");

//per ogni thumbnail aggiungo l'evento al click
for (let i = 0; i < allThumbnails.length; i++) {
  allThumbnails[i].addEventListener("click", function () {
    //seleziono elemento img della thumbnail
    const img = allThumbnails[i].querySelector("img");
    changeThumbImg(img, i);
  });
}

//variabile che mi serve per interrompere l'autoplay
let timer;

const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const invertBtn = document.getElementById("invert");

startBtn.addEventListener("click", function () {
  clearInterval(timer);
  timer = setInterval(nextImg, 3_000);
});

stopBtn.addEventListener("click", function () {
  clearInterval(timer);
});

invertBtn.addEventListener("click", function () {
  clearInterval(timer);
  timer = setInterval(prevImg, 3_000);
});
