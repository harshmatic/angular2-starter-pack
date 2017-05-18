import { GreatBigAngular2ExamplePage } from './app.po';
import { browser, element, by, protractor } from 'protractor';
declare var $: any;
describe('AssignOfficer', function () {
  let page: GreatBigAngular2ExamplePage;

  beforeEach(async () => {
    return await browser.get('#/employee/assign-officer');
  });

  beforeEach(() => {
    page = new GreatBigAngular2ExamplePage();
  });
  it('should display message saying enter mandetory fields', () => {
    element(by.name('submit')).isPresent().then(function (result) {
      if (result) {
        var EC = protractor.ExpectedConditions;
        element(by.name('dept')).sendKeys("");
        element(by.name('rank')).sendKeys("");
        element(by.name('officer')).sendKeys("");
        element(by.name('remark')).sendKeys("");
        element(by.name('submit')).click();
        expect<any>(element(by.id('deptError')).getText()).toEqual("Please select department");
        expect<any>(element(by.id('rankError')).getText()).toEqual("Please select Rank");
        expect<any>(element(by.id('offError')).getText()).toEqual("Please select officer");
        expect<any>(element(by.id('remarkError')).getText()).toEqual('Please enter remark');
      }
    });

  });
  it('should display message saying officer assigned successfully', () => {
    element(by.name('submit')).isPresent().then(function (result) {
      if (result) {
        var EC = protractor.ExpectedConditions;
        element(by.name('dept')).sendKeys("a1da1d8e-1111-4634-b538-a01709472222");
        element(by.name('rank')).sendKeys("f6b0d655-5afd-44e1-a1d4-5d6bec3a7c81");
        element(by.name('officer')).sendKeys("56c385ae-ce46-41d4-b7fe-08df9aef2222");
        element(by.name('remark')).sendKeys("Test Remark 3");
        element(by.name('submit')).click();
        browser.get('/#/ob/occurenceEdit?OccurenceBookID=411bfab2-0d44-4fb9-8835-184db90f8878');
      }
    });

  });

});
