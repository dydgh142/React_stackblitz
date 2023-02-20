class Counter {
  // # 은 private 의미

  #options; //HTML element
  #component; //컴포넌트
  #incrementButton; //증가버튼
  #decrementButton; //감소버튼
  #output; //숫자

  #initCount; //숫자를 초기화
  #count; //컴포넌트의 상태태

  //클래스의 기본 옵션값값
  static defaultOptions = {
    count: 0,
    min: 0,
    max: 10,
    step: 1,
  };

  // 클래스 외부에서 전달 받아야 할 것들을 받아, 내부에서 설정
  // - 카운터 컴포넌트의 초깃값, 최솟값, 최댓값, 변경값
  constructor(element, userOptions = {}) {
    //받아온 옵션값들
    this.#options = { ...Counter.defaultOptions, ...userOptions };

    //HTML element를 컴포넌트에 담음
    // 해당 옵션의 카운트 값을 초기값으로 설정
    this.#component = element;
    this.#initCount = this.#options.count;

    this.reset();
    this.#init();
    this.#render();
  }

  //초기화 함수
  #init() {
    //버튼들과 숫자를 초기화함함
    this.#output = this.#component.querySelector('output');
    this.#incrementButton = this.#component.firstElementChild;
    this.#decrementButton = this.#component.lastElementChild;

    //이벤트 발생시
    this.#component.addEventListener('click', (e) => {
      //타겟을 지정정
      const { target } = e;

      //증가버튼을 눌렀을때 클래스의 함수들을 호출
      if (target.matches('button:first-child')) {
        this.increment();
        this.#render();
      }

      //감소버튼 눌렀을때
      if (target.matches('button:last-child')) {
        this.decrement();
        this.#render();
      }
    });
  }

  //랜더링하는 함수
  #render() {
    this.#renderIncrementButton();
    this.#renderDecrementButton();

    // 숫자 표시
    this.#output.value = this.count;
  }

  //증가 버튼을 눌렀을때 랜더링 함수를 거쳐 화면에 출력하는 단계
  #renderIncrementButton() {
    //최댓값을 받아옴
    let { max } = this.#options;

    // 만약 카운트가 최댓값과 같으면 알림과 함께 버튼의 disabled를 활성화 시킴킴
    if (this.#count === max) {
      this.#incrementButton.disabled = true;
      this.#output.setAttribute('aria-label', `${max} 최대 카운트 값입니다.`);
    }
    // 그게 아니라면 계속해서 동작하게 함
    else {
      this.#incrementButton.disabled = false;
      this.#output.removeAttribute('aria-label');
    }
  }

  //감소 버튼을 눌렀을때 랜더링 함수를 거쳐 화면에 출력하는 단계
  #renderDecrementButton() {
    //최솟값을 받아옴
    let { min } = this.#options;

    //최솟값과 같아졌을때 알림과 함께 감소 버튼의 disable를 활성화시킴킴
    if (this.#count === min) {
      this.#decrementButton.disabled = true;
      this.#output.setAttribute('aria-label', `${min} 최소 카운트 값입니다.`);
    }
    //그게 아니라면 계속해서 동작하게 함
    else {
      this.#decrementButton.disabled = false;
      this.#output.removeAttribute('aria-label');
    }
  }

  //카운트 값을 가져오는 함수 #count를 반환함
  get count() {
    return this.#count;
  }

  //증가버튼을 눌렀을 때 연산을 수행하는 함수 (여기서 최댓값보다 크게되면 count를 최댓값으로 지정)
  increment() {
    let { max, step } = this.#options;
    if (this.count + step >= max) {
      this.setCount(max);
      return;
    }
    this.#count += step;
  }

  //감소버튼을 눌렀을때 연산을 수행하는 함수(여기서 최솟값보다 작아지면 count를 최솟값으로 지정)
  decrement() {
    let { min, step } = this.#options;
    if (this.count - step <= min) {
      this.setCount(min);
      return;
    }
    this.#count -= step;
  }

  //count값을 set 하는 함수
  setCount(value) {
    this.#count = value;
  }

  //count 리셋하는 함수
  reset() {
    this.#count = this.#initCount;
  }
}

// ---------------------------------------------------------------------
// counter1 이라는 클래스 이름을 가진 버튼을 가져와 새로운 Counter클래스를 만듬 (options값은 없음)
new Counter(document.querySelector('.counter1'));

new Counter(document.querySelector('.counter2'), {
  min: 7,
  count: 9,
  max: 16,
  step: 4,
});
