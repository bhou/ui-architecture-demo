import { Component, NgModule, NgZone, Injectable, ChangeDetectorRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import CollarView from '../abstraction/CollarView';

module.exports = function(selector, name) {
  let counter = new CollarView(selector, name);

  let viewState = {count : 0}
  let changeDetectorRef = null;

  class CounterComponent {
    static get annotations() {
      return [
          new Component({
            selector: "#angular-counter",
            template: `<div class="angular-counter-value"><h1 class="counter-value">{{ state.count }}</h1></div>
              <button class="angular-counter-dec-btn press" (click)="decrement()">-</button>
              <button class="angular-counter-inc-btn press" (click)="increment()">+</button>`,
          }),
        ];
    }

    static get parameters() {
      return [[ChangeDetectorRef]];
    }
      
    constructor(cdr) {
      console.log(cdr)
      changeDetectorRef = cdr;
      this.state = viewState;
    }

    increment() {
      counter.send({
        actionType: 'INCREMENT'
      });
    }

    decrement() {
      counter.send({
        actionType: 'DECREMENT'
      })
    }

  }

  class AppModule {
    static get annotations() {
      return [
        new NgModule({
          imports: [
            BrowserModule
          ],
          declarations: [
            CounterComponent
          ],
          bootstrap: [
            CounterComponent
          ]
        })
      ]
    }

    constructor() {}
  }

  counter.setRenderer(function(state, done) {
    platformBrowserDynamic().bootstrapModule(AppModule);
    done();
  });

  counter.setUpdater(function(state, done) {
    viewState.count = state.count;
    changeDetectorRef.detectChanges();
    done();
  });

  return counter;
};

