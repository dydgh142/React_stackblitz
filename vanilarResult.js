class Counter {
  #options;

  #component;
  #incrementButton;
  #decrementButton;
  #output;

  #initCount;
  #count;

  static defaultOptions = {
    count: 0,
    min: 0,
    max: 10,
    step: 1,
  };

  constructor(element, userOptions = {}) {
    this.#options = { ...Counter.defaultOptions, ...userOptions };

    this.#component = element;
    this.#initCount = this.#options.count;

    this.reset();
    this.#init();
    this.#render();
  }

  #init() {
    this.#output = this.#component.querySelector('output');
    this.#incrementButton = this.#component.firstElementChild;
    this.#decrementButton = this.#component.lastElementChild;

    this.#component.addEventListener('click', (e) => {
      const { target } = e;

      if (target.matches('button:first-child')) {
        this.increment();
        this.#render();
      }

      if (target.matches('button:last-child')) {
        this.decrement();
        this.#render();
      }

    });
  }

  #render() {
    this.#renderIncrementButton();
    this.#renderDecrementButton();

    this.#output.value = this.count;
  }

  #renderIncrementButton() {
    let { max } = this.#options;
    if (this.#count === max) {
      this.#incrementButton.disabled = true;
      this.#output.setAttribute('aria-label', `${max} 최대 카운트 값입니다.`);
    } else {
      this.#incrementButton.disabled = false;
      this.#output.removeAttribute('aria-label');
    }
  }

  #renderDecrementButton() {
    let { min } = this.#options;
    if (this.#count === min) {
      this.#decrementButton.disabled = true;
      this.#output.setAttribute('aria-label', `${min} 최소 카운트 값입니다.`);
    } else {
      this.#decrementButton.disabled = false;
      this.#output.removeAttribute('aria-label');
    }
  }

  get count() {
    return this.#count;
  }

  increment() {
    let { max, step } = this.#options;
    if (this.count + step >= max) {
      this.setCount(max);
      return;
    }
    this.#count += step;
  }

  decrement() {
    let { min, step } = this.#options;
    if (this.count - step <= min) {
      this.setCount(min);
      return;
    }
    this.#count -= step;
  }

  setCount(value) {
    this.#count = value;
  }

  reset() {
    this.#count = this.#initCount;
  }
}

// ---------------------------------------------------------------------

new Counter(document.querySelector('.counter1'));

new Counter(document.querySelector('.counter2'), {
  min: 7,
  count: 9,
  max: 16,
  step: 4
});
