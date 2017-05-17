import { GreatBigAngular2ExamplePage } from './app.po';
import { browser, element, by, protractor } from 'protractor';
declare var $: any;
describe('AddOccurence', function () {
  let page: GreatBigAngular2ExamplePage;

  beforeEach(async () => {
    return await browser.get('#/ob/addOccurence');
  });

  beforeEach(() => {
    page = new GreatBigAngular2ExamplePage();
  });

  it('should display message saying enter mandetory fields', () => {
    element(by.name('submit')).isPresent().then(function (result) {
      if (result) {
        var EC = protractor.ExpectedConditions;
        element(by.name('location')).sendKeys("");
        element(by.name('areaName')).sendKeys("")
        element(by.name('dept')).sendKeys("");
        element(by.name('occurenceType')).sendKeys("");
        element(by.name('priority')).sendKeys("");
        element(by.name('natureOfOccurrence')).sendKeys("");
        element(by.name('remark')).sendKeys("");
        element(by.name('submit')).click();
        expect<any>(element(by.id('locationError')).getText()).toEqual("Please enter location");
        expect<any>(element(by.id('areaError')).getText()).toEqual("Please select area");
        expect<any>(element(by.id('depError')).getText()).toEqual("Please select department");
        expect<any>(element(by.id('catError')).getText()).toEqual("Please select category");
        expect<any>(element(by.id('prioError')).getText()).toEqual("Please select priority");
        expect<any>(element(by.id('reportError')).getText()).toEqual("Please enter report title");
        expect<any>(element(by.id('remarkError')).getText()).toEqual('Please enter remark');
      }

    });

  });
  it('should navigate to "occurenceDetails" after creating occurence book', () => {
    element(by.name('submit')).isPresent().then(function (result) {
      if (result) {
        var EC = protractor.ExpectedConditions;
        element(by.name('location')).sendKeys("Karve Nagar, Pune, Maharashtra 411052, India");
        element(by.name('areaName')).sendKeys("89234f93-6a6a-4960-a7d3-20f98f2760a8");
        element(by.name('dept')).sendKeys("a1da1d8e-1111-4634-b538-a01709473333");
        element(by.name('occurenceType')).sendKeys("758b1995-7f92-4d87-9588-b90800abf111");
        element(by.name('priority')).sendKeys("Critical");
        element(by.name('natureOfOccurrence')).sendKeys("car stolen");
        element(by.name('remark')).sendKeys("car stolen");
        element(by.name('submit')).click();
        var url = "";
        browser.getCurrentUrl().then(function (url: string) {
          url = url.split("#/ob")[1];
          expect<any>(url).toBe('/addOccurence');
        });
      }
    });

  });
});
