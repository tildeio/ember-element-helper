import Component from '@glimmer/component';

// This component is not needed anymore. However we can only safely remove it once we have an Embroider release that
// has the special dependency rule for this addon removed:
// https://github.com/embroider-build/embroider/blob/4fad67f16f811e7f93199a1ee92dba8254c42978/packages/compat/src/addon-dependency-rules/ember-element-helper.ts
// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class DynamicElementAlt extends Component {}
