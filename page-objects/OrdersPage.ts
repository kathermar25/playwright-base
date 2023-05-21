import { Locator, Page } from '@playwright/test';

export class OrdersPage {
  readonly elements: Record<string, Locator>;

  constructor(readonly page: Page) {
    this.elements = {
      ordersList: this.page.locator('tbody tr'),
      orderItems: this.page.locator('tbody tr[class*=star-inserted]'),
      orderDescInput: this.page.locator(
        'tbody tr[class*=star-inserted] [scope="row"]',
      ),
    };
  }

  async validateOrder(orderId) {
    const { ordersList, orderItems, orderDescInput } = this.elements;
    await ordersList.first().waitFor();
    const orderCount = await orderItems.count();
    for (let i = 0; i < orderCount; i++) {
      const orderDesc = await orderDescInput.nth(i).textContent();
      if (orderId.includes(orderDesc)) {
        console.log('ORDER CORRECT');
        await this.elements.ordersList.nth(i).locator('button').first().click();
        break;
      }
    }
  }
}
