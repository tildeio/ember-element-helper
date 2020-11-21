import Helper from '@ember/component/helper';
import { assert, runInDebug } from '@ember/debug';
import Component from '@ember/component';

function UNINITIALIZED() {}

const DynamicElement = Component.extend();
const DynamicElementAlt = Component.extend();

export default Helper.extend({
  init() {
    this._super(...arguments);
    this.tagName = UNINITIALIZED;
    this.componentClass = null;
  },

  compute(params, hash) {
    assert('The `element` helper takes a single positional argument', params.length === 1);
    assert('The `element` helper does not take any named arguments', Object.keys(hash).length === 0);

    let tagName = params[0];

    if (tagName !== this.tagName) {
      this.tagName = tagName;

      if (typeof tagName === 'string') {
        // return a different component name to force a teardown
        if (this.componentClass === DynamicElement) {
          this.componentClass = DynamicElementAlt;
        } else {
          this.componentClass = DynamicElement;
        }
      } else {
        this.componentClass = null;

        runInDebug(() => {
          let message = 'The argument passed to the `element` helper must be a string';

          try {
            message += ` (you passed \`${tagName}\`)`;
          } catch (e) {
            // ignore
          }

          assert(message, tagName === undefined || tagName === null);
        });
      }
    }

    return this.componentClass;
  }
});
