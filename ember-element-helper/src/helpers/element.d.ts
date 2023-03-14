import Helper from '@ember/component/helper';
import type { ComponentReturn } from '@glint/template/-private/integration';

interface ElementHelperSignature  {
  Args: {
    Positional: [tagName: keyof HTMLElementTagNameMap];
  };
  Return: (...positional: unknown[]) => ComponentReturn<any, any>;
}

export default class ElementHelper extends Helper<ElementHelperSignature> {}