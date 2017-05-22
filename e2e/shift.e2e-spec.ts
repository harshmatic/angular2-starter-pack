import { GreatBigAngular2ExamplePage } from './app.po';
import { browser, element, by, protractor } from 'protractor';
declare var $: any;
describe('Shift', function () {
    let page: GreatBigAngular2ExamplePage;

    beforeEach(async () => {
        return await browser.get('#/shift');
    });

    beforeEach(() => {
        page = new GreatBigAngular2ExamplePage();
    });
    it('should display message saying enter mandetory fields', () => {
        var EC = protractor.ExpectedConditions;
        element(by.name('shiftName')).sendKeys("");
        element(by.name('submit')).click();
        expect<any>(element(by.name('shiftError')).getText()).toEqual("Please enter Shift Name");
    });
    it('should add Shift', () => {
        var EC = protractor.ExpectedConditions;
        element(by.name('shiftName')).sendKeys("Afternoon"); 
        //element(by.name('startTime')).sendKeys("Thu May 18 2017 08:00:00 GMT+0530 (India Standard Time)");
        //element(by.name('endTime')).sendKeys("Thu May 18 2017 08:00:00 GMT+0530 (India Standard Time)");
        element(by.name('submit')).click();
        browser.sleep(500);
        browser.ignoreSynchronization = true;
        //expect<any>(element(by.css('p-growl .ui-growl-message p')).getText()).toEqual("Shift Added");
        browser.sleep(500);
        browser.ignoreSynchronization = false;

    });
    it('should Edit Shift', () => {
        var EC = protractor.ExpectedConditions;
        element.all(by.name('edit')).first().click();
        element(by.name('shiftName')).sendKeys("");
        element(by.name('shiftName')).sendKeys(" shift");
        //element(by.name('startTime')).sendKeys("Thu May 18 2017 08:00:00 GMT+0530 (India Standard Time)");
        //element(by.name('endTime')).sendKeys("Thu May 18 2017 08:00:00 GMT+0530 (India Standard Time)");
        element(by.name('submit')).click();
        browser.sleep(500);
        browser.ignoreSynchronization = true;
        //expect<any>(element(by.css('p-growl .ui-growl-message p')).getText()).toEqual("Occurence type updated");
        browser.sleep(500);
        browser.ignoreSynchronization = false;

    });
});
