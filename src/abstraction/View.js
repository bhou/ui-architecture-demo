class View {
  constructor(selector, name) {
    this.selector = selector;
    this.name = name;
  }
  
  /* render the view with state */
  render(state) {
  }

  /* update the view with state */
  update(state) {
  }

  /* send UI event (an action) */
  send(action) {
  }

  /* add msg handler to handle actions */
  addActionHandler(actionType, handler) {
  }
}

module.exports = View;
