// https://juejin.cn/post/7047777251949019173#heading-11

const { resolve } = require("path/posix");
const { ExternalModule, library } = require("webpack");
const HtmlWepackPlugin = require("html-webpack-plugin");

const pluginName = "ExternalsWebpackPlugin";

class ExternalsWebpackPlugin {
  constructor(options) {
    this.options = options;
    // 保存参数传入的所有需要转化CDN外部externals的库名称
    this.transformLibrary = Object.keys(options);
    // 分析依赖引入 保存代码中使用到需要转化为外部CDN的库
    this.usedLibrary = new Set();
  }

  apply(compiler) {
    compiler.hooks.normalModuleFactory.tap(
      pluginName,
      (normalModuleFactory) => {
        normalModuleFactory.hooks.factorize.tapAsync(
          pluginName,
          (resolveData, callback) => {
            const requireModuleName = resolveData.request;
            if (this.transformLibrary.includes(requireModuleName)) {
              const externalModuleName =
                this.options[requireModuleName].variableName;
              callback(
                null,
                new ExternalModule(
                  externalModuleName,
                  "window",
                  externalModuleName
                )
              );
            } else {
              callback();
            }
          }
        );
        // 在 complier 对象上的 Parser 编译 js 文件时执行。
        normalModuleFactory.hooks.parse
          .for("javascript/auto")
          .tap(pluginName, (parse) => {
            importHandler.call(this, parse);
            requireHandler.call(this, parse);
          });
      }
    );

    compiler.hooks.compilation.tap(pluginName, (compilation) => {
      // 为 HTML 文件引入外部资源（如 script / link ）动态添加每次编译后的 hash，防止引用文件的缓存问题；
      // 动态创建 HTML 入口文件，如单页应用的 index.html 文件
      HtmlWepackPlugin.getHooks(compilation).alterAssetTags.tap(
        pluginName,
        (data) => {
          const scriptTag = data.assetTags.scripts;
          this.usedLibrary.forEach((library) => {
            scriptTag.unshift({
              tagName: "script",
              voidTag: false,
              meta: { plugin: pluginName },
              attributes: {
                defer: true,
                type: undefined,
                src: this.options[library].src,
              },
            });
          });
        }
      );
    });

    function importHandler(parse) {
      parse.hooks.import.tap(pluginName, (statement, source) => {
        if (this.transformLibrary.includes(source)) {
          this.usedLibrary.add(source);
        }
      });
    }

    function requireHandler(parse) {
      parse.hooks.call.for("require").tap(pluginName, (expression) => {
        const moduleName = expression.arguments[0].value;
        if (this.transformLibrary.includes(moduleName)) {
          this.usedLibrary.add(moduleName);
        }
      });
    }
  }
}

module.exports = ExternalsWebpackPlugin;
