import { test, expect } from '@playwright/test';

// There are better and more specific tools for this type of tests, like: OWASP ZAP, Burp Suite, Nessus, etc

test('Page is served over HTTPS', async ({ page }) => {
  await page.goto('');
  expect(page.url().startsWith('https://')).toBeTruthy;
});

test('Page has Content-Security-Policy header', async ({ page }) => {
  let hasCSP = false;
  page.on('response', (response) => {
    if (response.headers()['content-security-policy']) {
      hasCSP = true;
    }
  });
  await page.reload();
  expect(hasCSP).toBeTruthy;
});

// TODO: Test that won't use the saved storage state
/*
test('Unauthenticated user is redirected to login page', async () => {
  const restrictedPage = new RestrictedPage();
  const page = await restrictedPage.open();
  expect(page.url()).toBe('');
});*/
