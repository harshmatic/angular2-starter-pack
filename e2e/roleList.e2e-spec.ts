import { GreatBigAngular2ExamplePage } from './app.po';
import { browser, element, by, protractor } from 'protractor';
declare var $: any;
describe('RoleList', function () {
    let page: GreatBigAngular2ExamplePage;

    beforeEach(async () => {
        return await browser.get('#/roles');
    });

    beforeEach(() => {
        page = new GreatBigAngular2ExamplePage();
    });
    it('should check input field', () => {
        var EC = protractor.ExpectedConditions;
        expect<any>(element(by.name('roleName')).getText()).toEqual('');
    });
    it('should add department', () => {
        var EC = protractor.ExpectedConditions;
        element(by.name('roleName')).sendKeys("test");
        element(by.name('submit')).click();
        browser.sleep(500);
        browser.ignoreSynchronization = true;
        expect<any>(element(by.name('roleName')).getText()).toEqual('');
        browser.sleep(500);
        browser.ignoreSynchronization = false;

    });
});
