
import { browser, element, by } from 'protractor';

describe('Permissions', () => {

  beforeEach(async () => {
    return await browser.get('#/dashboard');
  });

  it('should have User Details', () => {
      var value = browser.executeScript("return window.localStorage.getItem('loggedInUserDetails');");
    expect(value).not.toBeNull;
  });
  it('should have User Permissions', () => {
      var value = browser.executeScript("return window.localStorage.getItem('loggedInUserPermission');");
    expect(value).not.toBeNull;
  });

});