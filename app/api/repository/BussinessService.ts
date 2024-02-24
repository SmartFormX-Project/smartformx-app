import { AppFetch } from "./fetch";

class businessServiceClass {
  private URL_BASE: string;

  constructor() {
    this.URL_BASE = "/bus";
  }

  getBusinessURL(){
    return this.URL_BASE + "/";
  }
  // async create(body: any): Promise<any> {
  //   var response = await fetch(this.URL_BASE + "/api/business", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(body),
  //   }).then((value) => value.json());

  //   const data = response;
  //   return { data: data, status: response.status };
  // }
  async getBusinessDetails(): Promise<any> {
    var response = await AppFetch(this.URL_BASE + "/" , {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((value) => value.json());

    const data = response;
    return { data: data, status: response.status };
  }
}

var businessService = new businessServiceClass();
export default businessService;
