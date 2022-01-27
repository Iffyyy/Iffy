// class SetScriptTimestampPlugin {
//   apply(compiler) {
//     compiler.hooks.compilation.tap(
//       "SetScriptTimestampPlugin",
//       (compilation, callback) => {
//         compilation.plugin(
//           "html-webpack-plugin-before-html-processing",
//           (htmlPluginData, callback) => {
//             let jsSrc = htmlPluginData.assets.js[0];
//             htmlPluginData.assets.js = [];
//             let result = `
//                 <script>
//                     let scriptDOM = document.createElement("script");
//                     let jsSrc = "./${jsSrc}";
//                     scriptDOM.src = jsSrc + "?" + new Date().getTime();
//                     document.body.appendChild(scriptDOM)
//                 </script>
//           `;
//             let resultHTML = htmlPluginData.html.replace(
//               "<!--SetScriptTimestampPlugin inset script-->",
//               result
//             );
//             // 返回修改后的结果
//             htmlPluginData.html = resultHTML;
//           }
//         );
//       }
//     );
//   }
// }

// module.exports = SetScriptTimestampPlugin;

// 新版  
const HtmlWebpackPlugin = require("html-webpack-plugin");
class SetScriptTimestampPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap(
      "SetScriptTimestampPlugin",
      (compilation) => {
        HtmlWebpackPlugin.getHooks(compilation).afterTemplateExecution.tapAsync(
          "SetScriptTimestampPlugin",
          (data, cb) => {
            // 读取并修改 script 上 src 列表
            let assets = JSON.parse(data.plugin.assetJson);
            const jsScripts = assets.filter((item) => /\.js$/.test(item));
            data.bodyTags = data.bodyTags.filter(
              (item) => item.tagName !== "script"
            );
            console.log(data.plugin.assetJson, jsScripts);
            let result = `const jsScripts = [${jsScripts
              .map((j) => '"' + j + '"')
              .join(",")}]; 
              const suffix = "?" + new Date().getTime() 
              jsScripts.forEach(item => { const scriptDOM = document.createElement("script"); scriptDOM.src = jsScr + suffix; document.body.appendChild(scriptDOM) }) `;
            let resultHTML = data.html.replace("", result);
            console.log(data);
            // 返回修改后的结果
            data.html = resultHTML;
            cb(null, data);
          }
        );
      }
    );
  }
}
module.exports = SetScriptTimestampPlugin;
