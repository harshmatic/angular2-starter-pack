import { GreatBigAngular2ExamplePage } from './app.po';
import { browser, element, by, protractor } from 'protractor';
declare var $: any;
describe('User List', function () {
    let page: GreatBigAngular2ExamplePage;

    beforeEach(async () => {
        return await browser.get('#/admin/users');
    });

    beforeEach(() => {
        page = new GreatBigAngular2ExamplePage();
    });

    it('should check user list', () => {
        var EC = protractor.ExpectedConditions;
        expect<any>(element.all(by.tagName('table')).count()).toEqual(1)
    });
     it('should check add new user navigation', () => {
        var EC = protractor.ExpectedConditions;
        element.all(by.css('.btn')).click();
        var url = "";
        browser.getCurrentUrl().then(function(url:string){
            url = url.split("#/")[1];
            expect<any>(url).toBe('admin/user/new');
       });
    });
});
