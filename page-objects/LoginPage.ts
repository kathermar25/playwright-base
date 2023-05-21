import { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly elements: Record<string, Locator>;

  constructor(readonly page: Page) {
    this.page = page;
    this.elements = {
      signIdButton: this.page.locator('#login'),
      userEmailInput: this.page.locator('#userEmail'),
      userPasswordInput: this.page.locator('#userPassword'),
    };
  }

  async goTo(url: string) {
    await this.page.goto(url);
  }

  async validLogin(userEmail: string, userPassword: string) {
    const { signIdButton, userEmailInput, userPasswordInput } = this.elements;

    await userEmailInput.fill(userEmail);
    await userPasswordInput.fill(userPassword);
    await signIdButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}
