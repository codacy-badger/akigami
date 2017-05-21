const webpack = require('webpack');
const path = require('path');
const config = require('config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');

const host = config.get('server.host');
const port = config.get('server.port');

const paths = {
    source: path.join(__dirname, './src', 'client'),
    build: path.join(__dirname, './public'),
};

const stats = {
    assets: true,
    children: false,
    chunks: false,
    hash: false,
    modules: false,
    publicPath: false,
    timings: true,
    version: false,
    warnings: true,
    colors: {
        green: '\u001b[32m',
    },
};

module.exports = () => {
    const nodeEnv = config.get('enviroment');
    const isProd = nodeEnv === 'production';

    const plugins = [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: path.join('assets', 'modules.js'),
            async: false,
            children: true,
            minChunks: 2,
        }),
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify(nodeEnv) },
        }),
        new ExtractTextPlugin('assets/style.css'),
        new PreloadWebpackPlugin(),
    ];

    if (isProd) {
        plugins.push(
            new UglifyJSPlugin({
                compress: {
                    warnings: false,
                    screw_ie8: true,
                    conditionals: true,
                    unused: true,
                    comparisons: true,
                    sequences: true,
                    dead_code: true,
                    evaluate: true,
                    if_return: true,
                    join_vars: true,
                },
            })
        );
    } else {
        plugins.push(
            new webpack.NamedModulesPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        );
    }

    const entryPoint = './index.js';

    return {
        devtool: isProd ? 'source-map' : 'cheap-module-source-map',
        context: paths.source,
        entry: {
            main: entryPoint,
        },
        output: {
            path: paths.build,
            publicPath: '/',
            filename: 'assets/app.js',
            chunkFilename: 'assets/[name].[chunk].js',
        },
        module: {
            rules: [
                {
                    test: /\.(html|svg|jpe?g|png|ttf|eot|woff2?)(\?.+)?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: 'static/[name]-[hash:8].[ext]',
                        },
                    },
                },
                {
                    test: /\.p?css$/,
                    exclude: /node_modules/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: true,
                                    plugins: loader => [
                                        require('postcss-import')({
                                            addDependencyTo: loader,
                                            path: [
                                                path.join(__dirname, 'src', 'common'),
                                                path.join(__dirname, 'node_modules'),
                                            ],
                                            root: loader.resourcePath,
                                        }),
                                        require('postcss-simple-vars')(),
                                        require('postcss-color-function')(),
                                        require('postcss-nested')(),
                                        require('autoprefixer')(),
                                        require('cssnano')(),
                                    ],
                                },
                            },
                        ],
                    }),
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['stage-0', 'react'],
                            plugins: ['transform-decorators-legacy'],
                        },
                    },
                },
            ],
        },
        resolve: {
            extensions: ['.js', '.jsx'],
            modules: [path.resolve(__dirname, 'node_modules'), paths.source],
        },

        plugins,

        performance: isProd && {
            maxAssetSize: 300000,
            maxEntrypointSize: 300000,
            hints: 'warning',
        },

        stats,

        devServer: {
            contentBase: './src/client',
            publicPath: '/',
            historyApiFallback: true,
            port,
            host,
            compress: isProd,
            stats,
        },
    };
};
