module.exports = {
  'Should display homepage and check for available elements': (browser) => {
    browser
      .url('http://localhost:8000')
      .waitForElementVisible('body', 10000)
      .assert.visible('h1')
      .assert.containsText('h1', 'Awesome Recipes Just For You')
      .assert.visible('form')
      .assert.visible('input[type=text]')
      .setValue('input[type=text]', 'rice')
      .click('input[type=text]')
      .pause(1000)
      .assert.containsText('#search-header', 'Search for your favorite recipes')
      .end();
  }
};
