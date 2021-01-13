import cheerio from "cheerio";
import fs from "fs";
import { Analyzer } from "./crawler";

interface objJson {
  [propName: string]: string;
}

export default class UrlAnalyzer implements Analyzer{
  private getJsonInfo(html: string) {
    const $ = cheerio.load(html);
    const scpt: string = String(
      $(".stui-player__iframe>script:nth-child(1)").html()
    );
    return unescape(scpt.split(";")[3].split("(")[1].split(")")[0]);
  }

  getJsonContent(url: string, filePath: string, date:string) {
    let fileContent: objJson = {};
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
    fileContent[date] = url;
    return fileContent;
  }

  public analyze(html: string, filePath: string, date:string) {
    const url = this.getJsonInfo(html);
    console.log(url);
    const fileContent = this.getJsonContent(url, filePath, date);
    return JSON.stringify(fileContent);
  }
}