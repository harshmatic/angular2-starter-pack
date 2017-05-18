import { GreatBigAngular2ExamplePage } from './app.po';
import { browser, element, by, protractor } from 'protractor';
declare var $: any;
describe('EditOccurence', function () {
  let page: GreatBigAngular2ExamplePage;

  beforeEach(async () => {
    return await browser.get('#/ob/occurenceEdit?OccurenceBookID=411bfab2-0d44-4fb9-8835-184db90f8878');
  });

  beforeEach(() => {
    page = new GreatBigAngular2ExamplePage();
  });
  it('should display message saying status updated ', () => {
    element(by.name('submit')).isPresent().then(function (result) {
      if (result) {
        var EC = protractor.ExpectedConditions;
        element(by.name('status')).sendKeys("853bdecf-1ed1-46c4-b200-e8be243f1111");
        element(by.name('submit')).click();
        browser.sleep(500);
        browser.ignoreSynchronization = true;
        expect<any>(element(by.css('p-growl .ui-growl-message p')).getText()).toEqual("Status updated");
        browser.sleep(500);
        browser.ignoreSynchronization = false;
      }
    });

  });
  it('should display message saying status and comment added ', () => {
    element(by.name('submit')).isPresent().then(function (result) {
      if (result) {
        var EC = protractor.ExpectedConditions;
        element(by.name('status')).sendKeys("853bdecf-1ed1-46c4-b200-e8be243f1111");
        element(by.name('comment')).sendKeys("car stolen at night");
        element(by.name('submit')).click();
        browser.sleep(500);
        browser.ignoreSynchronization = true;
        expect<any>(element(by.css('p-growl .ui-growl-message p')).getText()).toEqual("Comment saved");
        browser.sleep(500);
        browser.ignoreSynchronization = false;
      }
    });

  });
  it('should nevigate to "assign officer" page ', () => {
    element(by.name('assign')).isPresent().then(function (result) {
      if (result) {
        var EC = protractor.ExpectedConditions;
        element(by.name('assign')).click();
        browser.sleep(500);
        browser.ignoreSynchronization = true;
        browser.get('/#/employee/assign-officer?OccurenceBookID=411bfab2-0d44-4fb9-8835-184db90f8878');
        browser.sleep(500);
        browser.ignoreSynchronization = false;
      }
    });

  });
});
