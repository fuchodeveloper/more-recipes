module.exports = {
  'Should sign up a new user': (browser) => {
    browser
      .url('http://localhost:8000')
      .waitForElementVisible('body', 10000)
      .click('#signup')
      .setValue('input[name=firstName]', 'john')
      .setValue('input[name=lastName]', 'doe')
      .setValue('input[name=emailAddress]', 'john@gmail.com')
      .setValue('input[name=password]', 'password')
      .setValue('input[name=passwordConfirmation]', 'password')
      .click('#signup-submit')
      .pause(1000);
  },

  'Should allow an authenticated user create a new recipe': (browser) => {
    browser
      .url('http://localhost:8000')
      .waitForElementVisible('body', 10000)
      .click('#dropdownMenuLink')
      .waitForElementVisible('#add', 1000)
      .click('#add')
      .setValue('input[name=name]', 'jollof rice and beans')
      .setValue('textarea[name=ingredients]', 'rice and beans')
      .setValue('textarea[name=direction]', 'Proin eget tortor risus. '
      + 'Nulla quis lorem ut libero malesuada feugiat. Curabitur non nulla '
      + ' sit amet nisl tempus convallis quis ac lectus. Curabitur arcu erat, '
      + ' accumsan id imperdiet et, porttitor at sem. Cras ultricies ligula '
      + 'sed magna dictum porta.')
      .click('#recipe-submit');
  },

  'Should allow an authenticated user view their profile': (browser) => {
    browser
      .url('http://localhost:8000')
      .waitForElementVisible('body', 10000)
      .click('#dropdownMenuLink')
      .waitForElementVisible('#profile', 1000)
      .click('#profile')
      .assert.containsText('#myProfile', 'My Profile');
  },

  'Should allow an authenticated user edit their profile': (browser) => {
    browser
      .clearValue('input[name=firstName]')
      .setValue('input[name=firstName]', 'johnny')
      .clearValue('input[name=lastName]')
      .setValue('input[name=lastName]', 'doey')
      .clearValue('input[name=emailAddress]')
      .setValue('input[name=emailAddress]', 'johnyy@gmail.com')
      .click('#profile-submit')
      .pause(2000);
  },

  'Should allow user view a recipe': (browser) => {
    browser
      .url('http://localhost:8000/recipes/1')
      .waitForElementVisible('body', 10000)
      .waitForElementVisible('#recipe-name', 5000)
      .assert.containsText('#recipe-name', 'Recipe: jollof rice and beans')
      .assert.containsText('#recipe-ingredients', 'Rice and beans');
  },

  'Should allow an authenticated user favorite a recipe': (browser) => {
    browser
      .click('#favorite-recipe')
      .pause(1000)
      .waitForElementVisible('.success', 5000)
      .assert.containsText('.success', 'Recipe favorited');
  },

  'Should allow an authenticated user un-favorite a recipe': (browser) => {
    browser
      .click('#favorited-recipe')
      .pause(1000)
      .waitForElementVisible('.success', 5000)
      .assert.containsText('.success', 'Favorite removed');
  },

  'Should allow an authenticated user upvote a recipe': (browser) => {
    browser
      .click('#recipe-upvote')
      .pause(1000)
      .waitForElementVisible('.success', 5000)
      .assert.containsText('.success', 'Recipe upvoted');
  },

  'Should allow an authenticated user remove their upvote on a recipe':
  (browser) => {
    browser
      .click('#recipe-upvote')
      .pause(1000)
      .waitForElementVisible('.success', 5000)
      .assert.containsText('.success', 'Upvote removed');
  },

  'Should allow an authenticated user downvote a recipe': (browser) => {
    browser
      .click('#recipe-downvote')
      .pause(1000)
      .waitForElementVisible('.success', 5000)
      .assert.containsText('.success', 'Recipe downvoted');
  },

  'Should allow an authenticated user remove their downvote on a recipe':
  (browser) => {
    browser
      .click('#recipe-downvote')
      .pause(1000)
      .waitForElementVisible('.success', 5000)
      .assert.containsText('.success', 'Downvote removed');
  },

  'Should allow an authenticated user add review to a recipe':
  (browser) => {
    browser
      .setValue('textarea[name=review]', 'Amazing recipe you got there!')
      .click('#recipe-review-submit')
      .pause(1000)
      .assert.containsText('#new-review-body', 'Amazing recipe you got there!');
  },

  'Should allow a recipe owner update their recipe':
  (browser) => {
    browser
      .click('#dropdownMenuLink')
      .waitForElementVisible('#my-recipes', 1000)
      .click('#my-recipes')
      .pause(1000)
      .assert.containsText('.center-hero-title', 'My Recipes')
      .click('#recipe-edit');
  },

};
