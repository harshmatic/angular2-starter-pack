import { GreatBigAngular2ExamplePage } from './app.po';
import { browser, element, by, protractor } from 'protractor';
declare var $: any;
describe('Department', function () {
    let page: GreatBigAngular2ExamplePage;

    beforeEach(async () => {
        return await browser.get('#/department');
    });

    beforeEach(() => {
        page = new GreatBigAngular2ExamplePage();
    });
    it('should check input field', () => {
        var EC = protractor.ExpectedConditions;
        expect<any>(element(by.name('departmentName')).getText()).toEqual('');
    });
    it('should add department', () => {
        var EC = protractor.ExpectedConditions;
        element(by.name('departmentName')).sendKeys("test");
        element(by.name('departmentDespcription')).sendKeys("test");
        element(by.name('submit')).click();
        browser.sleep(500);
        browser.ignoreSynchronization = true;
        expect<any>(element(by.name('departmentName')).getText()).toEqual('');
        browser.sleep(500);
        browser.ignoreSynchronization = false;

    });
});
