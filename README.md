ember-element-helper
==============================================================================

[![Build Status](https://github.com/tildeio/ember-element-helper/workflows/Build/badge.svg?branch=master)](https://github.com/tildeio/ember-element-helper/actions?query=branch%3Amaster+workflow%3A%22Build%22)

Dynamic element helper for Glimmer templates.

See [this RFC comment](https://github.com/emberjs/rfcs/pull/389#issuecomment-429691544)
for more context and motivation.


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.4 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-element-helper
```


Usage
------------------------------------------------------------------------------

```hbs
{{#let (element this.tagName) as |Tag|}}
  <Tag class="my-tag">hello world!</Tag>
{{/let}}
```

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
