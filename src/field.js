"use strict";

import * as Sound from "./sound.js";

const itemtype = Object.freeze({
  carrot: "carrot",
  bug: "bug",
});
// string은 많이 쓰면 실수할 수 있기 때문에 따로 타입을 저장해준다!

export default class Field {
  constructor(carrotNum, bugNum) {
    this.carrotNum = carrotNum;
    this.bugNum = bugNum;
    this.counter = document.querySelector(".counter");

    this.gameField = document.querySelector(".game-field");
    this.innerHeight = window.innerHeight;
    this.innerWidth = window.innerWidth;

    this.gameField.addEventListener("click", (event) => {
      this.makeEventForItems(event);
    });
  }

  makeItems(src) {
    const randomX = Math.random() * (innerWidth - 250) + 70;
    const randomY =
      Math.random() * (innerHeight * 0.4 - 90) + innerHeight * 0.55;
    const img = document.createElement("img");
    img.setAttribute("class", `item__${src} bigger`);
    img.setAttribute("src", `./img/${src}.png`);
    img.setAttribute("style", `top:${randomY}px; left:${randomX}px`);
    img.setAttribute("alt", `${src}`);
    this.gameField.appendChild(img);
  }

  makeEventForItems(event) {
    const name = event.target.alt;
    if (name === itemtype.carrot) {
      Sound.playCarrot();
      let nowCountNum = Number(this.counter.innerText);
      nowCountNum -= 1;
      this.counter.innerText = `${nowCountNum}`;
      event.target.remove();
      if (nowCountNum === 0) {
        this.clearGame && this.clearGame();
      }
    }
    if (name === itemtype.bug) {
      Sound.playBug();
      this.displayFail && this.displayFail();
    }
  }

  setNeedFunctions(clearGame, displayFail) {
    this.clearGame = clearGame;
    this.displayFail = displayFail;
  }
}
