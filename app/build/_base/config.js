import HtmlWebpackPlugin from 'html-webpack-plugin';
import RemarkHTML from 'remark-html';

import path from 'path';
import webpack from 'webpack';

import {
    CleanWebpackPlugin
} from 'clean-webpack-plugin';

import {
    VueLoaderPlugin
} from 'vue-loader';

export default {

    stats: 'minimal',

    entry: {
        app: './src/index.ts'
    },

    output: {
        path: path.resolve(__dirname, '../../public'),
        publicPath: '/',
    },

    performance: {
        hints: false
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue'],
        symlinks: false
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.(ts|js)x?$/,
                loader: 'babel-loader',
                exclude: {
                    test: /node_modules/,
                    not: [
                        /@harlem/,
                        /.*\.vue\.(js|ts)$/
                    ]
                }
            },
            {
                test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.txt$/,
                loader: 'raw-loader'
            },
            {
                test: /\.md$/,
                use: [
                    {
                        loader: 'html-loader',
                    },
                    {
                        loader: 'remark-loader',
                        options: {
                            remarkOptions: {
                                plugins: [
                                    RemarkHTML
                                ],
                            },
                        },
                    },
                ],
            }
        ]
    },

    plugins: [

        new webpack.EnvironmentPlugin({
            '__VUE_OPTIONS_API__': false, 
            '__VUE_PROD_DEVTOOLS__': true 
        }),

        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),

        new HtmlWebpackPlugin({
            title: 'Harlem',
            template: './src/index.ejs'
        })
    ]
};
