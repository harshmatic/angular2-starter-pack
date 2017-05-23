import { GreatBigAngular2ExamplePage } from './app.po';
import { browser, element, by, protractor } from 'protractor';
declare var $: any;
describe('Status', function () {
    let page: GreatBigAngular2ExamplePage;

    beforeEach(async () => {
        return await browser.get('#/status/status-list');
    });

    beforeEach(() => {
        page = new GreatBigAngular2ExamplePage();
    });
    it('should display message saying enter mandetory fields', () => {
        var EC = protractor.ExpectedConditions;
        element(by.name('statusName')).sendKeys("");
        element(by.name('submit')).click();
        expect<any>(element(by.name('statusError')).getText()).toEqual("Please enter Status Name");
    });
    it('should add status', () => {
        var EC = protractor.ExpectedConditions;
        element(by.name('statusName')).sendKeys("Assign");
        element(by.name('submit')).click();
        browser.sleep(500);
        browser.ignoreSynchronization = true;
        expect<any>(element(by.css('p-growl .ui-growl-message p')).getText()).toEqual("Status Added");
        browser.sleep(500);
        browser.ignoreSynchronization = false;

    });
    it('should Edit status', () => {
        var EC = protractor.ExpectedConditions;
        element.all(by.name('edit')).first().click();
        element(by.name('statusName')).sendKeys("");
        element(by.name('statusName')).sendKeys(" done");
        element(by.name('submit')).click();
        browser.sleep(500);
        browser.ignoreSynchronization = true;
        expect<any>(element(by.css('p-growl .ui-growl-message p')).getText()).toEqual("Status Updated");
        browser.sleep(500);
        browser.ignoreSynchronization = false;

    });
    it('should Delete status', () => {
        var EC = protractor.ExpectedConditions;
        element.all(by.name('delete')).first().click();
        browser.sleep(500);
        browser.ignoreSynchronization = true;
        expect<any>(element(by.css('p-growl .ui-growl-message p')).getText()).toEqual("Status Deleted");
        browser.sleep(500);
        browser.ignoreSynchronization = false;

    });
});
