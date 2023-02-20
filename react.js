class Counter extends React.Component {
  static defaultProps = {
    min: 0,
    count: 0,
    max: 10,
    step: 1,
  };

  state = {
    count: this.props.count,
  };

  render() {
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

const counterContainer = document.querySelector('[data-component="Counter"]');
const reactDomRoot = ReactDOM.createRoot(counterContainer);
reactDomRoot.render(
  <>
    <Counter />
    <Counter min={7} count={9} max={16} step={4} />
  </>
);
