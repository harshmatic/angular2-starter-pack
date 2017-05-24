import { GreatBigAngular2ExamplePage } from './app.po';
import { browser, element, by, protractor } from 'protractor';
declare var $: any;
describe('AppModule', function () {
    let page: GreatBigAngular2ExamplePage;

    beforeEach(async () => {
        return await browser.get('#/admin/app-modules');
    });

    beforeEach(() => {
        page = new GreatBigAngular2ExamplePage();
    });
    it('should check input field', () => {
        var EC = protractor.ExpectedConditions;
        expect<any>(element(by.name('name')).getText()).toEqual('');
    });
    it('should add appmodule', () => {
        var EC = protractor.ExpectedConditions;
        element(by.name('name')).sendKeys("test");
        element(by.name('menuText')).sendKeys("test");
        element(by.name('shortName')).sendKeys("TM");
        element(by.name('submitBtn')).click();
        browser.sleep(500);
        browser.ignoreSynchronization = true;
        expect<any>(element(by.name('name')).getText()).toEqual('');
        browser.sleep(500);
        browser.ignoreSynchronization = false;
    });
});
