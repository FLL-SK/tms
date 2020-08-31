const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PATHS = {
    src: path.join(__dirname, 'src'),
};

module.exports = {
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
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin({ filename: 'app.[hash].css' }),
    ],
    output: {
        filename: 'app.[hash].js',
    },
    devServer: {
        inline: true,
        historyApiFallback: true,
        port: 8080,
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://localhost:4000',
        }),
    },
};
