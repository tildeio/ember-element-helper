import Component from '@ember/component';

// avoiding reexport directly here because in some circumstances (ember-engines
// for example) a simple reexport is transformed to `define.alias`,
// unfortunately at the moment (ember-source@3.13) there is no _actual_
// `@ember/component` module to alias so this causes issues
//
// tldr; we can replace this with a simple reexport when we can rely on Ember
// actually providing a `@ember/component` module
export default Component.extend();
