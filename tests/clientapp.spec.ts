import { test } from '@playwright/test';
import { testSpecial } from '../fixtures/myFixtures';
import {
  CartPage,
  CheckoutPage,
  DashboardPage,
  OrdersPage,
} from '../page-objects';

testSpecial('Checking cart products', async ({ cartSetup }) => {
  const dashboardPage = new DashboardPage(cartSetup);
  const cartPage = new CartPage(cartSetup);

  await dashboardPage.navigateToCart();
  await cartPage.validateCartProduct();
});

test('@smoke Add product to cart and complete checkout process ', async ({
  page,
}) => {
  const email = process.env.CLIENT_EMAIL;
  const productName = 'zara coat 3';

  const dashboardPage = new DashboardPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const ordersPage = new OrdersPage(page);

  await page.goto('');
  await dashboardPage.searchProduct(productName);
  await dashboardPage.navigateToCart();
  await cartPage.validateCartProduct();
  await cartPage.continueToCheckout();
  await checkoutPage.selectCountry();
  await checkoutPage.validateEmailField(email);
  await checkoutPage.fillPaymentDetails();
  const orderId = await checkoutPage.processPayment();
  await checkoutPage.goToOrdersPage();
  await ordersPage.validateOrder(orderId);
});
