const collar = require('collar.js');
const View = require('./View');

class CollarView extends View {
  constructor(selector, name) {
    super(selector, name);
    this.ns = collar.ns(name, {
      component: `${name}`,
      arch: `view.${name}`
    });

    this.errorHandler = this.ns.errors(s => {
      console.error(s.error);
    })

    this.input = this.ns.input(`${name} view input`);
    this.output = this.ns.output(`${name} view output`);
    this.sensor = this.ns.sensor(`${name} view sensor`, function(options) {});

    this.renderer = function(state, done) {done()}
    this.updater = function(state, done) {done()}

    this.output.to(this.errorHandler);

    /* render pipeline */
    this.input
      .when('render', s => s.get('msgType') === 'RENDER')
      .actuator('render the view', (s, done) => {
        let state = s.get('state');
        this.renderer.call(this, state, done);
      })
      .to(this.output);

    /* update pipeline */
    this.input
      .when('update', s => s.get('msgType') === 'UPDATE')
      .actuator('update the view', (s, done) => {
        let state = s.get('state');
        this.updater.call(this, state, done);
      })
      .to(this.output);
  }

  /** methods inherited from View **/
  render(state) {
    this.input.push({
      msgType: 'RENDER',
      state: state
    });
  }

  update(state) {
    this.input.push({
      msgType: 'UPDATE',
      state: state
    });
  }

  send(msg) {
    this.sensor.send(msg, false);
  }

  addActionHandler(actionType, handler) {
    this.sensor
      .when(`${actionType}`, s => s.get('actionType') === actionType)
      .do(`handle msg ${actionType}`, s => {
        handler(s.payload);
      });
  }

  /** methods for collar view **/
  setRenderer(renderer) {
    this.renderer = renderer;
  }

  setUpdater(updater) {
    this.updater = updater;
  } 
}

module.exports = CollarView;
