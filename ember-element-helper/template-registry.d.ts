import type ElementHelper from "./src/helpers/element";

export default interface EmberElementHelperRegistry {
  'element': typeof ElementHelper;
}