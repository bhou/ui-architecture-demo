const collar = require('collar.js');
import Store from './Store';

class CollarStore extends Store {
  constructor(name, state) {
    super(name, state);
    
    this.ns = collar.ns(name, {
      component: `${name}`,
      arch: `store.${name}`
    });

    this.input = this.ns.input(`${name} store input`);
    this.output = this.ns.output(`${name} store output`);
  }

  dispatch(action) {
    this.input.push(action);
  }

  handleAction(actionType, handler) {
    this.input
      .when(`${actionType}`, s => s.get('actionType') === actionType)
      .do(`handle ${actionType}`, s => {
        handler.call(this, s.payload)
      })
      .map('prepare new state', s => {
        return s.new({
          msgType: 'UPDATE',
          state: this.state
        });
      })
      .to(this.output)
  }

  reduce(actionType, reducer) {
    this.input
      .when(`${actionType}`, s => s.get('actionType') === actionType)
      .do(`handle ${actionType}`, s => {
        console.log(this.state);
        this.state = reducer(this.state, s.payload)
        console.log(this.state);
      })
      .map('prepare new state', s => {
        return s.new({
          msgType: 'UPDATE',
          state: this.state
        });
      })
      .to(this.output)
  }

  registerView(name, view) {
    view.sensor.to(this.input);
    this.output.to(view.input);
  }
}

export default CollarStore;

