import { GreatBigAngular2ExamplePage } from './app.po';
import { browser, element, by, protractor } from 'protractor';
declare var $: any;
describe('User Role Component', function () {
    let page: GreatBigAngular2ExamplePage;

    beforeEach(async () => {
        return await browser.get('#/admin/user/new');
    });

    beforeEach(() => {
        page = new GreatBigAngular2ExamplePage();
    });
    it('should check input field', () => {
        var EC = protractor.ExpectedConditions;
        expect<any>(element(by.name('userName')).getText()).toEqual('');
    });
    it('should add a new user', () => {
        var EC = protractor.ExpectedConditions;
        element(by.name('userName')).sendKeys("test");
        element(by.name('firstName')).sendKeys("test");
        element(by.name('lastName')).sendKeys("test");
        element(by.name('email')).sendKeys("test");
        element(by.name('submitBtn')).click();
        browser.sleep(500);
        browser.ignoreSynchronization = true;
        browser.getCurrentUrl().then(function(url:string){
            url = url.split("#/")[1];
            expect<any>(url).toBe('admin/users');
        });
        browser.sleep(500);
        browser.ignoreSynchronization = false;

    });
    it('should check cancel btn', () => {
        var EC = protractor.ExpectedConditions;
        element(by.name('cancelBtn')).click();
         browser.getCurrentUrl().then(function(url:string){
            url = url.split("#/")[1];
            expect<any>(url).toBe('admin/users');
        });
    });
});
