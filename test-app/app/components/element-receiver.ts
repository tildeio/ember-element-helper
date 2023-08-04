import Component from '@glimmer/component';
import type { ElementSignature, ElementFromTagName } from 'ember-element-helper';

interface ElementReceiverSignature<T extends string> {
  Element: ElementFromTagName<T>;
  Args: {
    tag: ElementSignature<T>['Return'];
  };
  Blocks: {
    default: [];
  }
}

export default class ElementReceiver<T extends string = 'article'> extends Component<ElementReceiverSignature<T>> {}
