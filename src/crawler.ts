import superagent from "superagent";
import cheerio from "cheerio";
import fs from "fs";
import path from "path";

interface objJson {
  [propName: number]: Info[];
}

interface Info {
  name: string;
  url: string;
}

interface InfoResult {
  time: number;
  data: Info[];
}

class Crawler {
  private url = "https://www.hanju.run/play/39221-4-0.html";

  getJsonInfo(html: string) {
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

  async getRawHtml() {
    const result = await superagent.get(this.url);
    return result.text;
  }

  getJsonContent(info: InfoResult) {
    const filePath = path.resolve(__dirname, "../data/url.json");
    let fileContent: objJson = {};
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
    fileContent[info.time] = info.data;
    fs.writeFileSync(filePath, JSON.stringify(fileContent));
  }

  async initSpiderProcess() {
    const html = await this.getRawHtml();
    const info = this.getJsonInfo(html);
    console.log(info);
    this.getJsonContent(info);
  }

  constructor() {
    this.initSpiderProcess();
  }
}

const crawler = new Crawler();
