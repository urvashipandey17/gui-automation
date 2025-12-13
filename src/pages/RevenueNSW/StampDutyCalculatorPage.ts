import { Page, Locator, expect } from '@playwright/test';
import testData from '../../utils/data/testData.json';

export class StampDutyCalculatorPage {
  readonly page: Page;
  readonly vehiclePurchasePrice: Locator;
  readonly calculateButton: Locator;
  readonly modal: Locator;
  readonly modalTitle: Locator;
  readonly sectionTitle: Locator;
  readonly isPassengerVehicle: Locator;
  readonly purchasePrice: Locator;
  readonly dutyPayable: Locator;
  readonly contactUsLink: Locator;
  readonly crossButton: Locator;
  readonly crossIcon: Locator;
  readonly printIcon: Locator;

  data = testData.stampDuty.businessPurchase;

  constructor(page: Page) {
    this.page = page;
    this.page.setDefaultTimeout(60000);
    this.page.setDefaultNavigationTimeout(60000);

    // Form locators
    this.vehiclePurchasePrice = page.locator('#purchasePrice');
    this.calculateButton = page.getByRole('button', { name: 'Calculate' });

    // Popup locators
    this.modal = page.locator('div.confirm-modal'); 
    this.modalTitle = this.modal.locator('.modal-title');
    this.sectionTitle = this.modal.locator('tbody h4');
    this.isPassengerVehicle = this.modal.locator('tr:has(td:text("passenger vehicle")) td.right');
    this.purchasePrice = this.modal.locator('tr:has(td:text("Purchase price or value")) td.right');
    this.dutyPayable = this.modal.locator('tr:has(td:text("Duty payable")) td.right');
    this.contactUsLink = this.modal.getByRole('link', { name: 'Contact us' });
    this.crossButton = this.modal.locator('.modal-footer').getByRole('button', { name: 'Close' });
    this.crossIcon = this.modal.locator('.close');
    this.printIcon = this.modal.locator('.print-icon');
  }

  async verifyRedirection() {
    await expect(this.page).toHaveURL(/erevenue\/calculators\/motorsimple\.php/);
  }

  async fillForm() {
    const radioValue = this.data.vehicleTypePassenger === 'Yes' ? 'Y' : 'N';
    const vehicleTypePassengerRadio = this.page.locator(`label[for="passenger_${radioValue}"]`);
    await vehicleTypePassengerRadio.click();

    await this.vehiclePurchasePrice.fill(this.data.vehiclePurchasePrice);
  }

  async submitForm() {
    await this.calculateButton.click();
  }

  async verifyPopup() {
    const expected = this.data.expectedPopup;
    await this.modal.waitFor({ state: 'visible', timeout: 60000 });
    await expect(this.modalTitle).toHaveText(expected.modalTitle);
    await expect(this.sectionTitle).toHaveText(expected.sectionTitle);
    await expect(this.isPassengerVehicle).toHaveText(expected.isPassengerVehicle);
    await expect(this.purchasePrice).toHaveText(expected.purchasePrice);
    await expect(this.dutyPayable).toHaveText(expected.dutyPayable);
    await expect(this.contactUsLink).toHaveAttribute('href', new RegExp(`^${expected.contactUsUrl}`)); 
    await expect(this.crossButton).toBeVisible();
    await expect(this.crossIcon).toBeVisible();
    await expect(this.printIcon).toBeVisible();
  }
} 
