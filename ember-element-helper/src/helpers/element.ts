// eslint-disable-next-line ember/no-classic-components
import EmberComponent from '@ember/component';
import Helper from '@ember/component/helper';
import { assert, runInDebug } from '@ember/debug';

import { ensureSafeComponent } from '@embroider/util';

// eslint-disable-next-line @typescript-eslint/no-empty-function
function UNINITIALIZED() {}

export type ElementFromTagName<T extends string> = T extends keyof HTMLElementTagNameMap
  ? HTMLElementTagNameMap[T]
  : Element;

type Positional<T extends string> = [name: T];
type Return<T extends string> = typeof EmberComponent<{
  Element: ElementFromTagName<T>;
  Blocks: { default: [] };
}>;

export interface ElementSignature<T extends string> {
  Args: {
    Positional: Positional<T>;
  };
  Return: Return<T> | undefined;
}

export default class ElementHelper<T extends string> extends Helper<ElementSignature<T>> {
  tagName: string | (() => void) = UNINITIALIZED;
  componentClass?: Return<T>;

  compute(params: Positional<T>, hash: object) {
    assert('The `element` helper takes a single positional argument', params.length === 1);
    assert(
      'The `element` helper does not take any named arguments',
      Object.keys(hash).length === 0
    );

    let tagName = params[0];

    if (tagName !== this.tagName) {
      this.tagName = tagName;

      if (typeof tagName === 'string') {
        this.componentClass = ensureSafeComponent(
          // @ts-ignore
          class DynamicElement extends EmberComponent {
            tagName = tagName; // eslint-disable-line ember/require-tagless-components
          },
          this
        ) as unknown as Return<T>;
      } else {
        this.componentClass = undefined;

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
}
