import React from 'react';
import ReactDOM from 'react-dom';

import CollarView from '../abstraction/CollarView';

class Counter extends React.Component {
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



module.exports = function(selector, name) {
  let counter = new CollarView(selector, name);

  let reactComp = null;
  counter.setRenderer(function(state, done) {
    reactComp = ReactDOM.render(
      <Counter view={counter} />,
      document.querySelector(selector)
    )
    done();
  });

  counter.setUpdater(function(state, done) {
    reactComp.setState(state);
    done();
  });

  return counter;
};

