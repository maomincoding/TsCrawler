import superagent from "superagent";
import fs from "fs";
import path from "path";
import UrlAnalyzer from "./urlAnalyzer";

export interface Analyzer {
  analyze:(html:string,filePath:string,date:string) => string
}

class Crowller {
  private filePath = path.resolve(__dirname, "../data/url.json");

  async getRawHtml() {
    const result = await superagent.get(this.url);
    return result.text;
  }

  writeFile(content: string) {
    fs.writeFileSync(this.filePath, content);
  }

  async initSpiderProcess() {
    const html = await this.getRawHtml();
    const date = new Date().getTime().toString();
    const fileContent = this.analyzer.analyze(html, this.filePath, date);
    this.writeFile(JSON.stringify(fileContent));
  }

  constructor(private analyzer: Analyzer, private url: string) {
    this.initSpiderProcess();
  }
}
const url ="http://www.kp980.com/kehuanpian/heiyiren_quanqiuzhuiji/play-0-0.html";

const analyzer = new UrlAnalyzer();
new Crowller(analyzer,url);
