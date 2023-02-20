// 클래스 문법을 사용해 컴포넌트를 설계합니다.
class Counter {

  // 기본 옵션 (개발자가 설정한)
  // 인스턴스 생성 과정 없이 바로 접근/조작할 수 있게 한다.
  // 정적인(static) 메서드
  // static
  static defaultOptions = {
    count: 1,
    min: 1,
    max: 10,
    step: 1,
  };

  // null "비어 있다"
  // private
  #component = null;
  #options = null; // null | HTMLElement

  // 컴포넌트의 상태
  #count = 0; // number

  // constructor 함수의 용도
  // 클래스 외부에서 전달 받아야 할 것들을 받아 내부에서 설정
  // - 어떤 문서의 요소를 카운터 컴포넌트로 만들까?
  // - 카운터 컴포넌트의 초깃값, 최솟값, 최댓값, 변경값
  constructor(element, userOptions) {
    // 클래스 내부에서 사용될 지역 변수
    // 클래스로부터 생성된 인스턴스(this)의 멤버로 설정
    this.#component = element;

    // 개발자의 옵션과 사용자의 옵션을 병합(merge, combine)
    // 전개 구문
    this.#options = { 
      ...Counter.defaultOptions, 
      ...userOptions 
    };

    // React 컴포넌트의 props
    // { min, max, step }
    // 1. 읽기 쓰기 가능하다.
    // 2. 읽기만 가능하다. 🅾️
    // console.log(this.#options);
    
    // React 컴포넌트의 state
    // { count }
    // 1. 읽기 쓰기 가능하다. 🅾️
    // 2. 읽기만 가능하다.
    this.#count = this.#options.count;

    // 컴포넌트 초기화 실행
    this.#init();
  }

  // getter 함수
  // 읽기 전용 속성 반환
  get count() {
    return this.#count;
  }

  // setter 함수
  // 읽기 쓰기 모두 가능
  // set count(newCountValue) {
  //   this.#count = newCountValue;
  // }

  // 클래스 필드에 정의된 함수는
  // 클래스로부터 생성된 인스턴스의 메서드(포함 함수)
  // private
  #incrementButton = null;
  #decrementButton = null;
  #output = null;

  #init() {
    // 뷰(View)의 요소 접근/참조
    // 인스턴스 비공개 멤버(변수)
    this.#incrementButton = this.#component.querySelector('button:first-child');
    this.#decrementButton = this.#component.querySelector('button:last-child');
    this.#output = this.#component.querySelector('output');

    // 이벤트 핸들링
    // React 이벤트 위임
    // this.#component.addEventListener('click', (e) => {
    //   const { target } = e;
    //   console.log(target);
    // });

    // 직접 각 버튼에 이벤트를 걸거에요!!!!
    this.#incrementButton.addEventListener('click', this.handleIncrement);
    this.#decrementButton.addEventListener('click', this.handleDecrement);

    this.render();
  }

  handleIncrement = (e) => {
    // props: step, max
    const { step, max } = this.#options;
    
    // state: this.#count (읽기), this.setCount (쓰기)
    // console.log(this.count);
    
    let updateCountValue = this.count + step;
    // updateCountValue vs. max 비교
    if (updateCountValue > max) {
      updateCountValue = max;
      this.renderIncrementButton();
    }

    this.setCount(updateCountValue);
  }

  handleDecrement = (e) => {
    console.log(this);
    console.log(e.target);
  }

  // public instance methods
  render() {
    this.#output.value = this.count;
  }

  renderIncrementButton() {
    console.log('update increment button disabled state');
    this.#incrementButton.disabled = true;
  }

  // 비공개인 this.#count를 업데이트 할 수 있는 인스턴스 메서드
  // React 클래스 컴포넌트의 this.setState()

  // 1. static method
  // 2. instance method
  setCount(newCountValue) {
    this.#count = newCountValue;
    this.render();
  }

}

// --------------------------------------------------------

// new 클래스() → 인스턴스(instance 또는 object) 생성
const myCounter = new Counter(
  // 컴포넌트로 설정할 문서의 요소
  document.querySelector('.counter1'),
  // 사용자 정의 옵션
  // props object
  {
    min: 7,
    count: 88,
    max: 100,
    step: 5,
  }
);

// 제 2의 카운터 컴포넌트
const myCounter2 = new Counter(
  document.querySelector('.counter2'),
  {
    count: 7
  }
);

const myCounter3 = new Counter(
  document.querySelector('.counter3'),
  {
    count: 2,
    step: 6
  }
);

// getter
// console.log(myCounter.count); // read only
// myCounter.count = 100; ❌
// myCounter.setCount(100);
// console.log(myCounter.count);


// 외부에서 다른 개발자에 의해 접근되는 것을 윈하지 않음
// 비공개
// counter.#init();
// console.log(counter.#component)

// 생성 과정 없이 언제든지 외부에서 접근 가능/변경
// 스태틱 멤버란?
// 생성 과정이 없어도 접근할 수 있는 변수 또는 함수
// console.log(Counter.defaultOptions);

// 인스턴스 멤버란?
// 생성 과정이 있어야지만 접근할 수 있는 변수 또는 함수
// console.log(new Counter().render());

// 필요하다면 사용자가 모든 Counter 컴포넌트에 설정될 기본 옵션을 변경 가능
// Counter.defaultOptions = {
//   min: 0,
//   count: 1,
//   max: 1000,
//   step: 2
// };
