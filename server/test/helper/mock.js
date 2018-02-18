/* eslint-disable max-len */
import faker from 'faker';

const mock = {
  newUser: {
    firstName: 'John',
    lastName: 'Doe',
    emailAddress: 'johndoe007@gmail.com',
    password: 'password',
    passwordConfirmation: 'password'
  },

  newUserResponse: {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiam9obiIsImxhc3ROYW1lIjoiZG9lIiwiZW1haWxBZGRyZXNzIjoiam9obkBnbWFpbC5jb20iLCJpYXQiOjE1MTY4ODI0ODYsImV4cCI6MTUxNjk2ODg4Nn0.pbnjo8i8VM8CoKEOau930c5R_B7COE3CQ5n2AbnAIbk',
    message: 'Signup Successful'
  },

  noFirsnameNewUser: {
    firstName: '',
    lastName: faker.name.lastName(),
    emailAddress: faker.internet.email(),
    password: 'password',
    passwordConfirmation: 'password'
  },

  favoriteNewUser: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    emailAddress: faker.internet.email(),
    password: 'password1',
    passwordConfirmation: 'password1'
  },

  newRecipeValidationFail: {
    userId: null,
    name: 'k',
    ingredients: 'lore',
    direction: 'This is a sample recipe description',
    image: 'http://www/allnigeriafoods.com/sample-recipe-url'
  },

  newRecipe: {
    userId: null,
    name: 'jollof rice',
    ingredients: 'lorem, ipsum, itsum, gallum',
    direction: 'This is a sample recipe description. If you parboiled the rice as described at parboiling rice for cooking jollof rice, the rice should be done by the time the water is dry. Taste to confirm. If not, you will need to add more water and reduce the heat to prevent burning. Keep cooking till done.',
    image: 'http://www/allnigeriafoods.com/sample-recipe-url'
  },

  anotherNewRecipe: {
    userId: null,
    name: 'dodo and eggs',
    ingredients: 'lorem, ipsum, itsum, gallum',
    direction: 'This is a sample recipe description. If you parboiled the rice as described at parboiling rice for cooking jollof rice, the rice should be done by the time the water is dry. Taste to confirm. If not, you will need to add more water and reduce the heat to prevent burning. Keep cooking till done.',
    image: 'http://www/allnigeriafoods.com/sample-recipe-url'
  },

  incompleteNewRecipe: {
    userId: null,
    image: 'http://www/allnigeriafoods.com/sample-recipe-url'
  }
};

export default mock;
