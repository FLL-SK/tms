const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

function convertEnv2Obj(fEnv) {
    if (!fEnv) return {};
    // create object from the env variable
    let eObj = Object.keys(fEnv).reduce((prev, key) => {
        prev[`process.env.${key}`] = JSON.stringify(fEnv[key]);
        return prev;
    }, {});
    return eObj;
}

function loadEnvValues(keys) {
    if (!keys) return {};
    let eObj = keys.reduce((prev, key) => {
        prev[`process.env.${key}`] = JSON.stringify(process.env[key]);
        return prev;
    }, {});
    return eObj;
}

module.exports = (env) => {
    // load env variables from .env file
    const fileEnv = dotenv.config().parsed;

    // following keys will be loaded from environment
    const envKeys = ['API_URL', 'ENV'];

    // load env from .env file
    // and then overwrite by values set in environment
    const envObj = { ...convertEnv2Obj(fileEnv), ...loadEnvValues(envKeys) };

    wcfg = {
        mode: envObj['process.env.ENV'] || 'production',
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
            new webpack.DefinePlugin(envObj),
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
