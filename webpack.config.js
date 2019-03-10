const path = require("path"); //노드모듈에 기본적으로 있음. 해당문서 경로를 알아서 찾아줌.
const ExtractCSS = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");

const MODE = process.env.WEBPACK_ENV

const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
// __dirname 은 현재의 프로젝트 디렉토리 이름. 이건 어디에서든 접근가능한 NODEJS전역변수.

const OUTPUT_DIR = path.join(__dirname, "static");
// 출력 디렉토리 장소

const config = {
    entry: ["@babel/polyfill", ENTRY_FILE],
    mode: MODE,
    module: {
        rules: [
            {
                test: /\.(js)$/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            {
                test: /\.(scss)$/,
                use: ExtractCSS.extract([
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins() {
                                return [autoprefixer({ browsers: "cover 99.5%"})]
                            }
                        }
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
                )
            }
        ]
    },
    output: {
        path: OUTPUT_DIR,
        filename: "[name].js"
    },
    plugins: [new ExtractCSS("styles.css")]
};

module.exports = config;