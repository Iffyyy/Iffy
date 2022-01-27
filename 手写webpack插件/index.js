const path=require('path')
const HtmlWebpackPlugin =require('Html-webpack-plugin')
const externalsWebapckPlugin =require('./plugins/ExternalWebpackPlugin')

module.exports={
  mode:'development',
  entry:{
    main:path.resolve(__dirname,'./src/entrys.js')
  }
}