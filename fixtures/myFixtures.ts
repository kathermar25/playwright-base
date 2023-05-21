import { test as base, Page } from '@playwright/test';
import { DashboardPage } from '../page-objects';

type MyFixtures = {
  cartSetup: Page;
};

export const testSpecial = base.extend<MyFixtures>({
  cartSetup: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);

    await page.goto('');
    await dashboardPage.addProductToCart();
    await use(page);
  },
});

export { expect } from '@playwright/test';
