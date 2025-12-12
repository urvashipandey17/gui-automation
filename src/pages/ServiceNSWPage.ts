import { Page, Locator } from '@playwright/test';

export class ServiceNSWPage {
  readonly page: Page;

  // Define locators once
  private vehicleRegistrationsTile: Locator;
  private checkOnlineButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.vehicleRegistrationsTile = page.locator('div.tile__heading:has-text("Check motor vehicle stamp duty")');
    this.checkOnlineButton = page.getByRole('button', { name : /^Check online/ });
  }

  async goto() {
    //Go to the vehicle registrations landing page
    await this.page.goto('https://www.service.nsw.gov.au/services/vehicle-registrations');

    //Click the "Check motor vehicle stamp duty" tile
    await this.vehicleRegistrationsTile.click();

    //Wait for the stamp duty calculator page
    await this.page.waitForURL(/check-motor-vehicle-stamp-duty/);
  }

  async clickCheckOnlineButton() {
    await this.checkOnlineButton.click();
  }
}
