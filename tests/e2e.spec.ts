import { test, expect } from '@playwright/test';

import { Bagepage } from '../pages/BagePage';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/Inventory';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('End-to-End Tests', () => {

    test('Complete Flow E2E', async ({ page }) => {
        //Login Page
        const loginPage = new LoginPage(page);
        await loginPage.navigate('https://www.saucedemo.com/');
        await loginPage.waitForLoad();
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');



        //add to cart from Inventory Page
        const inventory = new InventoryPage(page);
        await expect(page.locator('.inventory_list')).toBeVisible();

        await inventory.addProductToCart('Sauce Labs Backpack');
        await inventory.addProductToCart('Sauce Labs Bike Light');

        let cartItemCount = await inventory.getCartItemCount();
        expect(cartItemCount).toBe(2);


        //Go to Cart Page
        await inventory.gotoCart();
        const cartPage = new CartPage(page);
        const itemCountInCart = await cartPage.getcartItemsCount();
        expect(itemCountInCart).toBe(2);


        //proceed to Checkout Page
        await cartPage.proceedtoCheckout();

        // fill Checkout Page
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.enterCheckoutInformation('John', 'Doe', '12345');
        await checkoutPage.continueCheckout();

        // Finish Checkout
        await checkoutPage.finishCheckout();
        
        // Verify order completion
        const completionMessage = await checkoutPage.getCompleteMessageHeader();
        expect(completionMessage).toContain('Thank you for your order!');


        await checkoutPage.backToHome();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        



    });
    test( "Remove products add to cart", async ({ page }) => {
        //Login Page
        const loginPage = new LoginPage(page);
        await loginPage.navigate('https://www.saucedemo.com/');
        await loginPage.waitForLoad();
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

        
        //add to cart from Inventory Page
        const inventory = new InventoryPage(page);
        await expect(page.locator('.inventory_list')).toBeVisible();

        await inventory.addProductToCart('Sauce Labs Backpack');
        await inventory.addProductToCart('Sauce Labs Bike Light');

        let cartItemCount = await inventory.getCartItemCount();
        expect(cartItemCount).toBe(2);

        await inventory.gotoCart();

        const cartPage = new CartPage(page);
        await cartPage.removeItemByProductName('Sauce Labs Backpack');

        let itemCountInCart = await cartPage.getcartItemsCount();
        expect(itemCountInCart).toBe(1);
    });








});