class UserServiceClass {
  URL_BASE: string;

  constructor() {
    this.URL_BASE = process.env.NEXT_PUBLIC_URL_BASE as string;
  }
  async create(body: any): Promise<any> {
    var response = await fetch(this.URL_BASE + "/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    var json = await response.json();
    return { data: json, status: response.status };
  }

  async get(): Promise<any> {
    var response = await fetch(this.URL_BASE + "/api/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((value) => value.json());

    const data = response;
    return { data: data, status: response.status };
  }

  async getUserById(id: string): Promise<any> {
    var response = await fetch(this.URL_BASE + "api/user/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((value) => value.json());

    return { data: response, status: response.status };
  }

  async sendReport(body: any): Promise<any> {
    var response = await fetch(this.URL_BASE + "/api/report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((value) => value.json());

    const data = response;
    return { data: data, status: response.status };
  }
  async sendResetPassword(email: any): Promise<any> {
    var response = await fetch(
      this.URL_BASE + "/api/user/reset-password/" + email,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((value) => value.json());

    const data = response;
    return { data: data, status: response.status };
  }

  async updatePassword(newPassword: string, uid: string): Promise<any> {
    var response = await fetch(
      this.URL_BASE + "/api/user/reset-password/reset?ud=" + uid,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword }),
      }
    ).then((value) => value.json());

    const data = response;
    return { data: data, status: response.status };
  }

  async checkToken(uid: any, token: string): Promise<any> {
    var response = await fetch(
      this.URL_BASE +
        "/api/user/reset-password/check?wtk=" +
        token +
        "&ud=" +
        uid,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((value) => value.json());

    const data = response;
    return { data: data, status: response.status };
  }
}

var UserService = new UserServiceClass();
export default UserService;
