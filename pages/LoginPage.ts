import { Page, Locator } from '@playwright/test';
import { Bagepage } from './BagePage';
export class LoginPage extends Bagepage {
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly errorMessage: Locator;
    

    constructor(page: Page) {
        super(page);
        // selectors matching saucedemo DOM
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.errorMessage = page.locator('[data-test="error"]');    
        
    }

    async login(username: string, password: string) {
        // wait for inputs to be visible before interacting to avoid flaky timeouts
        await this.usernameInput.waitFor({ state: 'visible', timeout: 10000 });
        await this.usernameInput.fill(username, { timeout: 10000 });
        await this.passwordInput.waitFor({ state: 'visible', timeout: 10000 });
        await this.passwordInput.fill(password, { timeout: 10000 });
        await this.loginButton.click();

    }

    async getErrorMessage(): Promise<string> {
        return await this.errorMessage.textContent() || '';
    }

    async isLoginButtonVisible(): Promise<boolean> {
        return await this.loginButton.isVisible();
    }





}   

