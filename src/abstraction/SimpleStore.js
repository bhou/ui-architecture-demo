import Store from './Store';

class SimpleStore extends Store {
  constructor(name, state) {
    super(name, state);

    this.views = new Map();
    this.handlers = new Map();
  }

  dispatch(msg) {
    let actionType = msg.actionType;

    if (!this.handlers.has(actionType)) {
      return;
    }

    let handlers = this.handlers.get(actionType);

    handlers.forEach((handler) => {
      handler.call(this, msg);
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
      view.addMsgHandler(actionType, (msg) => {
        this.dispatch(msg)
      });
    }

  }

  registerView(name, view) {
    this.views.set(name, view);
  }
}

export default SimpleStore;
