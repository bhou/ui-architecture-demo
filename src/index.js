/* for angular 2 */
import 'zone.js';
import 'reflect-metadata';


const collar = require('collar.js');
const DevToolAddon = require('collar.js-dev-webclient');

collar.use(new DevToolAddon());

import VanillaCounter from './vanilla/Counter';
import ReactCounter from './react/Counter';
import AngularCounter from './angular/Counter';
import D3Counter from './d3/Counter';
import VueCounter from './vue/Counter';

import SimpleStore from './abstraction/SimpleStore';
import CollarStore from './abstraction/CollarStore';


const state = {count: 0};


/* create the view */
const vanillaCounter = VanillaCounter('#vanilla-counter', 'vanilla-counter');
const reactCounter = ReactCounter('#react-counter', 'react-counter');
const angularCounter = AngularCounter('#angular-counter', 'angular-counter');
const d3Counter = D3Counter('#d3-counter', 'd3-counter'); 
const vueCounter = VueCounter('#vue-counter', 'vue-counter');

/* create the store */
// const store = new SimpleStore('store', {count : 0});
const store = new CollarStore('store', {count: 0});

store.registerView('vanilla-counter', vanillaCounter);
store.registerView('react-counter', reactCounter);
store.registerView('angular-counter', angularCounter);
store.registerView('d3-counter', d3Counter);
store.registerView('vue-counter', vueCounter);


store.handleAction('INCREMENT', function(msg) {
  this.state.count++;
});

store.handleAction('DECREMENT', function(msg) {
  this.state.count--;
});



/* register handler to handler UI events (action) */
/*vanillaCounter.addMsgHandler('INCREMENT', (msg) => {
  state.count++;
  vanillaCounter.update(state);
});

vanillaCounter.addMsgHandler('DECREMENT', (msg) => {
  state.count--;
  vanillaCounter.update(state);
});


reactCounter.addMsgHandler('INCREMENT', (msg) => {
  state.count++;
  reactCounter.update(state);
});

reactCounter.addMsgHandler('DECREMENT', (msg) => {
  state.count--;
  reactCounter.update(state);
});*/


/* finally, we can render the view */
vanillaCounter.render(state);
reactCounter.render(state);
angularCounter.render(state);
d3Counter.render(state);
vueCounter.render(state);


