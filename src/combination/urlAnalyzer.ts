import cheerio from "cheerio";
import fs from "fs";
import { Analyzer } from "./crawler";

interface objJson {
  [propName: number]: Info[];
}
interface InfoResult {
  time: number;
  data: Info[];
}
interface Info {
  name: string;
  url: string;
}

export default class UrlAnalyzer implements Analyzer {
  private getJsonInfo(html: string) {
    const $ = cheerio.load(html);
    const info: Info[] = [];
    const scpt: string = String($(".play>script:nth-child(1)").html());
    const url = unescape(
      scpt.split(";")[3].split("(")[1].split(")")[0].replace(/\"/g, "")
    );
    const name: string = String($("title").html());
    info.push({
      name,
      url,
    });
    const result = {
      time: new Date().getTime(),
      data: info,
    };
    return result;
  }

  private getJsonContent(info: InfoResult, filePath: string) {
    let fileContent: objJson = {};
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
    fileContent[info.time] = info.data;
    return fileContent;
  }

  public analyze(html: string, filePath: string) {
    const info = this.getJsonInfo(html);
    console.log(info);
    const fileContent = this.getJsonContent(info, filePath);
    return JSON.stringify(fileContent);
  }
}
