const { QUnit, test } = require('qunit');
const { precompile, registerPlugin } = require('ember-source/dist/ember-template-compiler');

registerPlugin('ast', require('../lib/element-helper-syntax-plugin'));

QUnit.module('element helper: syntax errors', () => {
  test('it requires exactly one positional argument', assert => {
    assert.throws(() => precompile(`
        {{#let (element) as |Tag|}}
          <Tag id="content">hello world!</Tag>
        {{/let}}
      `),
      new Error('the `element` helper requires exactly one positional argument (on line 2 column 15)')
    );

    assert.throws(() => precompile(`
        {{#let (element "h1" "h2") as |Tag|}}
          <Tag id="content">hello world!</Tag>
        {{/let}}
      `),
      new Error('the `element` helper requires exactly one positional argument (on line 2 column 15)')
    );
  });

  test('it does not accept named arguments', assert => {
    assert.throws(() => precompile(`
        {{#let (element "h1" id="content") as |Tag|}}
          <Tag>hello world!</Tag>
        {{/let}}
      `),
      new Error('the `element` helper does not accept any named arguments (on line 2 column 15)')
    );
  });

  test('it does not take a block', assert => {
    assert.throws(() => precompile(`
        {{#element "h1"}}
          hello world!
        {{/element}}
      `),
      new Error('the `element` helper does not take a block (on line 2 column 8)')
    );

    assert.throws(() => precompile(`
        {{#element "h1"}}
          hello world!
        {{else}}
          nope
        {{/element}}
      `),
      new Error('the `element` helper does not take a block (on line 2 column 8)')
    );
  });
});
