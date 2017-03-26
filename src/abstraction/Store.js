class Store {
  constructor(name, state) {
    this.name = name;
    this.state = state;
  }

  /* dispatch an action to the store */
  dispatch(action) {
  }

  /* register an action handler */
  handleAction(actionType, handler) {
  }

  /* register a view with a name */
  registerView(name, view) {
  }
}

export default Store;
