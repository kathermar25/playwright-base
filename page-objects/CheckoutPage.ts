import { Locator, Page, expect } from '@playwright/test';

export class CheckoutPage {
  readonly elements: Record<string, Locator>;

  constructor(readonly page: Page) {
    this.elements = {
      countryField: this.page.locator("[placeholder*='Country']"),
      countryDropDown: this.page.locator('.ta-results'),
      emailField: this.page.locator(
        'div[class*="user__name"] label[type="text"]',
      ),
      secureCodeInput: this.page.locator('input[type="text"]').nth(1),
      cardNameInput: this.page.locator('input[type="text"]').nth(2),
      placeOrderButton: this.page.getByText('Place Order'),
      orderIdElement: this.page.locator('label[class="ng-star-inserted"]'),
      ordersButton: this.page.getByRole('button', { name: ' ORDERS' }),
    };
  }

  async selectCountry() {
    const { countryField, countryDropDown } = this.elements;

    await countryField.type('Spa', { delay: 100 });
    await countryDropDown.waitFor();
    const optionsCount = await countryDropDown.locator('button').count();
    for (let i = 0; i < optionsCount; ++i) {
      const text = await countryDropDown.locator('button').nth(i).textContent();
      if (text === ' Spain') {
        await countryDropDown.locator('button').click();
        break;
      }
    }
  }

  async validateEmailField(email: string) {
    await expect(this.elements.emailField).toHaveText(email);
  }

  async fillPaymentDetails() {
    const { secureCodeInput, cardNameInput } = this.elements;

    await secureCodeInput.fill('324');
    await cardNameInput.fill('Kather H');
  }

  async processPayment() {
    const { placeOrderButton, orderIdElement } = this.elements;

    await placeOrderButton.click();
    await expect(orderIdElement).toBeVisible();
    let orderId = await orderIdElement.textContent();
    orderId = orderId?.replace('|', '').trim();
    return orderId;
  }

  async goToOrdersPage() {
    await this.elements.ordersButton.click();
  }
}
