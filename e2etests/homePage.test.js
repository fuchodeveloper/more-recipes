module.exports = {
  'Should display homepage and check for available elements': (browser) => {
    browser
      .url('http://localhost:8000')
      .assert.urlEquals('http://localhost:8000/')
      .waitForElementVisible('body')
      .assert.visible('h1')
      .assert.containsText('h1', 'Awesome Recipes Just For You')
      .assert.visible('form')
      .assert.visible('input[type=text]')
      .assert.visible('.popular-text')
      .assert.visible('#no-recipe')
      .assert.containsText('.popular-text', 'Most recent recipes')
      .assert.containsText('#no-recipe', 'No recipes available yet')
      .end();
  }
};
