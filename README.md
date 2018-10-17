ember-element-helper
==============================================================================

[![Build Status](https://travis-ci.com/tildeio/ember-element-helper.svg?branch=master)](https://travis-ci.com/tildeio/ember-element-helper)

Dynamic element helper for Glimmer templates.

See [this RFC comment](https://github.com/emberjs/rfcs/pull/389#issuecomment-429691544)
for more context and motivation.

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

### Installation

* `git clone <repository-url>`
* `cd ember-element-helper`
* `yarn install`

### Linting

* `yarn lint:hbs`
* `yarn lint:js`
* `yarn lint:js --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions
* `yarn test:node` – Runs the additional test suite for syntax errors

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
