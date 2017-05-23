import { GreatBigAngular2ExamplePage } from './app.po';
import { browser, element, by, protractor } from 'protractor';
declare var $: any;
describe('User List', function () {
    let page: GreatBigAngular2ExamplePage;

    beforeEach(async () => {
        return await browser.get('#/users');
    });

    beforeEach(() => {
        page = new GreatBigAngular2ExamplePage();
    });

    it('should check user list', () => {
        var EC = protractor.ExpectedConditions;
        browser.sleep(500);
        browser.ignoreSynchronization = true;
        //expect<any>(element(by.css('ui-widget-content ui-datatable-even'))).length)
        browser.sleep(500);
        browser.ignoreSynchronization = false;

    });
});
