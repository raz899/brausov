const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// auto entry points
const bundlesArray = glob.sync('./assets/bundles/**/index.js');
const bundlesObject = {common: './assets/bundles/common/index.js'};
bundlesArray.reduce((acc, item) => {
    const name = item.replace('./assets/bundles/', '').replace('/index.js', '');
    if (name != 'common') {
        bundlesObject[name]= {
            dependOn: 'common',
            import: item,
        };
    }
}, {});

const config = {
    entry: bundlesObject,
    output: {
        filename: '[name].bundle.js',
        publicPath: '/assets/public/bundles/',
        library: '[name]',
        path: path.resolve(__dirname, './assets/public/bundles'),
        // chunkFormat: 'module',
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        presets: ['@babel/preset-env'],
                    },
                },
            }, {
                // scss
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false,
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            sourceMap: true,
                            modules: false,
                            // esModule: false,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            postcssOptions: {
                                plugins: function() {
                                    return [
                                        require('autoprefixer'),
                                    ];
                                },
                            },
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            }, {
                // css
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false,
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            sourceMap: true,
                            modules: false,
                            // esModule: false,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            postcssOptions: {
                                plugins: function() {
                                    return [
                                        require('autoprefixer'),
                                    ];
                                },
                            },
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        alias: {
            core: path.resolve(__dirname, './assets/src/core/'),
            icons: path.resolve(__dirname, './assets/src/icons/'),
            modules: path.resolve(__dirname, './assets/src/modules/'),
        },
    },
};

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        console.log('\x1b[36m%s\x1b[0m', '==> 🔨 DEVELOPMENT MODE 🔨 <==');
        config.stats = 'minimal';
        config.mode = 'development';
        config.devtool = 'source-map';
        config.watch = true;
        config.watchOptions = {
            aggregateTimeout: 200,
            poll: 1000,
            ignored: /node_modules/,
        };
        config.plugins = [
            new MiniCssExtractPlugin({
                filename: '[name].bundle.css',
            }),
        ];
        config.optimization = {
            minimize: false,
            runtimeChunk: false,
        };
    }

    if (argv.mode === 'production') {
        console.log('\x1b[36m%s\x1b[0m', '==> 🤞 PRODUCTION MODE 🤞 <==');
        config.mode = 'production';
        config.devtool = 'source-map';
        config.stats = 'minimal';
        config.plugins = [
            new MiniCssExtractPlugin({
                filename: '[name].bundle.css',
            }),
            // new BundleAnalyzerPlugin(),
        ];
        config.optimization = {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        output: {
                            comments: false,
                        },
                        sourceMap: true,
                    },
                    extractComments: false,
                    parallel: true,
                }),
            ],
            runtimeChunk: false,
        };
    }

    return config;
};
