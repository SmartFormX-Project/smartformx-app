class businessServiceClass {
  private URL_BASE: string;
  public URL_FETCH_BUSINESS: string;

  constructor() {
    this.URL_BASE = process.env.NEXT_PUBLIC_URL_BASE as string;
    this.URL_FETCH_BUSINESS =
      (process.env.NEXT_PUBLIC_URL_BASE as string) + "/api/business/";
  }
  async create(body: any): Promise<any> {
    var response = await fetch(this.URL_BASE + "/api/business", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((value) => value.json());

    const data = response;
    return { data: data, status: response.status };
  }
  async getBusinessDatails(bus_id: string): Promise<any> {
    var response = await fetch(this.URL_BASE + "/api/business/" + bus_id, {
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
