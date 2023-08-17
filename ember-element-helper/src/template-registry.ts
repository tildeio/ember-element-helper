import type ElementHelper from './helpers/element';

export default interface EmberElementHelperRegistry {
  element: typeof ElementHelper;
}
