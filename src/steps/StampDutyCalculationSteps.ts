import { Given, When, Then } from '@cucumber/cucumber';
import { ServiceNSWPage } from '../pages/ServiceNSWPage';
import { StampDutyCalculatorPage } from '../pages/RevenueNSW/StampDutyCalculatorPage';

let serviceNSW: ServiceNSWPage;
let stampDuty: StampDutyCalculatorPage;

Given('I am on the Service NSW Stamp Duty page', { timeout: 60000 }, async function (this: any) {
  serviceNSW = new ServiceNSWPage(this.page)
  await serviceNSW.goto();
});

When('I click the Check online button', async function (this: any) {
  await serviceNSW.clickCheckOnlineButton();
  stampDuty = new StampDutyCalculatorPage(this.page);
});

Then('I should be redirected to the Revenue NSW motor vehicle calculator page', async function (this: any) {
  await stampDuty.verifyRedirection();
});

When('I complete the stamp duty form with valid business data', async function (this: any) {
  await stampDuty.fillForm();
});

When('I submit the calculation', async function (this: any) {
  await stampDuty.submitForm();
});

Then('the stamp duty result popup should display correct details', async function (this: any) {
  await stampDuty.verifyPopup();
});
