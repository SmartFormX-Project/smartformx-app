class SmartFormServiceClass {
  private URL_BASE: string;
  public URL_FETCH_CLIENT_FORM: string;
  public URL_GET_FORM_SERVER: string;
  public URL_GET_FORMS: string;

  constructor() {
    this.URL_BASE = process.env.NEXT_PUBLIC_URL_BASE as string;
    this.URL_FETCH_CLIENT_FORM =
      (process.env.NEXT_PUBLIC_URL_BASE as string) + "/api/form/client/";
    this.URL_GET_FORM_SERVER =
      (process.env.NEXT_PUBLIC_URL_BASE as string) + "/api/form/by/";
    this.URL_GET_FORMS =
      (process.env.NEXT_PUBLIC_URL_BASE as string) + "/api/form/";
  }

  async createForm(body: any): Promise<{ data: any; status: any }> {
    var response = await fetch(this.URL_BASE + "/api/form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return { data: data, status: response.status };
  }

  async getForms(businessId: string): Promise<{ data: any; status: any }> {
    if (businessId == "") return { data: [], status: 403 };

    var response = await fetch(this.URL_BASE + "/api/form/" + businessId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.url);

    const data = await response.json();
    return { data: data, status: response.status };
  }

  async getFormById(id: string): Promise<{ data: any; status: any }> {
    const URL = this.URL_BASE + "/api/form/by/" + id;
    var response = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    return { data: data, status: response.status };
  }

  async saveAnswears(
    body: any,
    id: string
  ): Promise<{ data: any; status: any }> {
    var response = await fetch(this.URL_BASE + "/api/form/client/" + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return { data: data, status: response.status };
  }
  async updateFormRange(id: string): Promise<{ data: any; status: any }> {
    var response = await fetch(this.URL_BASE + "/api/form/client/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    const data = await response.json();
    return { data: data, status: response.status };
  }

  async updateFormStatus(
    id: string,
    status: string
  ): Promise<{ data: any; status: any }> {
    var response = await fetch(this.URL_BASE + "/api/form/by/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(status),
    });

    const data = await response.json();
    return { data: data, status: response.status };
  }

  async createAnalyses(formId: any): Promise<{ data: any; status: any }> {
    var response = await fetch(this.URL_BASE + "/api/form/analyse/" + formId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return { data: data, status: response.status };
  }
  async checkAnalyseStatus(
    formId: any,
    status: string
  ): Promise<{ data: any; status: any }> {
    var response = await fetch(
      this.URL_BASE + "/api/form/analyse/" + formId + "/" + status,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    return { data: data, status: response.status };
  }
}

var SmartFormService = new SmartFormServiceClass();
export default SmartFormService;
