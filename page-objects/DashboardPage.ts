import { Locator, Page } from '@playwright/test';

export class DashboardPage {
  readonly elements: Record<string, Locator>;

  constructor(readonly page: Page) {
    this.page = page;
    this.elements = {
      products: this.page.locator('.card'),
      cart: this.page.getByRole('button', { name: ' Cart' }),
    };
  }

  async searchProduct(productName) {
    const count = await this.elements.products.count();

    for (let i = 0; i < count; ++i) {
      if (
        (await this.elements.products.nth(i).locator('b').textContent()) ===
        productName
      ) {
        await this.elements.products
          .nth(i)
          .locator('text= Add To Cart')
          .click();
        break;
      }
    }
  }

  async addProductToCart() {
    await this.elements.products.nth(0).locator('text= Add To Cart').click();
  }

  async navigateToCart() {
    await this.elements.cart.click();
  }
}
