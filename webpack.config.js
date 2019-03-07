const path = require("path"); //노드모듈에 기본적으로 있음. 해당문서 경로를 알아서 찾아줌.

const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
// __dirname 은 현재의 프로젝트 디렉토리 이름. 이건 어디에서든 접근가능한 NODEJS전역변수.

const OUTPUT_DIR = path.join(__dirname, "static");
// 출력 디렉토리 장소

const config = {
    entry: ENTRY_FILE,
    output: {
        path: OUTPUT_DIR,
        filename: "[name].[format]"
    }
};

module.exports = config;