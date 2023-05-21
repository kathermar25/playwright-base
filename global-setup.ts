import { chromium, FullConfig } from '@playwright/test';
import { LoginPage } from './page-objects/LoginPage';

async function globalSetup(config: FullConfig) {
  const { baseURL, storageState } = config.projects[0].use;
  const email = process.env.CLIENT_EMAIL;
  const password = process.env.CLIENT_PASSWORD;

  if (!email || !password) {
    throw new Error(
      'CLIENT_EMAIL and CLIENT_PASSWORD environment variables need to be set',
    );
  }

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  try {
    await context.tracing.start({ screenshots: true, snapshots: true });
    const loginPage = new LoginPage(page);
    await loginPage.goTo(baseURL!);
    await loginPage.validLogin(email, password);
    await page.context().storageState({ path: storageState as string });
    await context.tracing.stop({
      path: './test-results/setup-trace.zip',
    });
  } catch (error) {
    await context.tracing.stop({
      path: './test-results/failed-setup-trace.zip',
    });
    throw error;
  } finally {
    await browser.close();
  }
}

export default globalSetup;
