import Vue from 'vue';

const CollarView = require('../abstraction/CollarView');


module.exports = function(selector, name) {
  let counter = new CollarView(selector, name);

  let app = null;
  counter.setRenderer(function(state, done) {
    app = new Vue({
      el: selector,
      template: `<div class="vue-counter">
  <div class="vue-counter-value"><h1 class="counter-value">{{count}}</h1></div>
  <button class="vue-counter-dec-btn press" v-on:click="onDecrement">-</button>
  <button class="vue-counter-inc-btn press" v-on:click="onIncrement">+</button>
</div>`,
      data: {
        count: 0,
      },
      methods: {
        onIncrement: function () {
          counter.send({
            actionType: 'INCREMENT'
          })
        },
        onDecrement: function () {
          counter.send({
            actionType: 'DECREMENT'
          })
        }
      }
    });

    done();
  });

  counter.setUpdater(function(state, done) {
    app.count = state.count;
    done();
  });

  return counter;
}
