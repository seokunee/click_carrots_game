"use strict";

const carrotSound = new Audio("./sound/carrot_pull.mp3");
const bugSound = new Audio("./sound/bug_pull.mp3");
const bgmSound = new Audio("./sound/bg.mp3");
const winSound = new Audio("./sound/game_win.mp3");
const alertSound = new Audio("./sound/alert.mp3");

export function playBgm() {
  playSound(bgmSound);
}

export function stopBgm() {
  stopSound(bgmSound);
}

export function playCarrot() {
  playSound(carrotSound);
}

export function playBug() {
  playSound(bugSound);
}

export function playWin() {
  playSound(winSound);
}

export function playAlert() {
  playSound(winSound);
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}
