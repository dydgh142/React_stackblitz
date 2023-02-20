// 클래스 문법을 사용해 컴포넌트를 설계합니다.
class Counter {
  // 기본 옵션 (개발자가 설정한)
  // 인스턴스 생성 과정 없이 바로 접근/조작할 수 있게 한다.
  // 정적인(static) 메서드
  static defaultOptions = {
    count: 1,
    min: 1,
    max: 10,
    step: 1,
  };

  // null "비어 있다"
  #component = null;
  #options = null;

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
      ...this.defaultOptions,
      ...userOptions,
    };

    // 컴포넌트 초기화 실행
    this.#init();
  }

  // 클래스 필드에 정의된 함수는
  // 클래스로부터 생성된 인스턴스의 메서드(포함 함수)
  #init() {
    console.log('초기화');
  }

  render() {
    console.log('렌더링');
  }
}

// --------------------------------------------------------

// new 클래스() → 인스턴스(instance 또는 object) 생성
const myCounter = new Counter(
  // 컴포넌트로 설정할 문서의 요소
  document.querySelector('.counter'),
  // 사용자 정의 옵션
  {
    min: 7,
    count: 8,
    max: 100,
    step: 5,
  }
);

// 외부에서 다른 개발자에 의해 접근되는 것을 윈하지 않음
// 비공개
// counter.#init();
// console.log(counter.#component)

// 생성 과정 없이 언제든지 외부에서 접근 가능/변경
// 스태틱 멤버란?
// 생성 과정이 없어도 접근할 수 있는 변수 또는 함수
console.log(Counter.defaultOptions);

// 인스턴스 멤버란?
// 생성 과정이 있어야지만 접근할 수 있는 변수 또는 함수
console.log(new Counter().render());

// 필요하다면 사용자가 모든 Counter 컴포넌트에 설정될 기본 옵션을 변경 가능
// Counter.defaultOptions = {
//   min: 0,
//   count: 1,
//   max: 1000,
//   step: 2
// };
