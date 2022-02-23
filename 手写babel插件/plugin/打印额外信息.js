const generate = require("@babel/generator").default;



const targetCalleeName = ["log", "info", "error", "debug"].map(
  (item) => `console.${item}`
);

module.exports = function ({ types, template }) {
  return {
    visitor: {
      CallExpression(path, state) {
        /**version1 */
        // if (
        //   types.isMemberExpression(path.node.callee) &&
        //   path.node.callee.object.name === "console" &&
        //   ["log", "info", "error", "debug"].includes(path.node.callee.property.name)
        // ) {
        //   const { line, column } = path.node.loc.start;
        //   path.node.arguments.unshift(
        //     types.stringLiteral(`filename:(${line},${column})`)
        //   );
        // }

        /**version2 */
        const calleeName = generate(path.node.callee).code;
        if (targetCalleeName.includes(calleeName)) {
          const { line, column } = path.node.loc.start;
          path.node.arguments.unshift(
            types.stringLiteral(`loc:[${line},${column}]`)
          );
        }

        /**version3 */
        // if (path.node.isNew) {
        //   return;
        // }
        // const calleeName = generate(path.node.callee).code;
        // if (targetCalleeName.includes(calleeName)) {
        //   const { line, column } = path.node.loc.start;
        //   const newNode = template.expression(
        //     `console.log("filename: (${line}, ${column})")`
        //   )();
        //   newNode.isNew = true;
        //   if (path.findParent((path) => path.isJSXElement())) {
        //     path.replaceWith(types.arrayExpression([newNode, path.node]));
        //     path.skip();
        //   } else {
        //     path.insertBefore(newNode);
        //   }
        // }
      },
    },
  };
}
