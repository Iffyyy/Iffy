// "customSourceFunc": componentName =>(`./xxx-ui/src/components/ui-base/${componentName}/${componentName}`)}
// 接受一个 babel-core 对象
export default function ({types}) {
  return {
    pre(state) {
      // 前置操作，可选，可以用于准备一些资源
    },
    visitor: {
      // 我们的访问者代码将放在这里
      ImportDeclaration(path, { opts }) {
        const specifiers = path.node.specifiers;
        const source = path.node.source;

        if (Array.isArray(opts)) {
          opts.forEach((opt) => {
            assert(opt.libraryName, "libraryName should be provided");
          });
          if (!opts.find((opt) => opt.libraryName === source.value)) return;
        } else {
          assert(opts.libraryName, "libraryName should be provided");
          if (opts.libraryName !== source.value) return;
        }

        const opt = Array.isArray(opts)
          ? opts.find((opt) => opt.libraryName === source.value)
          : opts;
        opt.camel2UnderlineComponentName =
          typeof opt.camel2UnderlineComponentName === "undefined"
            ? false
            : opt.camel2UnderlineComponentName;
        opt.camel2DashComponentName =
          typeof opt.camel2DashComponentName === "undefined"
            ? false
            : opt.camel2DashComponentName;

        if (
          !types.isImportDefaultSpecifier(specifiers[0]) &&
          !types.isImportNamespaceSpecifier(specifiers[0])
        ) {
          const declarations = specifiers.map((specifier) => {
            const transformedSourceName = opt.camel2UnderlineComponentName
              ? camel2Underline(specifier.imported.name)
              : opt.camel2DashComponentName
              ? camel2Dash(specifier.imported.name)
              : specifier.imported.name;

            return (
              types.ImportDeclaration([
                types.isImportDefaultSpecifier(specifier.local),
              ]),
              types.StringLiteral(opt.customSourceFunc(transformedSourceName))
            );
          });
          path.replaceWithMultiple(declarations);
        }
      },
    },
    post(state) {
      // 后置操作，可选
    },
  };
}
