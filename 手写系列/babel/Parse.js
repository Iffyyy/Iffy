module.exports = function (Parse) {
  return class extends Parse {
    parseLiteral(...args) {
      const node = super.parseLiteral(...args);
      switch (typeof node.value) {
        case "number":
          node.type = "NumericLiteral";
          break;
        case "string":
          node.type = "StringLiteral";
          break;
      }
      return node;
    }
  };
};
