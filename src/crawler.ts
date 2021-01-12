import superagent from "superagent";
import cheerio from "cheerio";
import fs from "fs";
import path from "path";

interface objJson {
  [propName:string]:string
}

class Crowller {
  private url = "http://www.kp980.com/kehuanpian/gangtiexia2/play-0-0.html";

  getJsonInfo(html: string) {
    const $ = cheerio.load(html);
    const scpt: string = String(
      $(".stui-player__iframe>script:nth-child(1)").html()
    );
    return unescape(scpt.split(";")[3].split("(")[1].split(")")[0]);
  }

  async getRawHtml() {
    const result = await superagent.get(this.url);
    return result.text;
  }
  getJsonContent(url: string) {
    const filePath = path.resolve(__dirname, "../data/url.json");
    let fileContent: objJson = {};
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
    fileContent[this.url] = url;
    fs.writeFileSync(filePath, JSON.stringify(fileContent));
  }
  async initSpiderProcess() {
    const html = await this.getRawHtml();
    const url = this.getJsonInfo(html);
    this.getJsonContent(url);
    console.log(url);
  }

  constructor() {
    this.initSpiderProcess();
  }
}

const crowller = new Crowller();
