import { AppFetch } from "./fetch";

class UserServiceClass {
  private URL_BASE: string;

  constructor() {
    this.URL_BASE = (process.env.NEXT_PUBLIC_BACKEND_URL as string) + "/user";
  }
  async getUserById(): Promise<any> {
    var response = await AppFetch(this.URL_BASE, {
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
      this.URL_BASE + "/api/user/reset-password/reset?uid=" + uid,
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

  async getCheckTokenURL(uid: any, token: string): Promise<string> {
   
    return (
      this.URL_BASE +
      "/api/user/reset-password/check?wtk=" +
      token +
      "&uid=" +
      uid
    );
    // const data = response;
    // return { data: data, status: response.status };
  }
}

var UserService = new UserServiceClass();
export default UserService;
