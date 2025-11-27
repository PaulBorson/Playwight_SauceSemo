import { Page, Locator } from '@playwright/test';
import { Bagepage } from './BagePage';

export class InventoryPage extends Bagepage {
  private readonly inventoryContainer: Locator;
  private readonly shoppingCartBadge: Locator;
  private readonly shoppingCartLink: Locator;
  private readonly menuButton: Locator;
  private readonly logoutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.inventoryContainer = page.locator('.inventory_container');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.menuButton = page.locator('.bm-burger-button');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async addProductToCart(productName: string) {
    // Locate the inventory item that contains the exact product name
    const productCard = this.page.locator('.inventory_item', {
      has: this.page.locator('.inventory_item_name', { hasText: productName }),
    });
    // Click the add-to-cart button for that specific product
    await productCard.locator('[data-test^="add-to-cart"]').first().click();
  }
  async addProductstoCartNumbers(index: number) {
    const addtocartbuttons = this.page.locator('[data-test^="add-to-cart"]');
    await addtocartbuttons.nth(index).click();
  }

  async getCartItemCount(): Promise<number> {
    if (await this.shoppingCartBadge.isVisible()) {
      const itemCountText = await this.shoppingCartBadge.textContent();
      return parseInt(itemCountText || '0');
    }
    return 0;
  }

  async gotoCart() {
    await this.shoppingCartLink.click();
  }
  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }

  async isInventoryPageVisible(): Promise<boolean> {
    return await this.inventoryContainer.isVisible();
  }
}
