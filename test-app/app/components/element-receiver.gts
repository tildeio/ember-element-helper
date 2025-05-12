import Component from '@glimmer/component';
import type { ElementSignature, ElementFromTagName } from 'ember-element-helper';

interface ElementReceiverSignature<T extends string = 'article'> {
  Element: ElementFromTagName<T>;
  Args: {
    tag: ElementSignature<T>['Return'];
  };
  Blocks: {
    default: [];
  }
}

export default class ElementReceiver<T extends string> extends Component<ElementReceiverSignature<T>> {<template>{{#let @tag as |Tag|}}
  {{!--@glint-ignore--}}
  <Tag id="content" ...attributes>{{yield}}</Tag>
{{/let}}</template>}
