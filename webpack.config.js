const path  = require('path')
const DonePlugin = require('./plugins/DonePlugin')
const OptimizePlugin = require('./plugins/OptimizePlugin')
const AsyncPlugin = require('./plugins/AsyncPlugin')
const FileListPlugin = require('./plugins/FileListPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InlinePlugin = require('./plugins/InlinePlugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AutoExternalPlugin = require('./plugins/AutoExternalPlugin');
const CodeBeautify = require('./plugins/CodeBeautify')

module.exports = {
    entry:'./src/index.js',
    output:{
        path:path.resolve('dist'),
        filename:'bundle.js'
    },
    externals: {
        jquery: 'jQuery'
    },
    plugins:[
        // new DonePlugin(),
        // new OptimizePlugin(),
        // new AsyncPlugin(),
        // new FileListPlugin()
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new CodeBeautify()
        // new InlinePlugin({
        //     test:/\.(js|css)$/
        // })
        /*new AutoExternalPlugin({
            jquery:{
                varName:'jQuery',
                url: 'https://cdn.bootcss.com/jquery/3.1.0/jquery.js'
            }
        })*/
    ],
    module:{
        rules:[
            {
                test:/\.css$/,
                use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader']
            }
        ]
    }
}