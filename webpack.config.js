let path = require('path');

// kerak boladigan plaginlarni node__modules papakasidan chaqirib olamiza
let HtmlWebpackPlugin = require('html-webpack-plugin'); // html bilan ishlash uchun kerak boladi
let MiniCssExtractPlugin = require('mini-css-extract-plugin');

let cssLoaders = extra => {
    let loaders = [
        {
            loader: MiniCssExtractPlugin.loader
        },
        'css-loader', // css faylga bowqa fayllarimizni ulasek boladi import qilamiz
        'postcss-loader', // css kodga prefixlar qoshadi
        'group-css-media-queries-loader' // medialarni hammasini olib faylni ohriga qoyib beradi
    ]
    if(extra) {
        loaders.push(extra)
    }
    return loaders
}

module.exports = {
    context: path.resolve(__dirname, 'src'), // даёт путь до src папки
    mode: 'development', // ражим разработки
    entry: { // projectimizani kirish asosiy faylini tanlash qismi
        main: './scripts/index.js'
    },
    output: { // ishlab chiqilgan fayllarni qayerga yuborishni belgilaydi
        path: path.resolve(__dirname, 'dist'), // dist papakasigacham bolgan joylashuvni oldik
        filename: 'script/[name].[hash].js',
        clean: true
    },
    resolve: { // resolve nomli objectimiza bind qiladi yani alias qoshamiza @ chaqirgan paytimiz bizaga src gacham bolgan yerni olib beradi
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    devServer: { // bu object bizaga server bilan ishlash uchun kerak boladi 
        static: { // server ishga tushkanda qaysi faylni ochishini etib qoyamiza
            directory: path.resolve(__dirname, 'dist/') // dist papkani ichidagi htmlni ochib beradi
        },
        port: 4000, // qaysi portda ochishini belgiladik yani localhost:4000
        open: true // server ishga tushgan paytida index.html faylimizani ochib berishi uchun kerak boladi
    }, 
    
    plugins: [ // plaginlarni chaqirish qismi 
        new HtmlWebpackPlugin({ // html
            template: './index.pug' // html faylimiza qayerda joylashganligini yozamiza
        }),
        new MiniCssExtractPlugin({
            filename: 'style/[name].[hash].css'
        })
    ],
    module: {
        rules: [ // wepack uchun qoidalar kiritishga kerak
            {
                test: /\.html$/i,
                loader: 'html-loader'
            },
            {
                test: /\.pug$/i,
                loader: 'pug-loader'
            },
            {
                test: /\.css$/i,
                use: cssLoaders()
            },
            {
                test: /\.s[ac]ss$/i,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.(jpg|png|svg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][hash][ext]'
                }
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][hash][ext]'
                }
            },
            {
                test: /\.js$/i,
                loader: 'babel-loader',
                exclude: /node__modules/ // quyidagi loaderni qayerdan olishini etib beramiza
            }
        ]
    }
}