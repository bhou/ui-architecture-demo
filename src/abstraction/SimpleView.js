import View from './View';

class SimpleView extends View {
  constructor(selector, name) {
    super(selector, name);
    this.actionHandlers = new Map();
  }
 
  /* send UI event (an action) */ 
  send(action) {
    if (!this.actionHandlers.has(action.actionType)) {
      return;  
    }
    this.actionHandlers.get(action.actionType).forEach((handler) => {
      handler.call(this, action);
    });
  }
  
  /* add action handler to handle actions */
  addActionHandler(actionType, handler) {
    if (!this.actionHandlers.has(actionType)) {
      this.actionHandlers.set(actionType, [])  
    } 
    this.actionHandlers.get(actionType).push(handler);  
  }
}

export default SimpleView;
