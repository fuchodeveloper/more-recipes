/* eslint-disable max-len */
module.exports = {
  'Should sign up a new user': (browser) => {
    browser
      .url('http://localhost:8000')
      .waitForElementVisible('body')
      .assert.visible('#hero-title')
      .assert.containsText('#hero-title', 'Awesome Recipes Just For You')
      .assert.visible('#searchQuery')
      .assert.visible('#recent')
      .assert.containsText('#recent', 'Most recent recipes')
      .waitForElementVisible('#signup')
      .assert.visible('#signup')
      .click('#signup')
      .assert.urlEquals('http://localhost:8000/signup')
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
      .waitForElementVisible('.success')
      .waitForElementVisible('#hero-title')
      .assert.urlEquals('http://localhost:8000/')
      .assert.visible('.success')
      .assert.containsText('.success', 'Signup successful')
      .assert.visible('#hero-title')
      .assert.containsText('#hero-title', 'Awesome Recipes Just For You')
      .assert.visible('#dropdownMenuLink')
      .assert.containsText('#dropdownMenuLink', 'John');
  },

  'Should allow an authenticated user create a new recipe': (browser) => {
    browser
      .url('http://localhost:8000')
      .waitForElementVisible('body')
      .assert.visible('#hero-title')
      .assert.containsText('#hero-title', 'Awesome Recipes Just For You')
      .assert.visible('#searchQuery')
      .assert.visible('#recent')
      .assert.containsText('#recent', 'Most recent recipes')
      .waitForElementVisible('#dropdownMenuLink')
      .click('#dropdownMenuLink')
      .waitForElementVisible('#add')
      .click('#add')
      .assert.urlEquals('http://localhost:8000/add')
      .waitForElementVisible('body')
      .assert.visible('form')
      .assert.visible('#image-button')
      .assert.visible('#name')
      .assert.visible('#ingredients')
      .assert.visible('#recipe-direction')
      .assert.visible('#recipe-submit')
      .setValue('input[name=name]', 'jollof rice and beans')
      .setValue('textarea[name=ingredients]', 'rice and beans')
      .setValue('textarea[name=direction]', 'Proin eget tortor risus. Nulla quis lorem ut libero malesuada feugiat. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Cras ultricies ligula sed magna dictum porta.')
      .click('#recipe-submit')
      .waitForElementVisible('.success')
      .assert.visible('.success')
      .assert.urlEquals('http://localhost:8000/')
      .waitForElementVisible('body')
      .assert.visible('.card')
      .assert.visible('#image')
      .assert.visible('#name')
      .assert.visible('#direction')
      .assert.visible('#view-recipe-button')
      .assert.containsText('#name', 'jollof rice and bean...')
      .assert.containsText('#direction', 'proin eget tortor risus. nulla quis lorem ut libero malesuada feugiat. curabitur non nulla sit amet ...')
      .assert.containsText('#view-recipe-button', 'View Recipe');
  },

  'Should allow user view a recipe': (browser) => {
    browser
      .waitForElementVisible('#view-recipe-button')
      .click('#view-recipe-button')
      .assert.urlEquals('http://localhost:8000/recipes/1')
      .waitForElementVisible('body')
      .waitForElementVisible('#image')
      .assert.visible('#name')
      .assert.visible('#ingredients')
      .assert.visible('#image')
      .assert.visible('#direction')
      .assert.visible('#favorite')
      .assert.visible('#upvote')
      .assert.visible('#downvote')
      .assert.visible('#no-reviews')
      .assert.containsText('#name', 'Recipe: jollof rice and beans')
      .assert.containsText('#ingredients', 'Rice and beans')
      .assert.containsText('#direction', 'proin eget tortor risus. nulla quis lorem ut libero malesuada feugiat. curabitur non nulla sit amet nisl tempus convallis quis ac lectus. curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. cras ultricies ligula sed magna dictum porta.')
      .assert.containsText('#upvote-count', 0)
      .assert.containsText('#downvote-count', 0)
      .assert.containsText('#no-reviews', 'No reviews yet');
  },

  'Should allow an authenticated user favorite a recipe': (browser) => {
    browser
      .waitForElementNotPresent('.success')
      .assert.visible('.fa-heart-o')
      .click('#favorite')
      .waitForElementVisible('.success')
      .waitForElementVisible('.fa-square-o')
      .assert.visible('.success')
      .assert.visible('.fa-square-o')
      .assert.containsText('.success', 'Recipe favorited');
  },

  'Should allow an authenticated user un-favorite a recipe': (browser) => {
    browser
      .waitForElementNotPresent('.success')
      .waitForElementVisible('#favorited')
      .assert.visible('.fa-square-o')
      .click('#favorited')
      .waitForElementVisible('.success')
      .waitForElementVisible('.fa-heart-o')
      .waitForElementVisible('#favorite')
      .assert.visible('.success')
      .assert.visible('.fa-heart-o')
      .assert.containsText('.success', 'Favorite removed');
  },

  'Should allow an authenticated user upvote a recipe': (browser) => {
    browser
      .waitForElementNotPresent('.success')
      .waitForElementVisible('#upvote')
      .assert.containsText('#upvote-count', 0)
      .click('#upvote')
      .waitForElementVisible('.success')
      .assert.visible('.success')
      .assert.containsText('#upvote-count', 1)
      .assert.containsText('.success', 'Recipe upvoted');
  },

  'Should allow an authenticated user remove their upvote on a recipe':
  (browser) => {
    browser
      .waitForElementNotPresent('.success')
      .waitForElementVisible('#upvote')
      .assert.containsText('#upvote-count', 1)
      .click('#upvote')
      .waitForElementVisible('.success')
      .assert.visible('.success')
      .assert.containsText('.success', 'Upvote removed')
      .assert.containsText('#upvote-count', 0);
  },

  'Should allow an authenticated user downvote a recipe': (browser) => {
    browser
      .waitForElementNotPresent('.success')
      .waitForElementVisible('#downvote')
      .assert.containsText('#downvote-count', 0)
      .click('#downvote')
      .waitForElementVisible('.success')
      .assert.visible('.success')
      .assert.containsText('.success', 'Recipe downvoted')
      .assert.containsText('#downvote-count', 1);
  },

  'Should allow an authenticated user remove their downvote on a recipe':
  (browser) => {
    browser
      .waitForElementNotPresent('.success')
      .waitForElementVisible('#downvote')
      .assert.containsText('#downvote-count', 1)
      .click('#downvote')
      .waitForElementVisible('.success')
      .assert.visible('.success')
      .assert.containsText('.success', 'Downvote removed')
      .assert.containsText('#downvote-count', 0);
  },

  'Should allow an authenticated user add review to a recipe':
  (browser) => {
    browser
      .waitForElementNotPresent('.success')
      .assert.visible('#no-reviews')
      .assert.visible('textarea[name=review]')
      .assert.visible('#recipe-review-submit')
      .setValue('textarea[name=review]', 'Amazing recipe you got there!')
      .click('#recipe-review-submit')
      .waitForElementVisible('.success')
      .assert.visible('.success')
      .assert.containsText('.success', 'Review created')
      .waitForElementVisible('#review-creator')
      .waitForElementVisible('#new-review-body')
      .assert.elementNotPresent('#no-reviews')
      .assert.visible('#review-creator')
      .assert.visible('#new-review-body')
      .assert.containsText('#review-creator', 'john')
      .assert.containsText('#new-review-body', 'Amazing recipe you got there!');
  },

  'Should allow a recipe owner update their recipe and view the updated recipe':
  (browser) => {
    browser
      .assert.visible('#dropdownMenuLink')
      .click('#dropdownMenuLink')
      .waitForElementVisible('#my-recipes')
      .assert.visible('#my-recipes')
      .click('#my-recipes')
      .assert.urlEquals('http://localhost:8000/john/recipes')
      .waitForElementVisible('body')
      .waitForElementVisible('#image')
      .assert.containsText('.center-hero-title', 'My Recipes')
      .assert.visible('.card')
      .assert.visible('#image')
      .assert.visible('#name')
      .assert.visible('#direction')
      .assert.visible('#view-recipe')
      .assert.visible('#delete-recipe')
      .assert.visible('#edit-recipe')
      .assert.containsText('#edit-recipe', 'Edit')
      .click('#edit-recipe')
      .assert.urlEquals('http://localhost:8000/update/1')
      .waitForElementVisible('body')
      .waitForElementVisible('#image')
      .assert.visible('#image-button')
      .assert.visible('#image')
      .assert.visible('#name')
      .assert.visible('#ingredients')
      .assert.visible('#direction')
      .assert.visible('#image-button')
      .assert.visible('#submit')
      .clearValue('input[name=name]')
      .setValue('input[name=name]', 'party rice and dodo')
      .clearValue('textarea[name=ingredients]')
      .setValue('textarea[name=ingredients]', 'rice and dodo')
      .clearValue('textarea[name=direction]')
      .setValue('textarea[name=direction]', 'Parboil the rice and cut the dodo nulla quis lorem ut libero malesuada feugiat. curabitur non nulla sit amet nisl tempus convallis quis ac lectus. curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. cras ultricies ligula')
      .click('#submit')
      .waitForElementVisible('.success')
      .assert.visible('.success')
      .assert.containsText('.success', 'Recipe updated')
      .assert.urlEquals('http://localhost:8000/recipes/1')
      .waitForElementVisible('body')
      .waitForElementVisible('#image')
      .assert.visible('#name')
      .assert.visible('#ingredients')
      .assert.visible('#image')
      .assert.visible('#direction')
      .assert.visible('#favorite')
      .assert.visible('#upvote')
      .assert.visible('#downvote')
      .assert.visible('#review-creator')
      .assert.visible('#new-review-body')
      .assert.containsText('#name', 'Recipe: party rice and dodo')
      .assert.containsText('#ingredients', 'Rice and dodo')
      .assert.containsText('#direction', 'parboil the rice and cut the dodo nulla quis lorem ut libero malesuada feugiat. curabitur non nulla sit amet nisl tempus convallis quis ac lectus. curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. cras ultricies ligula')
      .assert.containsText('#upvote-count', 0)
      .assert.containsText('#downvote-count', 0)
      .assert.containsText('#review-creator', 'john')
      .assert.containsText('#new-review-body', 'Amazing recipe you got there!');
  },


  'Should allow an authenticated user view their profile': (browser) => {
    browser
      .url('http://localhost:8000')
      .assert.urlEquals('http://localhost:8000/')
      .waitForElementVisible('body')
      .click('#dropdownMenuLink')
      .waitForElementVisible('#profile')
      .click('#profile')
      .assert.urlEquals('http://localhost:8000/profile')
      .waitForElementVisible('body')
      .assert.visible('#myProfile')
      .assert.visible('form')
      .assert.visible('#firstName')
      .assert.visible('#lastName')
      .assert.visible('#emailAddress')
      .assert.visible('#profile-submit')
      .assert.containsText('#myProfile', 'My Profile')
      .assert.value('#firstName', 'john')
      .assert.value('#lastName', 'doe')
      .assert.value('#emailAddress', 'john@gmail.com');
  },

  'Should allow an authenticated user edit their profile and see the updated profile':
   (browser) => {
     browser
       .assert.value('#firstName', 'john')
       .assert.value('#lastName', 'doe')
       .assert.value('#emailAddress', 'john@gmail.com')
       .clearValue('input[name=firstName]')
       .setValue('input[name=firstName]', 'johnny')
       .clearValue('input[name=lastName]')
       .setValue('input[name=lastName]', 'doey')
       .clearValue('input[name=emailAddress]')
       .setValue('input[name=emailAddress]', 'johnyy@gmail.com')
       .click('#profile-submit')
       .waitForElementVisible('#myProfile')
       .waitForElementVisible('.success')
       .assert.visible('.success')
       .assert.containsText('.success', 'Profile updated!')
       .assert.value('#firstName', 'johnny')
       .assert.value('#lastName', 'doey')
       .assert.value('#emailAddress', 'johnyy@gmail.com')
       .end();
   },

};
