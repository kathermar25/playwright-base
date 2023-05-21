import { expect } from '@playwright/test';

// debug para APIS, command + up arrow + p = Debug: debug npm script

export class ApiUtils {
  constructor(public apiContext, public loginPayload: object) {
    (this.apiContext = apiContext), (this.loginPayload = loginPayload);
  }

  public async getToken() {
    const loginResponse = await this.apiContext.post(
      'https://rahulshettyacademy.com/api/ecom/auth/login',
      {
        data: this.loginPayload,
      },
    );
    expect(loginResponse.ok).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    let token: string = loginResponseJson.token;
    console.log(token);
    return token;
  }

  public async createOrder(orderPayload: object) {
    const orderResponse = await this.apiContext.post(
      'https://rahulshettyacademy.com/api/ecom/order/create-order',
      {
        data: orderPayload,
        headers: {
          Authorization: await this.getToken(),
          'Content-Type': 'application/json',
        },
      },
    );

    expect(orderResponse.ok).toBeTruthy();
    const orderResponseJson = await orderResponse.json();
    let orderId: string = orderResponseJson.orders[0];
    console.log(orderId);
    return orderId;
  }
}
