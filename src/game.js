"ust strict";

import Field from "./field.js";
import * as Sound from "./sound.js";
import PopUp from "./popup.js";

// Builder을 사용하는 이유
// 인자를 많이 받아오는 class 경우 헷갈릴 수 있기 때문이다.
export default class GameBuilder {
  withGameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }

  withCarrotCount(num) {
    this.carrotNum = num;
    return this;
  }

  withBugCount(num) {
    this.bugNum = num;
    return this;
  }

  build() {
    return new Game(this.carrotNum, this.bugNum, this.gameDuration);
  }
}

// return을 해야하는 이유?
//

class Game {
  constructor(carrotNum, bugNum, timeSet) {
    this.carrotNum = carrotNum;
    this.bugNum = bugNum;
    this.timeSet = timeSet;
    this.playBtn = document.querySelector(".play");
    this.initComment = document.querySelector(".initial-comment");
    this.timer = document.querySelector(".time");
    this.timerControl = undefined;
    this.playBtn.addEventListener("click", this.start);

    this.gameFiledControler = new Field(this.carrotNum, this.bugNum);
    this.gameFiledControler.setNeedFunctions(this.clear, this.fail);

    this.gameFinishBanner = new PopUp();
    this.gameFinishBanner.setClickListener(() => {
      this.start();
    });
  }

  start = () => {
    this.init();

    for (let i = 0; i < this.carrotNum; i++) {
      this.gameFiledControler.makeItems("carrot");
    }
    for (let i = 0; i < this.bugNum; i++) {
      this.gameFiledControler.makeItems("bug");
    }

    this.gameFiledControler.counter.innerText = `${this.carrotNum}`;
    this.playBtn.innerHTML = `<i class="fas fa-stop"></i>`;
    this.playBtn.removeEventListener("click", this.start);
    this.playBtn.addEventListener("click", this.stop);
    this.startTimer();
  };

  stop = () => {
    this.end();
    Sound.playAlert();
    this.gameFinishBanner.message("Try again? 🤔");
  };

  init = () => {
    if (this.initComment.className === "initial-comment") {
      this.initComment.className = "display-none";
    }
    Sound.playBgm();
    this.gameFiledControler.gameField.innerHTML = "";
    this.playBtn.style.visibility = "visible";
    clearInterval(this.timerControl);
  };

  startTimer = () => {
    let second = this.timeSet;
    this.timer.innerText = `⏰ ${second}s`;
    this.timerControl = setInterval(() => {
      second -= 1;
      this.timer.innerText = `⏰ ${second}s`;
      if (second === 0) {
        this.fail();
      }
    }, 1000);
  };

  clear = () => {
    Sound.playWin();
    this.end();
    this.gameFinishBanner.message("YOU WIN!! 👍");
  };

  fail = () => {
    this.end();
    this.gameFinishBanner.message("YOU LOST 😜");
  };

  end() {
    Sound.stopBgm();
    clearInterval(this.timerControl);

    this.gameFiledControler.gameField.removeEventListener(
      "click",
      this.gameFiledControler.makeEventForItems
    );

    this.playBtn.style.visibility = "hidden";
    this.gameFinishBanner.show();
  }
}
