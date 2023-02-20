class Counter extends React.Component {
  //기본값 설정 
  static defaultProps = {
    min: 0,
    count: 0,
    max: 10,
    step: 1,
  };

  //count의 기본값 설정 
  state = {
    count: this.props.count,
  };

  //랜더링
  render() {
    //선택된 element의 값들을 가져옴
    const { min, max } = this.props;
    const { count } = this.state;

    return (
      <div className="counter">
        <button
          disabled={count === max}
          type="button"
          aria-label="카운트 1 증가"
          onClick={this.handleIncrement}
        >
          +
        </button>
        <output aria-live="polite">{count}</output>
        <button
          disabled={count === min}
          type="button"
          aria-label="카운트 1 감소"
          onClick={this.handleDecrement}
        >
          -
        </button>
      </div>
    );
  }

  //증가버튼을 눌렀을때 해당 함수가 실행됨.
  handleIncrement = () => {
    const { max, step } = this.props; 
    let newCountValue = this.state.count + step;
    if (newCountValue > max) {
      newCountValue = max;
    }
    this.setState({
      count: newCountValue,
    });
  };

  //감소버튼을 눌렀을때 해당 함수가 실행됨
  handleDecrement = () => {
    const { min, step } = this.props; 
    let newCountValue = this.state.count - step;
    if (newCountValue < min) {
      newCountValue = min;
    }
    this.setState({
      count: newCountValue,
    });
  };
}

//Counter라는 <div> 요소를 가져와 가상돔을 생성함. 첫번째 것은 설정값이 없고 두번짼 7,9,16,4 등의 값이 설정됨.
const counterContainer = document.querySelector('[data-component="Counter"]');
const reactDomRoot = ReactDOM.createRoot(counterContainer);
reactDomRoot.render(
  <>
    <Counter />
    <Counter min={7} count={9} max={16} step={4} />
  </>
);
