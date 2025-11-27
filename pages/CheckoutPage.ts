import { Page, Locator } from '@playwright/test';
import { Bagepage } from './BagePage';

export class CheckoutPage extends Bagepage {
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly postalCodeInput: Locator;
    private readonly continueButton: Locator;
    private readonly finishButton: Locator;
    private readonly cancelButton: Locator;
    private readonly ComaplateMessageHeader: Locator;
    private readonly ComalateMessage: Locator; 
    private readonly backtohome : Locator;
    constructor(page: Page) {
        super(page);
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.cancelButton = page.locator('[data-test="cancel"]');
        this.ComaplateMessageHeader = page.locator('.complete-header');
        this.ComalateMessage = page.locator('.complete-text');
        this.backtohome = page.locator('[data-test="back-to-products"]');


    }
    async enterCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }
    async continueCheckout() {
        await this.continueButton.click();
    }
    async finishCheckout() {
        await this.finishButton.click();
    }
    async cancelCheckout() {
        await this.cancelButton.click();
    }
    async getCompleteMessageHeader() {
        return await this.ComaplateMessageHeader.textContent();
    }
    async getCompleteMessage() {
        return await this.ComalateMessage.textContent();
    }
    async backToHome() {
        await this.backtohome.click();
    }
    async isOrderComplete(): Promise<boolean> {
        return await this.ComaplateMessageHeader.isVisible();
    }
    
        
}