function elementHelperSyntaxPlugin(env) {
  let b = env.syntax.builders;
  let locals = [];

  return {
    name: 'ember-element-helper',
    visitor: {
      BlockStatement: {
        enter(node) {
          locals.push(node.program.blockParams);
        },

        exit() {
          locals.pop();
        },
      },

      ElementNode: {
        enter(node) {
          locals.push(node.blockParams);
        },

        exit() {
          locals.pop();
        },
      },

      MustacheStatement(node) {
        if (isElementHelper(node, locals)) {
          let { path, params, hash } = transformParts(node, b);
          return b.mustache(path, params, hash, false, node.loc);
        }
      },

      SubExpression(node) {
        if (isElementHelper(node, locals)) {
          let { path, params, hash } = transformParts(node, b);
          return b.sexpr(path, params, hash, node.loc);
        }
      },
    },
  };
}

elementHelperSyntaxPlugin.baseDir = function () {
  return __dirname;
};

module.exports = elementHelperSyntaxPlugin;

function transformParts(node, b) {
  return {
    // path
    path: b.path('component', node.path.loc),
    // params
    params: [
      b.sexpr(
        // path
        b.path('ensure-safe-component', node.path.loc),

        // params
        [
          b.sexpr(
            // path
            b.path('-element', node.path.loc),
            // params
            node.params,
            // hash
            node.hash,
            // loc
            node.loc
          ),
        ]
      ),
    ],
    // hash
    hash:
      node.params.length > 0
        ? b.hash(
            [b.pair('tagName', node.params[0], node.params[0].loc)],
            node.params[0].loc
          )
        : b.hash(),
  };
}

function hasLocalVariable(name, locals) {
  return locals.some((names) => names.includes(name));
}

function isElementHelper(node, locals) {
  return (
    node.path.type === 'PathExpression' &&
    node.path.original === 'element' &&
    !hasLocalVariable('element', locals)
  );
}
