import superagent from 'superagent'

class Crowller {
  private url = "http://www.kp980.com/";
  private rawHtml = "";
  async getRawHtml() {
    const result = await superagent.get(this.url);
    this.rawHtml = result.text;
    console.log(result.text);
  }
  constructor() {
    this.getRawHtml();
  }
}

const crowller = new Crowller();