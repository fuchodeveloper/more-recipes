import faker from 'faker';

const testData = {
  newUser: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    emailAddress: faker.internet.email(),
    password: 'password',
    passwordConfirmation: 'password'
  },

  anotherNewUser: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    emailAddress: faker.internet.email(),
    password: 'password1',
    passwordConfirmation: 'password1'
  },

  favoriteNewUser: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    emailAddress: faker.internet.email(),
    password: 'password1',
    passwordConfirmation: 'password1'
  },

  newRecipe: {
    userId: null,
    recipeName: faker.name.findName(),
    ingredient: 'lorem, ipsum, itsum, gallum',
    recipeDirection: 'This is a sample recipe description',
    recipeImage: 'http://www/allnigeriafoods.com/sample-recipe-url'
  },

  incompleteNewRecipe: {
    userId: null,
    recipeImage: 'http://www/allnigeriafoods.com/sample-recipe-url'
  }
};

export default testData;
