"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio_1 = __importDefault(require("cheerio"));
var fs_1 = __importDefault(require("fs"));
var UrlAnalyzer = /** @class */ (function () {
    function UrlAnalyzer() {
    }
    UrlAnalyzer.getInstance = function () {
        if (!UrlAnalyzer.instance) {
            UrlAnalyzer.instance = new UrlAnalyzer();
        }
        return UrlAnalyzer.instance;
    };
    UrlAnalyzer.prototype.getJsonInfo = function (html) {
        var $ = cheerio_1.default.load(html);
        var info = [];
        var scpt = String($(".play>script:nth-child(1)").html());
        var url = unescape(scpt.split(";")[3].split("(")[1].split(")")[0].replace(/\"/g, ""));
        var name = String($("title").html());
        info.push({
            name: name,
            url: url,
        });
        var result = {
            time: new Date().getTime(),
            data: info,
        };
        return result;
    };
    UrlAnalyzer.prototype.getJsonContent = function (info, filePath) {
        var fileContent = {};
        if (fs_1.default.existsSync(filePath)) {
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
        }
        fileContent[info.time] = info.data;
        return fileContent;
    };
    UrlAnalyzer.prototype.analyze = function (html, filePath) {
        var info = this.getJsonInfo(html);
        console.log(info);
        var fileContent = this.getJsonContent(info, filePath);
        return JSON.stringify(fileContent);
    };
    return UrlAnalyzer;
}());
exports.default = UrlAnalyzer;
