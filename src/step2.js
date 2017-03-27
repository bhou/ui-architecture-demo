const collar = require('collar.js');
const DevToolAddon = require('collar.js-dev-webclient');

collar.use(new DevToolAddon());


// the initial app state
const initialState = {count: 0}

import VanillaCounterView from './vanilla/SimpleCounter';
import ReactCounterView from './react/SimpleCounter';
import ReactCounterCollarView from './react/Counter';

import SimpleStore from './abstraction/SimpleStore';
import CollarStore from './abstraction/CollarStore';

const store = new CollarStore('store', initialState);

// create view instance with a DOM element (by selector)
const counterView = new VanillaCounterView('#vanilla-counter', 'vanilla-counter'); 
const reactCounterView = new ReactCounterView('#react-counter', 'react-counter');
const reactCounterCollarView = ReactCounterCollarView('#react-counter', 'react-counter');

// register the view to the store
//store.registerView('counter view', counterView);
//store.registerView('react counter view', reactCounterView);
store.registerView('react counter collar view', reactCounterCollarView);


// register action reducers
store.reduce('INCREMENT', (prevState, action) => { 
  return {
    count: prevState.count + 1
  }
});
store.reduce('DECREMENT', (prevState, action) => { 
  return {
    count: prevState.count - 1
  }
});

// finally, render the view
//counterView.render(initialState);
//reactCounterView.render(initialState);
reactCounterCollarView.render(initialState);
