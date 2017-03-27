import Store from './Store';

class SimpleStore extends Store {
  constructor(name, state) {
    super(name, state);

    this.views = new Map();
    this.handlers = new Map();
  }

  dispatch(action) {
    let actionType = action.actionType;

    if (!this.handlers.has(actionType)) {
      return;
    }

    let handlers = this.handlers.get(actionType);

    handlers.forEach((handler) => {
      handler.call(this, action);
    });

    let views = this.views.values();
    for (let view of views) {
      view.update(this.state);
    };
  }

  handleAction(actionType, handler) {
    if (!this.handlers.has(actionType)) this.handlers.set(actionType, []);

    this.handlers.get(actionType).push(handler);

    let views = this.views.values();
    for (let view of views) {
      view.addActionHandler(actionType, (msg) => {
        this.dispatch(msg)
      });
    }
  }

  reduce(actionType, reducer) {
    this.handleAction(actionType, (action) => {
      this.state = reducer(this.state, action);
    });
  }

  registerView(name, view) {
    this.views.set(name, view);
  }
}

export default SimpleStore;
