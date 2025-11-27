import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import * as path from 'path';

const authFile = path.join(__dirname, '../.auth/user.json');

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('https://www.saucedemo.com');

  await loginPage.login('standard_user', 'secret_sauce');

  await page.waitForURL('**/inventory.html');
  await expect(page.locator('.inventory_list')).toBeVisible();

  await page.context().storageState({ path: authFile });
});
