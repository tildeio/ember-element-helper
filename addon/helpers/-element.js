import Helper from '@ember/component/helper';

function UNINITIALIZED() {}

export default Helper.extend({
  init() {
    this._super(...arguments);
    this.tagName = UNINITIALIZED;
    this.componentName = UNINITIALIZED;
  },

  compute([tagName]) {
    if (tagName === this.tagName) {
      return this.componentName;
    } else if (typeof tagName !== 'string') {
      let message = 'the argument passed to the `element` helper must be a string';

      try {
        message += ` (you passed \`${tagName}\`)`;
      } catch (e) {
        // ignore
      }

      throw new Error(message);
    } else {
      this.tagName = tagName;

      // return a different component name to force a teardown
      if (this.componentName === '-dynamic-element') {
        return this.componentName = '-dynamic-element-alt';
      } else {
        return this.componentName = '-dynamic-element';
      }
    }
  }
});
