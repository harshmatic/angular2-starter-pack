import { GreatBigAngular2ExamplePage } from './app.po';
import { browser, element, by, protractor } from 'protractor';
declare var $: any;
describe('RoleList', function () {
    let page: GreatBigAngular2ExamplePage;

    beforeEach(async () => {
        return await browser.get('#/admin/roles');
    });

    beforeEach(() => {
        page = new GreatBigAngular2ExamplePage();
    });
    it('should check input field', () => {
        var EC = protractor.ExpectedConditions;
        expect<any>(element(by.name('roleName')).getText()).toEqual('');
    });
    it('should add role', () => {
        var EC = protractor.ExpectedConditions;
        element(by.name('roleName')).sendKeys("test");
        element(by.name('submitBtn')).click();
        browser.sleep(500);
        browser.ignoreSynchronization = true;
        expect<any>(element(by.name('roleName')).getText()).toEqual('');
        browser.sleep(500);
        browser.ignoreSynchronization = false;

    });
    it('should check manageRole', () => {
        var EC = protractor.ExpectedConditions;
        element.all(by.name('manageRole')).first().click();
        browser.sleep(500);
        browser.ignoreSynchronization = true;
        expect<any>(element.all(by.name('rolePermission')).count()).toEqual(1);
        browser.sleep(500);
        browser.ignoreSynchronization = false;
    });
});
