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

    let cssLoader;

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
        new ExtractTextPlugin('style.css'),
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

        cssLoader = ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                {
                    loader: 'css-loader',
                    options: {
                        module: true,
                        modules: true,
                        importLoaders: 1,
                        localIdentName: '[hash:base64:5]',
                    },
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true,
                        plugins: loader => [
                            require('postcss-import')({ root: loader.resourcePath }),
                            require('cssnext')(),
                            require('autoprefixer')(),
                            require('cssnano')(),
                        ],
                    },
                },
            ],
        });
    } else {
        plugins.push(
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        );

        cssLoader = [
            {
                loader: 'style-loader',
            },
            {
                loader: 'css-loader',
                options: {
                    module: true,
                    localIdentName: '[path][name]-[local]',
                },
            },
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true,
                    plugins: loader => [
                        require('postcss-import')({ root: loader.resourcePath }),
                        require('cssnext')(),
                        require('autoprefixer')(),
                        require('cssnano')(),
                    ],
                },
            },
        ];
    }

    const entryPoint = isProd
        ? './index.js'
        : [
            `webpack-hot-middleware/client?path=${host}:${port}/__webpack_hmr`,
            './index.js',
        ];

    return {
        devtool: isProd ? 'source-map' : 'cheap-module-source-map',
        context: paths.source,
        entry: {
            main: entryPoint,
        },
        output: {
            path: paths.build,
            publicPath: '/',
            filename: 'app.js',
            chunkFilename: '[name].[chunk].js',
            hotUpdateChunkFilename: 'hot/hot-update.js',
            hotUpdateMainFilename: 'hot/hot-update.json',
        },
        module: {
            rules: [
                {
                    test: /\.(html|svg|jpe?g|png|ttf|woff2?)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: 'static/[name]-[hash:8].[ext]',
                        },
                    },
                },
                {
                    test: /\.pcss$/,
                    exclude: /node_modules/,
                    use: cssLoader,
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['stage-0', 'react'],
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
            hot: !isProd,
            compress: isProd,
            stats,
        },
    };
};
