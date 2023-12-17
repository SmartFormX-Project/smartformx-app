class PaymentServiceClass {
  private URL_BASE: string;
  public URL_BASE_PLANS: string;

  constructor() {
    this.URL_BASE = process.env.NEXT_PUBLIC_URL_BASE as string;
    this.URL_BASE_PLANS =
      process.env.NEXT_PUBLIC_URL_BASE + "/api/payment/plans";
  }
  async goToCheckout(
    email: any,
    PRICE_ID: string,
    metadata: any,
    recurring: any
  ): Promise<any> {
    var response = await fetch(this.URL_BASE + "/api/payment/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, PRICE_ID, metadata, recurring }),
    }).then((value) => value.json());

    const data = response;
    return { data: data, status: response.status };
  }

  async goToStripeCustomerPortal(uid: string): Promise<any> {
    var response = await fetch(
      this.URL_BASE + "/api/payment/customer_portal/" + uid,
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
  async fetchPlansAndPrices(): Promise<any> {
    var response = await fetch(this.URL_BASE + "/api/payment/plans", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((value) => value.json());

    const data = response;
    return { data: data, status: response.status };
  }
}

var PaymentService = new PaymentServiceClass();
export default PaymentService;
