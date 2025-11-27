import { Page, Locator } from '@playwright/test';
import { Bagepage } from './BagePage';

export class CartPage extends Bagepage {
  private readonly cartItems: Locator;
  private readonly checkoutButton: Locator;
  private readonly continueShoppingButton: Locator;
  private readonly removeButtons: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('#checkout');
    this.continueShoppingButton = page.locator('#continue-shopping');
    this.removeButtons = page.locator('[data-test^="remove-"]');
  }
  async getcartItemsCount(): Promise<number> {
    return await this.cartItems.count();
  }
  async proceedtoCheckout() {
    await this.checkoutButton.click();
  }
  async continueShopping() {
    await this.continueShoppingButton.click();
  }
  async removeItem(number: number) {
    await this.removeButtons.nth(number).click();
  }
  async removeallItems() {
    const itemCount = await this.getcartItemsCount();
    for (let i = 0; i < itemCount; i++) {
      await this.removeItem(i);
    }
  }
}
