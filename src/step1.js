const collar = require('collar.js');
const DevToolAddon = require('collar.js-dev-webclient');

collar.use(new DevToolAddon());


// the application state
const state = {count: 0}

/* vanilla impl view */
import VanillaCounterView from './vanilla/SimpleCounter';

// create view instance with a DOM element (by selector)
const counterView = new VanillaCounterView('#vanilla-counter', 'vanilla-counter'); 

// register action handler
counterView.addActionHandler('INCREMENT', () => { 
  state.count++; 
  counterView.update(state);
});
counterView.addActionHandler('DECREMENT', () => { 
  state.count--; 
  counterView.update(state);
});

// finally, render the view
counterView.render(state);




/* vanilla impl collar view */
import VanillaCounterCollarView from './vanilla/Counter';

const counterCollarView = VanillaCounterCollarView('#vanilla-counter-collar', 'vanilla-counter-collar');

// register action handler
counterCollarView.addActionHandler('INCREMENT', () => { 
  state.count++; 
  counterCollarView.update(state);
});
counterCollarView.addActionHandler('DECREMENT', () => { 
  state.count--; 
  counterCollarView.update(state);
});

// finally, render the view
counterCollarView.render(state);





/* react impl view */
import ReactCounterView from './react/SimpleCounter';
const reactCounterView = new ReactCounterView('#react-counter', 'react-counter');
reactCounterView.addActionHandler('INCREMENT', () => { 
  state.count++; 
  reactCounterView.update(state);
});
reactCounterView.addActionHandler('DECREMENT', () => { 
  state.count--; 
  reactCounterView.update(state);
});
reactCounterView.render(state);

