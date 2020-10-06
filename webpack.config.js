const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env) => {
    // load env variables from .env file
    const fileEnv = dotenv.config().parsed;
    let envKeys = {};

    if (fileEnv) {
        // create object from the env variable
        envKeys = Object.keys(fileEnv).reduce((prev, next) => {
            prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
            return prev;
        }, {});
    }

    wcfg = {
        mode: 'development',
        resolve: {
            extensions: ['.js', '.ts', '.tsx'],
        },
        module: {
            rules: [
                { test: /\.tsx?$/, exclude: /node_modules/, loader: 'ts-loader' },
                { test: /\.js$/, use: ['source-map-loader'], enforce: 'pre' },
                {
                    test: /\.css$/i,
                    use: [MiniCssExtractPlugin.loader, 'css-loader'],
                },
                { test: /\.(png|jpe?g|gif)$/i, loader: 'file-loader' },
            ],
        },
        plugins: [
            //new BundleAnalyzerPlugin(),
            new HtmlWebpackPlugin({
                template: './src/index.html',
            }),
            new MiniCssExtractPlugin({ filename: 'app.[hash].css' }),
            new webpack.DefinePlugin(envKeys),
        ],
        output: {
            filename: 'app.[hash].js',
        },
        devServer: {
            inline: true,
            historyApiFallback: true,
            port: 8080,
        },
    };

    return wcfg;
};
