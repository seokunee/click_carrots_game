"use strict";

export default class PopUp {
  constructor() {
    this.popUp = document.querySelector(".pop-up");
    this.popUpText = document.querySelector(".pop-up__comment");
    this.popUpRestart = document.querySelector(".restart__btn");

    this.popUpRestart.addEventListener("click", () => {
      this.onClick && this.onClick();
      this.hide();
    });
    // arrow function을 써주면 this가 바인딩 되어서
    // 함수가 제대로 실행된다.
    // 다시 this 바인딩을 설명하자면,
    // 함수가 인자로 전달이 될 때, class 정보는 전달
    // 되지 않는다. 따라서 직접 바인딩 함수 bind()
    // 로 묶어주던가 아니면 arrow function 으로
    // 또는 함수를 변수로 작성을해주면 된다.
    // onClick = (evnet) =>{
    //   ~~~~~
    // this~~~
    // }
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  message(text) {
    this.popUpText.innerText = `${text}`;
  }

  hide() {
    this.popUp.classList.add("display-none");
  }

  show() {
    this.popUp.classList.remove("display-none");
  }
}
