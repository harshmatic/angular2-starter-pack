import { GreatBigAngular2ExamplePage } from './app.po';
import { browser, element, by, protractor } from 'protractor';
declare var $: any;
describe('Status', function () {
    let page: GreatBigAngular2ExamplePage;

    beforeEach(async () => {
        return await browser.get('#/ot');
    });

    beforeEach(() => {
        page = new GreatBigAngular2ExamplePage();
    });
    it('should display message saying enter mandetory fields', () => {
        var EC = protractor.ExpectedConditions;
        element(by.name('ot')).sendKeys("");
        element(by.name('submit')).click();
        expect<any>(element(by.name('otError')).getText()).toEqual("Please enter occurence type");
    });
    it('should add Occurence Type', () => {
        var EC = protractor.ExpectedConditions;
        element(by.name('ot')).sendKeys("Assault");
        element(by.name('submit')).click();
        browser.sleep(500);
        browser.ignoreSynchronization = true;
        expect<any>(element(by.css('p-growl .ui-growl-message p')).getText()).toEqual("Occurence type added");
        browser.sleep(500);
        browser.ignoreSynchronization = false;

    });
    it('should Edit Occurence Type', () => {
        var EC = protractor.ExpectedConditions;
        element.all(by.name('edit')).first().click();
        element(by.name('ot')).sendKeys("");
        element(by.name('ot')).sendKeys(" Crime");
        element(by.name('submit')).click();
        browser.sleep(500);
        browser.ignoreSynchronization = true;
        expect<any>(element(by.css('p-growl .ui-growl-message p')).getText()).toEqual("Occurence type updated");
        browser.sleep(500);
        browser.ignoreSynchronization = false;

    });
    it('should Delete status', () => {
        var EC = protractor.ExpectedConditions;
        element.all(by.name('delete')).first().click();
        browser.sleep(500);
        browser.ignoreSynchronization = true;
        expect<any>(element(by.css('p-growl .ui-growl-message p')).getText()).toEqual("Occcurence type deleted");
        browser.sleep(500);
        browser.ignoreSynchronization = false;

    });
});
