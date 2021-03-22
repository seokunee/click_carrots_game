"use strict";

const playBtn = document.querySelector(".play");
const innerHeight = window.innerHeight;
const innerWidth = window.innerWidth;
const main = document.querySelector(".main");
const timer = document.querySelector(".time");
const manageBox = document.querySelector(".display__none");
const comment = document.querySelector(".restart__comment");
const counter = document.querySelector(".counter");
const restartBtn = document.querySelector(".restart__btn");

const carrotAudio = new Audio("./sound/carrot_pull.mp3");
const bugAudio = new Audio("./sound/bug_pull.mp3");
const bgm = new Audio("./sound/bg.mp3");
const winSound = new Audio("./sound/game_win.mp3");

let reduceTime;

function gameStart() {
  main.innerHTML = "";
  playBtn.className = "play";
  clearInterval(reduceTime);
  for (let i = 0; i < 10; i++) {
    makeItems("carrot");
  }
  for (let i = 0; i < 7; i++) {
    makeItems("bug");
  }
  counter.innerText = "10";
  playBtn.innerHTML = `<i class="fas fa-stop"></i>`;
  playBtn.removeEventListener("click", gameStart);
  playBtn.addEventListener("click", gameStop);
  startTimer();
}

function startTimer() {
  let second = 10;
  timer.innerText = `00:${second}`;
  reduceTime = setInterval(() => {
    second -= 1;
    timer.innerText = `00:0${second}`;
    if (second === 0) {
      displayFail();
    }
  }, 1000);
}

function makeItems(src) {
  const randomX = Math.random() * (innerWidth - 250) + 70;
  const randomY = Math.random() * (innerHeight * 0.4 - 90) + innerHeight * 0.55;
  const img = document.createElement("img");
  img.setAttribute("class", `item__${src} bigger`);
  img.setAttribute("src", `./img/${src}.png`);
  img.setAttribute("style", `top:${randomY}px; left:${randomX}px`);
  img.setAttribute("alt", `${src}`);
  main.appendChild(img);
}

function clearGame() {
  winSound.play();
  playBtn.className = "hidden";
  clearInterval(reduceTime);
  manageBox.className = "restart";
  comment.innerText = "YOU WIN!! 👍";
}

function displayFail() {
  clearInterval(reduceTime);
  playBtn.className = "hidden";
  manageBox.className = "restart";
  comment.innerText = "YOU LOST 😜";
}

function gameStop() {
  clearInterval(reduceTime);
  playBtn.className = "hidden";
  manageBox.className = "restart";
  comment.innerText = "Try again? 🤔";
}

function makeEventForItems(event) {
  const name = event.target.alt;
  if (name === "carrot") {
    carrotAudio.play();
    let nowCountNum = Number(counter.innerText);
    nowCountNum -= 1;
    counter.innerText = `${nowCountNum}`;
    event.target.remove();
    if (nowCountNum === 0) {
      clearGame();
    }
  }
  if (name === "bug") {
    bugAudio.play();
    displayFail();
  }
}

restartBtn.addEventListener("click", () => {
  manageBox.className = "display__none";
  gameStart();
});

bgm.play();

console.log(bgm);
bgm.addEventListener("ended", () => {
  bgm.play();
});

main.addEventListener("click", makeEventForItems);

playBtn.addEventListener("click", gameStart);
