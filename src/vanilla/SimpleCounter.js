import View from '../abstraction/SimpleView';

class VanillaCounterView extends View {
  constructor(selector, name) {
    super(selector, name);
  }
  
  render(state) {
    let rootDOM = document.querySelector(this.selector);
    rootDOM.innerHTML = `
   <div class="counter-value"><h1>${state.count}</h1></div>
   <button class="counter-dec-btn press">-</button>
   <button class="counter-inc-btn press">+</button>`;
    
    document.querySelector(`${this.selector} .counter-inc-btn`).addEventListener('click', () => {
      this.send({
        actionType: 'INCREMENT'
      });
    });
    
    document.querySelector(`${this.selector} .counter-dec-btn`).addEventListener('click', () => {
      this.send({
        actionType: 'DECREMENT'
      });
    });
  }
  
  update(state) {
    const countValueDOM = document.querySelector(`${this.selector} .counter-value > h1`);
    countValueDOM.innerHTML = state.count;
  }
}

export default VanillaCounterView;
