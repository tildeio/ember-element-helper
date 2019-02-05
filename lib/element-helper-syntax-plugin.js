module.exports = class ElementHelperSyntaxPlugin {
  transform(ast) {
    let b = this.syntax.builders;
    let locals = [];

    this.syntax.traverse(ast, {
      BlockStatement: {
        enter(node) {
          // check this before we push the new locals
          if (isElementHelper(node, locals)) {
            throw error('does not take a block', node);
          }

          locals.push(node.program.blockParams);
        },

        exit() {
          locals.pop();
        }
      },

      ElementNode: {
        enter(node) {
          locals.push(node.blockParams);
        },

        exit() {
          locals.pop();
        }
      },

      MustacheStatement(node) {
        if (isElementHelper(node, locals)) {
          throw error('cannot be appended to the DOM directly', node);
        }
      },

      SubExpression(node) {
        // ignore locals for sub-expression posistions for now
        // https://github.com/emberjs/ember.js/issues/17121#issuecomment-430369495
        if (isElementHelper(node, [])) {
          validateElementHelperArgs(node);

          return b.sexpr(
            // path
            b.path('component', node.path.loc),
            // params
            [b.sexpr(
              // path
              b.path('-element', node.path.loc),
              // params
              node.params,
              // hash
              node.hash,
              // loc
              node.loc
            )],
            // hash
            b.hash([
              b.pair('tagName', node.params[0], node.params[0].loc)
            ], node.params[0].loc),
            // loc
            node.loc
          );
        }
      }
    });

    return ast;
  }
}

function hasLocalVariable(name, locals) {
  return locals.some(names => names.includes(name));
}

function isElementHelper(node, locals) {
  return node.path.type === 'PathExpression' &&
    node.path.original === 'element' &&
    !hasLocalVariable('element', locals);
}

function validateElementHelperArgs(node) {
  if (node.params.length !== 1) {
    throw error('requires exactly one positional argument', node);
  }

  if (node.hash.pairs.length !== 0) {
    throw error('does not accept any named arguments', node);
  }
}

function error(reason, node) {
  let message = `the \`element\` helper ${reason}`;

  if (node.loc && node.loc.source !== '(synthetic)' && node.loc.start) {
    let { line, column } = node.loc.start;

    if (line !== undefined && column !== undefined) {
      message += ` (on line ${line} column ${column})`;
    } else if (line !== undefined) {
      message += ` (on line ${line})`;
    }
  }

  return new Error(message);
}
