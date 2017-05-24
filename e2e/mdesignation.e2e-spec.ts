import { GreatBigAngular2ExamplePage } from './app.po';
import { browser, element, by, protractor } from 'protractor';
declare var $: any;
describe('Designation', function () {
    let page: GreatBigAngular2ExamplePage;

    beforeEach(async () => {
        return await browser.get('#/designation');
    });

    beforeEach(() => {
        page = new GreatBigAngular2ExamplePage();
    });
    it('should check input field', () => {
        var EC = protractor.ExpectedConditions;
        expect<any>(element(by.name('designationName')).getText()).toEqual('');
    });
    it('should add department', () => {
        var EC = protractor.ExpectedConditions;
        element(by.name('designationName')).sendKeys("test");
        element(by.name('designationCode')).sendKeys("test");
        element(by.name('submitBtn')).click();
        browser.sleep(500);
        browser.ignoreSynchronization = true;
        expect<any>(element(by.name('designationName')).getText()).toEqual('');
        browser.sleep(500);
        browser.ignoreSynchronization = false;

    });
     it('should update department', () => {
        var EC = protractor.ExpectedConditions;
        element.all(by.name('edit')).first().click();
        element(by.name('designationName')).sendKeys("test");
        element(by.name('designationCode')).sendKeys("test");
        element(by.name('submitBtn')).click();
        browser.sleep(5000);
        browser.ignoreSynchronization = true;
        expect<any>(element(by.name('designationName')).getText()).toEqual('');
        browser.sleep(5000);
        browser.ignoreSynchronization = false;
    });
});
