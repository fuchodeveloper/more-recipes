module.exports = {
  'Should sign up a new user': (browser) => {
    browser
      .url('http://localhost:8000')
      .waitForElementVisible('body', 10000)
      .assert.visible('#hero-title')
      .assert.containsText('#hero-title', 'Awesome Recipes Just For You')
      .assert.visible('#searchQuery')
      .assert.visible('#recent')
      .assert.containsText('#recent', 'Most recent recipes')
      .click('#signup')
      .pause(500)
      .assert.urlEquals('http://localhost:8000/signup')
      .pause(500)
      .assert.visible('form')
      .assert.visible('#firstName')
      .assert.visible('#lastName')
      .assert.visible('#emailAddress')
      .assert.visible('#password')
      .assert.visible('#passwordConfirmation')
      .assert.visible('#signup-submit')
      .assert.visible('#login')
      .setValue('input[name=firstName]', 'john')
      .setValue('input[name=lastName]', 'doe')
      .setValue('input[name=emailAddress]', 'john@gmail.com')
      .setValue('input[name=password]', 'password')
      .setValue('input[name=passwordConfirmation]', 'password')
      .click('#signup-submit')
      .pause(500)
      .assert.urlEquals('http://localhost:8000/')
      .assert.visible('.success')
      .assert.containsText('.success', 'Signup successful')
      .pause(1000);
  },

  'Should allow an authenticated user create a new recipe': (browser) => {
    browser
      .url('http://localhost:8000')
      .waitForElementVisible('body', 10000)
      .assert.visible('#hero-title')
      .assert.containsText('#hero-title', 'Awesome Recipes Just For You')
      .assert.visible('#searchQuery')
      .assert.visible('#recent')
      .assert.containsText('#recent', 'Most recent recipes')
      .click('#dropdownMenuLink')
      .waitForElementVisible('#add', 1000)
      .click('#add')
      .assert.urlEquals('http://localhost:8000/add')
      .pause(1000)
      .waitForElementVisible('body', 1000)
      .assert.visible('form')
      .assert.visible('#image-button')
      .assert.visible('#name')
      .assert.visible('#ingredients')
      .assert.visible('#recipe-direction')
      .assert.visible('#recipe-submit')
      .setValue('input[name=name]', 'jollof rice and beans')
      .setValue('textarea[name=ingredients]', 'rice and beans')
      .setValue('textarea[name=direction]', 'Proin eget tortor risus. '
      + 'Nulla quis lorem ut libero malesuada feugiat. Curabitur non nulla '
      + ' sit amet nisl tempus convallis quis ac lectus. Curabitur arcu erat, '
      + ' accumsan id imperdiet et, porttitor at sem. Cras ultricies ligula '
      + 'sed magna dictum porta.')
      .click('#recipe-submit')
      .pause(1000);
  },

  'Should allow an authenticated user view their profile': (browser) => {
    browser
      .url('http://localhost:8000')
      .waitForElementVisible('body', 10000)
      .click('#dropdownMenuLink')
      .waitForElementVisible('#profile', 1000)
      .click('#profile')
      .assert.urlEquals('http://localhost:8000/profile')
      .pause(1000)
      .waitForElementVisible('body', 1000)
      .assert.visible('#myProfile')
      .assert.visible('form')
      .assert.visible('#firstName')
      .assert.visible('#lastName')
      .assert.visible('#emailAddress')
      .assert.visible('#profile-submit')
      .assert.containsText('#myProfile', 'My Profile')
      .assert.value('#firstName', 'john')
      .assert.value('#lastName', 'doe')
      .assert.value('#emailAddress', 'john@gmail.com')
      .pause(1000);
  },

  'Should allow an authenticated user edit their profile': (browser) => {
    browser
      .clearValue('input[name=firstName]')
      .setValue('input[name=firstName]', 'johnny')
      .assert.value('#firstName', 'johnny')
      .clearValue('input[name=lastName]')
      .setValue('input[name=lastName]', 'doey')
      .assert.value('#lastName', 'doey')
      .clearValue('input[name=emailAddress]')
      .setValue('input[name=emailAddress]', 'johnyy@gmail.com')
      .assert.value('#emailAddress', 'johnyy@gmail.com')
      .click('#profile-submit')
      .pause(500)
      .assert.visible('.success')
      .assert.containsText('.success', 'Profile updated!')
      .pause(2000);
  },

  'Should allow user view a recipe': (browser) => {
    browser
      .url('http://localhost:8000/recipes/1')
      .waitForElementVisible('body', 1000)
      .pause(1000)
      .assert.visible('#recipe-name')
      .assert.visible('#ingredients-list')
      .assert.visible('#recipe-image')
      .assert.visible('#direction')
      .assert.visible('#favorite-recipe')
      .assert.visible('#recipe-upvote')
      .assert.visible('#recipe-downvote')
      .assert.visible('#reviews-title')
      .assert.containsText('#recipe-name', 'Recipe: jollof rice and beans')
      .assert.containsText('#recipe-ingredients', 'Rice and beans')
      .pause(1000);
  },

  'Should allow an authenticated user favorite a recipe': (browser) => {
    browser
      .click('#favorite-recipe')
      .pause(1000)
      .waitForElementVisible('.success', 5000)
      .assert.visible('.success')
      .assert.containsText('.success', 'Recipe favorited')
      .pause(1000);
  },

  'Should allow an authenticated user un-favorite a recipe': (browser) => {
    browser
      .click('#favorited-recipe')
      .pause(1000)
      .waitForElementVisible('.success', 5000)
      .assert.visible('.success')
      .assert.containsText('.success', 'Favorite removed')
      .pause(1000);
  },

  'Should allow an authenticated user upvote a recipe': (browser) => {
    browser
      .click('#recipe-upvote')
      .pause(1000)
      .waitForElementVisible('.success', 5000)
      .assert.visible('.success')
      .assert.containsText('.success', 'Recipe upvoted')
      .pause(1000);
  },

  'Should allow an authenticated user remove their upvote on a recipe':
  (browser) => {
    browser
      .click('#recipe-upvote')
      .pause(1000)
      .waitForElementVisible('.success', 5000)
      .assert.visible('.success')
      .assert.containsText('.success', 'Upvote removed')
      .pause(1000);
  },

  'Should allow an authenticated user downvote a recipe': (browser) => {
    browser
      .click('#recipe-downvote')
      .pause(1000)
      .waitForElementVisible('.success', 5000)
      .assert.visible('.success')
      .assert.containsText('.success', 'Recipe downvoted')
      .pause(1000);
  },

  'Should allow an authenticated user remove their downvote on a recipe':
  (browser) => {
    browser
      .click('#recipe-downvote')
      .pause(1000)
      .waitForElementVisible('.success', 5000)
      .assert.visible('.success')
      .assert.containsText('.success', 'Downvote removed')
      .pause(1000);
  },

  'Should allow an authenticated user add review to a recipe':
  (browser) => {
    browser
      .setValue('textarea[name=review]', 'Amazing recipe you got there!')
      .click('#recipe-review-submit')
      .pause(1000)
      .assert.containsText('#new-review-body', 'Amazing recipe you got there!')
      .pause(1000);
  },

  'Should allow a recipe owner update their recipe':
  (browser) => {
    browser
      .click('#dropdownMenuLink')
      .waitForElementVisible('#my-recipes', 1000)
      .click('#my-recipes')
      .pause(1000)
      .assert.containsText('.center-hero-title', 'My Recipes')
      .click('#recipe-edit')
      .pause(500)
      .assert.urlEquals('http://localhost:8000/update/1')
      .assert.visible('#recipe-image-avatar')
      .assert.visible('#image-button')
      .assert.visible('#name')
      .assert.visible('#ingredients')
      .assert.visible('#recipe-direction')
      .assert.visible('#update-recipe-form')
      .clearValue('input[name=name]')
      .setValue('input[name=name]', 'party rice and dodo')
      .pause(1000)
      .assert.value('#name', 'party rice and dodo')
      .clearValue('textarea[name=ingredients]')
      .setValue('textarea[name=ingredients]', 'rice and dodo')
      .assert.value('textarea[name=ingredients]', 'rice and dodo')
      .clearValue('textarea[name=direction]')
      .setValue('textarea[name=direction]', 'Parboil the rice and cut the dodo'
      + 'Nulla quis lorem ut libero malesuada feugiat. Curabitur non nulla '
      + ' sit amet nisl tempus convallis quis ac lectus. Curabitur arcu erat, '
      + ' accumsan id imperdiet et, porttitor at sem. Cras ultricies ligula')
      .assert
      .value('textarea[name=direction]', 'Parboil the rice and cut the dodo'
      + 'Nulla quis lorem ut libero malesuada feugiat. Curabitur non nulla '
      + ' sit amet nisl tempus convallis quis ac lectus. Curabitur arcu erat, '
      + ' accumsan id imperdiet et, porttitor at sem. Cras ultricies ligula')
      .pause(2000)
      .end();
  },

};
