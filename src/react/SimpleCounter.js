import React from 'react';
import ReactDOM from 'react-dom';

import View from '../abstraction/SimpleView';

class CounterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }

  onDecrement() {
    this.props.view.send({
      actionType: 'DECREMENT'
    })
  }

  onIncrement() {
    this.props.view.send({
      actionType: 'INCREMENT'
    })
  }

  render() {
    return (
      <div className="react-counter">
        <div className="react-counter-value"><h1 className="counter-value">{this.state.count}</h1></div>
        <button className="react-counter-dec-btn press" onClick={this.onDecrement.bind(this)}>-</button>
        <span> </span> 
        <button className="react-counter-inc-btn press" onClick={this.onIncrement.bind(this)}>+</button>
      </div>
    )
  }
}


class ReactCounterView extends View {
  constructor(selector, name) {
    super(selector, name);
    this.reactComponent = null;
  }
  
  render(state) {
    this.reactComponent = ReactDOM.render(
      <CounterComponent view={this} />,
      document.querySelector(this.selector)
    );
    this.reactComponent.setState(state);
  }
  
  update(state) {
    this.reactComponent.setState(state);
  }
}

export default ReactCounterView;

