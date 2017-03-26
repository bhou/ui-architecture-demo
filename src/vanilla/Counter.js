const CollarView = require('../abstraction/CollarView');

module.exports = function(selector, name) {
  let counter = new CollarView(selector, name);

  counter.setRenderer(function(state, done) {
    let rootDOM = document.querySelector(this.selector);

    rootDOM.innerHTML = `
      <div class="vanilla-counter-value"><h1 class="counter-value">${state.count}</h1></div>
      <button class="vanilla-counter-dec-btn press">-</button>
      <button class="vanilla-counter-inc-btn press">+</button>
    `;

    document.querySelector(`${this.selector} .vanilla-counter-inc-btn`).addEventListener('click', () => {
      this.send({
        actionType: 'INCREMENT'
      });
    });

    document.querySelector(`${this.selector} .vanilla-counter-dec-btn`).addEventListener('click', () => {
      this.send({
        actionType: 'DECREMENT'
      });
    });


    done();
  });

  counter.setUpdater(function(state, done) {
    const countValueDOM = document.querySelector(`${this.selector} .vanilla-counter-value > h1`);
    countValueDOM.innerHTML = state.count;
    done();
  });

  return counter;
};
