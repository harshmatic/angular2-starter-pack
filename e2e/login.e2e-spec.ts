import { GreatBigAngular2ExamplePage } from './app.po';
import { browser, element, by, protractor } from 'protractor';
declare var $: any;
describe('Login', function () {
  let page: GreatBigAngular2ExamplePage;

  beforeEach(async () => {
    return await browser.get('#/login');
  });

  beforeEach(() => {
    page = new GreatBigAngular2ExamplePage();
  });

//   it('should display message saying Login', () => {
//     expect<any>(element(by.css('app-root form')).getAttribute('name'))
//       .toEqual('login');
//   });
//   it('should display message saying Invalid Login with blank Username and password', () => {
//     var EC = protractor.ExpectedConditions
//     element(by.name('username')).sendKeys("");
//     element(by.name('password')).sendKeys("");
//     element(by.name('submit')).click();
//     browser.sleep(500);
//     browser.ignoreSynchronization = true;
//     expect<any>(element(by.css('p-growl .ui-growl-message .ui-growl-title')).getText()).toEqual("Invalid login");
//     browser.sleep(500);
//     browser.ignoreSynchronization = false;
   
   
//   });

// it('should display message saying Invalid Login with wrong Username and password', () => {
//     var EC = protractor.ExpectedConditions
//     element(by.name('username')).sendKeys("test");
//     element(by.name('password')).sendKeys("test");
//     element(by.name('submit')).click();
//     browser.sleep(500);
//     browser.ignoreSynchronization = true;
//     expect<any>(element(by.css('p-growl .ui-growl-message p')).getText()).toEqual("Invalid Username or Password.");
//     browser.sleep(500);
//     browser.ignoreSynchronization = false;
   
   
//   });
  it('should navigate to "Dashboard" after correct login', () => {
    var EC = protractor.ExpectedConditions
    element(by.name('username')).sendKeys("nickjones");
    element(by.name('password')).sendKeys("Espl@123");
    element(by.name('submit')).click();
    var url = "";
    browser.getCurrentUrl().then(function(url:string){
      url = url.split("#/")[1];
      expect<any>(url).toBe('dashboard');
      });
  });
});
