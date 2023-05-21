import { Locator, Page, expect } from '@playwright/test';

export class CartPage {
  readonly elements: Record<string, Locator>;

  constructor(readonly page: Page) {
    this.elements = {
      cartProducts: this.page.locator('div li'),
      targetProduct: this.page.locator(
        '.cartSection h3:has-text("zara coat 3")',
      ),
      checkoutButton: this.page.locator('text=Checkout'),
    };
  }

  async validateCartProduct() {
    const { cartProducts, targetProduct } = this.elements;

    await cartProducts.first().waitFor();
    const bool = await targetProduct.isVisible();
    expect(bool).toBeTruthy();
  }

  async continueToCheckout() {
    await this.elements.checkoutButton.click();
  }
}
