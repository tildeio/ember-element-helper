# ember-element-helper

[![Build Status](https://travis-ci.com/tildeio/ember-element-helper.svg?branch=master)](https://travis-ci.com/tildeio/ember-element-helper)

Dynamic element helper for Glimmer templates.

See [this RFC comment](https://github.com/emberjs/rfcs/pull/389#issuecomment-429691544)
for more context and motivation.

## Installation

```bash
ember install ember-element-helper
```

## Usage

```hbs
{{#let (element this.tagName) as |Tag|}}
  <Tag class="my-tag">hello world!</Tag>
{{/let}}
```

### `{{element}}` as Primitive

You can use `{{element}}` as primitive to pass around the respective element to
created.

Your component (and how to type it):

```ts
import Component from '@glimmer/component';
import Element from 'ember-element-helper';

interface MyArgs {
  element: Element;
}

export default class MyComponent extends Component<MyArgs> {}
```

Your template:

```hbs
{{#let (if @element @element (element "div")) as |Tag|}}
  <Tag>{{yield}}</Tag>
{{/let}}
```

And the incovation:

```hbs
<MyComponent @element={{element "a"}}>
  My Text
</MyComponent>
```

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
