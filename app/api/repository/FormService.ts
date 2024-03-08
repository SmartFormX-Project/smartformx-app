import { AppFetch } from "./fetch";

class FormsServiceClass {
  private URL_BASE: string;

  constructor() {
    this.URL_BASE = "/forms";
  }

  // router.post("/", CreateSmartForm);
  // router.get("/:bid", handler.fetchForms);
  // router.get("/single/:formId", handler.fetchFormById);
  // router.post("/:formId", handler.createFormAnswears);
  // router.patch("/:formId", handler.closeForm);
  // router.patch("/entrances/:shortFormId", handler.incrementFormEntrance);

  FetchSingleFormURL(formId: string) {
    return this.URL_BASE + "/single/" + formId;
  }
  FetchQuestionDataURL(formId: string) {
    return this.URL_BASE + "/quest/" + formId;
  }
  FetchFormAnsURL(formId: string) {
    return this.URL_BASE + "/ans/" + formId;
  }
  FetchAllFormsURL() {
    return this.URL_BASE + "/";
  }
  FetchClientFormURL(shortId: string) {
    return this.URL_BASE + "/client/" + shortId;
  }

  async createForm(body: any) {
    var response = await AppFetch(this.URL_BASE + "/", {
      method: "POST",
      body: JSON.stringify(body),
    });
    // const data = await response.json();
    return response;
  }

  async saveAnswears(
    body: any,
    id: string
  ): Promise<{ data: any; status: any }> {
    var response = await fetch(
      (process.env.BACKEND_URL as string) + this.URL_BASE + "/" + id,
      {
        method: "POST",
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    return { data: data, status: response.status };
  }

  async updateFormEntrances(id: string): Promise<{ data: any; status: any }> {
    var response = await fetch(
      (process.env.BACKEND_URL as string) + this.URL_BASE + "/entrances/" + id,
      {
        method: "PATCH",
        body: JSON.stringify({}),
      }
    );

    const data = await response.json();
    return { data: data, status: response.status };
  }

  async updateFormStatus(
    id: string,
    status: string
  ): Promise<{ data: any; status: any }> {
    var response = await AppFetch(this.URL_BASE + "/" + id, {
      method: "PATCH",
      body: JSON.stringify({status})
    });

    const data = await response.json();
    return { data: data, status: response.status };
  }
}

var FormsService = new FormsServiceClass();
export default FormsService;
