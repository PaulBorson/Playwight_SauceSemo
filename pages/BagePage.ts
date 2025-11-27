import { Page } from '@playwright/test';
export class Bagepage {
  constructor(public page: Page) {}
  async navigate(path = '') {
    await this.page.goto(path);
  }

  async waitForLoad() {
    await this.page.waitForLoadState('networkidle');
  }
}
