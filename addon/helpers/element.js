import { helper } from '@ember/component/helper';
import { assert } from '@ember/debug';

export default helper(function() {
  // This helper (`element`, as opposed to `-element`) mostly exists to satisfy
  // things like `owner.hasRegistration('helper:element')`. The AST transform
  // replaces all usages of `(element ...)` into `(component (-element ...))`
  // so if this helper is invoked directly, something is wrong.

  assert(
    'The `element` helper polyfill encounted an unexpected error. ' +
    'Please report the issue at http://github.com/tildeio/ember-element-helper ' +
    'with the usage and conditions that caused this error.'
  );

  return null;
});
