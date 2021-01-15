import superagent from "superagent";
import fs from "fs";
import path from "path";
import UrlAnalyzer from "./urlAnalyzer";

export interface Analyzer {
  analyze: (html: string, filePath: string) => string;
}

class Crowller {
  private filePath = path.resolve(__dirname, "../../data/url.json");

  async getRawHtml() {
    const result = await superagent.get(this.url);
    return result.text;
  }

  private writeFile(content: string) {
    fs.writeFileSync(this.filePath, content);
  }

  private async initSpiderProcess() {
    const html = await this.getRawHtml();
    const fileContent = this.analyzer.analyze(html, this.filePath);
    this.writeFile(JSON.stringify(fileContent));
  }

  constructor(private analyzer: Analyzer, private url: string) {
    this.initSpiderProcess();
  }
}
const url = "https://www.hanju.run/play/39257-1-1.html";

const analyzer = UrlAnalyzer.getInstance();
new Crowller(analyzer, url);
