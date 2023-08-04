import 'ember-source/types';
import 'ember-source/types/preview';

import '@glint/environment-ember-loose';
import '@glint/environment-ember-loose/native-integration';

import ElementHelperRegistry from 'ember-element-helper/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry extends ElementHelperRegistry {
    // Examples
    // state: HelperLike<{ Args: {}, Return: State }>;
    // attachShadow: ModifierLike<{ Args: { Positional: [State['update']]}}>;
    // welcome: typeof Welcome;
  }
}
