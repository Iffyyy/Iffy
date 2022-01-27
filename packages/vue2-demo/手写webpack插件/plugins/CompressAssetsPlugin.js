const JSZip = require("jszip");
const { RawSource } = require("webpack-sources");

/* 
  将本次打包的资源都打包成为一个压缩包
  需求:获取所有打包后的资源
*/
const pluginName = "CompressAssetsPlugin";

class CompressAssetsPlugin {
  // 在配置文件中传入的参数会保存在插件实例中
  constructor({ output }) {
    this.output = output;
  }

  apply(compiler) {
    // 注册函数 在webpack即将输出打包文件内容时执行
    compiler.hooks.emit.tagAsync(pluginName, (compilation, callback) => {
      const zip = new JSZip();
      const assets = compilation.getAssets();
      assets.forEach(({ name, source }) => {
        const sourceCode = source.source();
        zip.file(name, sourceCode);
      });

      // 调用 zip.generateAsync 生成 zip 压缩包
      zip.generateAsync({ type: "nodebuffer" }).then((result) => {
        // 通过 new RawSource 创建压缩包
        // 并且同时通过 compilation.emitAsset 方法将生成的 Zip 压缩包输出到 this.output
        compilation.emitAsset(this.output, new RawSource(result));
        callback();
      });
    });
  }
}

module.exports = CompressAssetsPlugin;
