var path = require('path');

module.exports = {
    mode: "development",
    entry: './src/index.js',
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.js$/,
            include: path.resolve(__dirname, 'src'),
            use: {
                loader: "babel-loader",
                options: {
                    presets : [
                        ["env", {
                            "targets" : {
                                "browsers" : ["last 2 versions"]
                            },
                            "debug" : false
                        }]
                    ]
                }
            }
        }]
    },
    devServer: {
        static : {
            directory: path.join(__dirname, '/'),
        },
        historyApiFallback : true
    }
}

/*
    ** node project 생성
    1. command >> 해당 위치에서 npm init
    2. npm install webpack --save-dev // webpack 설치
    3. webpack.config.js 설정
    4. 설정에 맞게 경로 및 파일 설정 (entry, output 설정)
    4. npm run start >> (빌드 및 webpack -cli 설치)

    5. npm install babel-preset-env --save-dev >> babel 설치 (브라우저 버전에 맞게 compiling
    6. webpack.config.js > babel 설정 >> rulse 부분
    7. babel core, loader 간의 버전 호환 설정 주의
 */