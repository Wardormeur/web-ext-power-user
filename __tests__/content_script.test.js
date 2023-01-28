const fs = require('fs');
const path = require('path');
const cs = require('../content_script'); 
const html = fs.readFileSync(path.resolve(__dirname, '../demo/index.html'));

test('chrome.runtime.onMessage.addListener', () => {
  expect(jest.isMockFunction(browser.runtime.onMessage.addListener)).toBe(true);
  expect(browser.runtime.onMessage.addListener).toBeCalled();
});

test('select - tickAll', async () => {
  document.body.innerHTML = html;

  let el = document.querySelector('#pet-select')
  // TODO: https://jestjs.io/fr/docs/manual-mocks#simulation-de-m%C3%A9thodes-qui-ne-sont-pas-impl%C3%A9ment%C3%A9es-dans-jsdom
  browser.menus = {
    getTargetElement: jest.fn(() => el)
  };
  // NB: this call is technically wrong, it should be (tabId, message) but something's wrong with the lib
  await chrome.tabs.sendMessage({ action: "selectDemAll.tickAll", targetElement: 1 });
  let options = document.querySelectorAll('option[selected]')
  
  expect(options.length).toBe(7)
});

test('select - inverseSelection', async () => {
  document.body.innerHTML = html;

  let el = document.querySelector('#pet-select')
  // TODO: https://jestjs.io/fr/docs/manual-mocks#simulation-de-m%C3%A9thodes-qui-ne-sont-pas-impl%C3%A9ment%C3%A9es-dans-jsdom
  browser.menus = {
    getTargetElement: jest.fn(() => el)
  };
  // NB: this call is technically wrong, it should be (tabId, message) but something's wrong with the lib
  await chrome.tabs.sendMessage({ action: "selectDemAll.inverseSelection", targetElement: 1 });
  let options = document.querySelectorAll('option[selected]')
  
  expect(options.length).toBe(7)
});


test('checkbox - tickAll', async () => {
  document.body.innerHTML = html;

  let el = document.querySelector('#asus')
  // TODO: https://jestjs.io/fr/docs/manual-mocks#simulation-de-m%C3%A9thodes-qui-ne-sont-pas-impl%C3%A9ment%C3%A9es-dans-jsdom
  browser.menus = {
    getTargetElement: jest.fn(() => el)
  };
  // NB: this call is technically wrong, it should be (tabId, message) but something's wrong with the lib
  await chrome.tabs.sendMessage({ action: "selectDemAll.tickAll", targetElement: 1 });
  let options = document.querySelectorAll('input[checked]')
  
  expect(options.length).toBe(3)
});

test('checkbox - inverseSelection', async () => {
  document.body.innerHTML = html;

  let el = document.querySelector('#asus')
  // TODO: https://jestjs.io/fr/docs/manual-mocks#simulation-de-m%C3%A9thodes-qui-ne-sont-pas-impl%C3%A9ment%C3%A9es-dans-jsdom
  browser.menus = {
    getTargetElement: jest.fn(() => el)
  };
  // NB: this call is technically wrong, it should be (tabId, message) but something's wrong with the lib
  await chrome.tabs.sendMessage({ action: "selectDemAll.inverseSelection", targetElement: 1 });
  let options = document.querySelectorAll('input[checked]')
  
  expect(options.length).toBe(3)
});
