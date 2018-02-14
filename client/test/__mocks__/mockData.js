/* eslint-disable max-len */
const mockData = {
  authResponse: {
    message: 'Log in successful',
    token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiam9obiIsImxhc3ROYW1lIjoiZG9lIiwiZW1haWxBZGRyZXNzIjoiam9obkBnbWFpbC5jb20iLCJpYXQiOjE1MTc1ODk5MzQsImV4cCI6MTUxNzY3NjMzNH0.qzrmVXkP2G8sQ2ukoONv-osraCuss6DZkZsDShAeKZw'
  },

  errorResponse: {
    error: 'An error occurred, try again!'
  },

  deleteErrorResponse: {
    message: 'An error occurred, try again!'
  },

  authProfile: {
    firstName: 'john',
    lastName: 'doe',
    emailAddress: 'john@gmail.com'
  },

  match: {
    params: {
      id: 10
    },
  },

  empty: '',

  pageCount: 1,

  addFavoriteResponse: {
    favorite: {
      favoriteCount: 2,
      userId: 1,
      favorited: true,
      message: 'Recipe favorited'
    }
  },

  updatedAuthProfile: {
    user: {
      firstName: 'johnny',
      lastName: 'doey',
      emailAddress: 'johnny@gmail.com'
    }
  },

  updatedAuthProfileError: {
    firstName: '',
    lastName: 'doey',
    emailAddress: 'johnny@gmail.com'
  },

  recipeReviews: {
    statusCode: 201,
    message: 'Review created.',
    recipe: {
      id: 1,
      userId: 1,
      name: 'jollof rice and beans',
      favoriteCount: 1,
      ingredients: 'rice and beans',
      direction: 'proin eget tortor risus. nulla quis lorem ut libero malesuada feugiat. curabitur non nulla  sit amet nisl tempus convallis quis ac lectus. curabitur arcu erat,  accumsan id imperdiet et, porttitor at sem. cras ultricies ligula sed magna dictum porta.',
      image: 'https://res.cloudinary.com/fuchodeveloper/image/upload/v1516760699/noodles_c6ltkq.jpg',
      views: 60,
      upVotes: 0,
      downVotes: 1,
      recipeOwnerView: true,
      createdAt: '2018-02-04T16:52:28.768Z',
      updatedAt: '2018-02-06T06:25:22.663Z',
      Reviews: [
        {
          id: 3,
          review: 'An amazing recipe idea',
          User: {
            firstName: 'johnny'
          }
        }
      ]
    }
  },

  addRecipe: {
    name: 'party rice and beans',
    ingredients: 'local rice and beans',
    direction: 'proin eget tortor risus. nulla quis lorem ut libero malesuada feugiat. curabitur non nulla  sit amet nisl tempus convallis quis ac lectus. curabitur arcu erat,  accumsan id imperdiet et, porttitor at sem. cras ultricies ligula sed magna dictum porta.',
    image: 'https://res.cloudinary.com/fuchodeveloper/image/upload/v1516760699/noodles_c6ltkq.jpg',
  },

  addRecipeError: {
    name: '',
    ingredients: 'local rice and beans',
    direction: 'proin eget tortor risus. nulla quis lorem ut libero malesuada feugiat. curabitur non nulla  sit amet nisl tempus convallis quis ac lectus. curabitur arcu erat,  accumsan id imperdiet et, porttitor at sem. cras ultricies ligula sed magna dictum porta.',
    image: 'https://res.cloudinary.com/fuchodeveloper/image/upload/v1516760699/noodles_c6ltkq.jpg',
  },

  addRecipeResponse: {
    message: 'Recipe created successfully',
    recipe: {
      favoriteCount: 0,
      views: 0,
      upVotes: 0,
      downVotes: 0,
      recipeOwnerView: false,
      id: 4,
      userId: 5,
      name: 'how to cook nigerian jollof rice',
      ingredients: '3¾ cups (750g) long grain parboiled rice,\n2-3 cups tomato stew,\nchicken (whole chicken, drumsticks or chicken breast),\npepper and salt (to taste),\n2 medium onions,\n3 knorr cubes,\n2 teaspoons thyme,\n2 teaspoons curry powder (nigerian curry powder)',
      direction: 'put the rice in a pot and pour water up to the level of the beans and start cooking.\nnote: if you have a pressure cooker, beans is one of the staple foods you will want to use it for. it reduces the cooking time considerably.\ncook till tender, adding more water from time to time, if necessary. always keep the water at the same level as the beans so that when the beans is done, you will not have too much water in the porridge.',
      image: 'http://res.cloudinary.com/fuchodeveloper/image/upload/v1510581158/xs20xuqemntwq7eqhact.jpg',
      updatedAt: '2018-02-07T08:28:00.857Z',
      createdAt: '2018-02-07T08:28:00.857Z'
    }
  },

  updateRecipe: {
    name: 'party jambalaya rice and beans',
    ingredients: 'chicken and sauce',
    direction: 'proin eget tortor risus. nulla quis lorem ut libero malesuada feugiat. curabitur non nulla  sit amet nisl tempus convallis quis ac lectus. curabitur arcu erat,  accumsan id imperdiet et, porttitor at sem. cras ultricies ligula sed magna dictum porta.',
    image: 'https://res.cloudinary.com/fuchodeveloper/image/upload/v1516760699/noodles_c6ltkq.jpg',
  },

  updateRecipeError: {
    name: '',
    ingredients: '',
    direction: 'proin eget tortor risus. nulla quis lorem ut libero malesuada feugiat. curabitur non nulla  sit amet nisl tempus convallis quis ac lectus. curabitur arcu erat,  accumsan id imperdiet et, porttitor at sem. cras ultricies ligula sed magna dictum porta.',
    image: 'https://res.cloudinary.com/fuchodeveloper/image/upload/v1516760699/noodles_c6ltkq.jpg',
  },

  updatedRecipe: {
    recipe: {
      id: 1,
      userId: 1,
      name: 'party rice and beans',
      favoriteCount: 1,
      ingredients: 'local rice and beans',
      direction: 'proin eget tortor risus. nulla quis lorem ut libero malesuada feugiat. curabitur non nulla  sit amet nisl tempus convallis quis ac lectus. curabitur arcu erat,  accumsan id imperdiet et, porttitor at sem. cras ultricies ligula sed magna dictum porta.',
      image: 'https://res.cloudinary.com/fuchodeveloper/image/upload/v1516760699/noodles_c6ltkq.jpg',
      views: 60,
      upVotes: 0,
      downVotes: 1,
      recipeOwnerView: true,
      createdAt: '2018-02-04T16:52:28.768Z',
      updatedAt: '2018-02-06T06:25:22.663Z',
      Reviews: [
        {
          id: 1,
          review: 'Amazing recipe you got there!',
          User: {
            firstName: 'johnny'
          }
        }
      ]
    },
    favorited: false
  },

  signinData: {
    emailAddress: 'john@gmail.com',
    password: 'password'
  },

  signinErrorData: {
    emailAddress: '',
    password: 'password'
  },

  signupDetails: {
    firstName: 'mary',
    lastName: 'bella',
    emailAddress: 'mary@ymail.com',
    password: 'password',
    passwordConfirmation: 'password'
  },

  signupDetailsError: {
    firstName: '',
    lastName: '',
    emailAddress: 'mary@ymail.com',
    password: 'password',
    passwordConfirmation: 'password'
  },

  allRecipesData: {
    recipes: [
      {
        id: 1,
        userId: 1,
        name: 'jollof rice and beans',
        favoriteCount: 0,
        ingredients: 'rice and beans',
        direction: 'proin eget tortor risus. nulla quis lorem ut libero malesuada feugiat. curabitur non nulla  sit amet nisl tempus convallis quis ac lectus. curabitur arcu erat,  accumsan id imperdiet et, porttitor at sem. cras ultricies ligula sed magna dictum porta.',
        image: 'https://res.cloudinary.com/fuchodeveloper/image/upload/v1516760699/noodles_c6ltkq.jpg',
        views: 59,
        upVotes: 0,
        downVotes: 0,
        recipeOwnerView: true,
        createdAt: '2018-02-04T16:52:28.768Z',
        updatedAt: '2018-02-06T02:55:06.389Z'
      }
    ]
  },

  deletedRecipe: {
    message: 'Recipe deleted',
    recipes: 3
  },

  deletedRecipeState: {
    recipes: [
      {
        id: 2,
        name: 'test',
        ingredients: 'rice, food',
        direction: 'adfjdfnadfladfd sdf dfadsffsdfkdfkdasmfkdfkdfakdsf kdfakdfmksdf maksfm kadsfmkadfm kadsmfkadfmadsfmkads fkdafkadfmkad fmkad mfakdf',
        image: ''
      },
      {
        id: 4,
        name: 'testing',
        ingredients: 'dodo, fred',
        direction: 'adfjdfnadfladfd sdf dfadsffsdfkdfkdasmfkdfkdfakdsf kdfakdfmksdf maksfm kadsfmkadfm kadsmfkadfmadsfmkads fkdafkadfmkad fmkad mfakdf',
        image: ''
      }
    ]
  },

  viewedRecipe: {
    recipe: {
      recipe: {
        id: 1,
        userId: 1,
        name: 'jollof rice and beans',
        favoriteCount: 2,
        ingredients: 'rice and beans',
        direction: 'proin eget tortor risus. nulla quis lorem ut libero malesuada feugiat. curabitur non nulla  sit amet nisl tempus convallis quis ac lectus. curabitur arcu erat,  accumsan id imperdiet et, porttitor at sem. cras ultricies ligula sed magna dictum porta.',
        image: 'https://res.cloudinary.com/fuchodeveloper/image/upload/v1516760699/noodles_c6ltkq.jpg',
        views: 65,
        upVotes: 0,
        downVotes: 2,
        recipeOwnerView: true,
        createdAt: '2018-02-04T16:52:28.768Z',
        updatedAt: '2018-02-07T09:43:12.801Z',
        Reviews: [
          {
            id: 5,
            review: 'NIce recipe',
            User: {
              firstName: 'donald'
            }
          }
        ]
      },
      favorited: false
    }
  },

  viewedRecipeResponse: {
    id: 1,
    userId: 1,
    name: 'jollof rice and beans',
    favoriteCount: 1,
    ingredients: 'rice and beans',
    direction: 'proin eget tortor risus. nulla quis lorem ut libero malesuada feugiat. curabitur non nulla  sit amet nisl tempus convallis quis ac lectus. curabitur arcu erat,  accumsan id imperdiet et, porttitor at sem. cras ultricies ligula sed magna dictum porta.',
    image: 'https://res.cloudinary.com/fuchodeveloper/image/upload/v1516760699/noodles_c6ltkq.jpg',
    views: 60,
    upVotes: 0,
    downVotes: 1,
    recipeOwnerView: true,
    createdAt: '2018-02-04T16:52:28.768Z',
    updatedAt: '2018-02-06T06:25:22.663Z',
    Reviews: [
      {
        id: 1,
        review: 'Amazing recipe you got there!',
        User: {
          firstName: 'johnny'
        }
      }
    ],
    favorited: false
  },

  upvotedRecipe: {
    recipe: {
      upVotes: 1,
      downVotes: 0,
      message: 'Recipe upvoted'
    }
  },

  downvotedRecipe: {
    recipe: {
      upVotes: 0,
      downVotes: 1,
      message: 'Recipe downvoted'
    }
  },

  reviews: {
    id: 1,
    review: 'Amazing recipe you got there!',
    User: {
      firstName: 'johnny'
    }
  },

  singleRecipeData: {
    recipe: {
      recipe: {
        id: 1,
        userId: 1,
        name: 'jollof rice and beans',
        favoriteCount: 0,
        ingredients: 'rice and beans',
        direction: 'proin eget tortor risus. nulla quis lorem ut libero malesuada feugiat. curabitur non nulla  sit amet nisl tempus convallis quis ac lectus. curabitur arcu erat,  accumsan id imperdiet et, porttitor at sem. cras ultricies ligula sed magna dictum porta.',
        image: 'https://res.cloudinary.com/fuchodeveloper/image/upload/v1516760699/noodles_c6ltkq.jpg',
        views: 59,
        upVotes: 0,
        downVotes: 0,
        recipeOwnerView: true,
        createdAt: '2018-02-04T16:52:28.768Z',
        updatedAt: '2018-02-06T02:55:06.389Z',
        Reviews: [
          {
            id: 1,
            review: 'Amazing recipe you got there!',
            User: {
              firstName: 'johnny'
            }
          }
        ]
      },
      favorited: false
    },
    favorited: false
  },

  searchRecipeQuery: {
    searchQuery: 'rice'
  },

  errorSearchRecipeQuery: {
    searchQuery: 'thisisawrongrecipe'
  },

  searchRecipes: {
    recipes: [
      {
        id: 1,
        userId: 1,
        name: 'jollof rice and beans',
        favoriteCount: 0,
        ingredients: 'rice and beans',
        direction: 'proin eget tortor risus. nulla quis lorem ut libero malesuada feugiat. curabitur non nulla  sit amet nisl tempus convallis quis ac lectus. curabitur arcu erat,  accumsan id imperdiet et, porttitor at sem. cras ultricies ligula sed magna dictum porta.',
        image: 'https://res.cloudinary.com/fuchodeveloper/image/upload/v1516760699/noodles_c6ltkq.jpg',
        views: 59,
        upVotes: 0,
        downVotes: 0,
        recipeOwnerView: true,
        createdAt: '2018-02-04T16:52:28.768Z',
        updatedAt: '2018-02-06T02:55:06.389Z'
      }
    ]
  },

  myRecipes: {
    recipes: [
      {
        id: 1,
        userId: 1,
        name: 'jollof rice and beans',
        favoriteCount: 0,
        ingredients: 'rice and beans',
        direction: 'proin eget tortor risus. nulla quis lorem ut libero malesuada feugiat. curabitur non nulla  sit amet nisl tempus convallis quis ac lectus. curabitur arcu erat,  accumsan id imperdiet et, porttitor at sem. cras ultricies ligula sed magna dictum porta.',
        image: 'https://res.cloudinary.com/fuchodeveloper/image/upload/v1516760699/noodles_c6ltkq.jpg',
        views: 59,
        upVotes: 0,
        downVotes: 0,
        recipeOwnerView: true,
        createdAt: '2018-02-04T16:52:28.768Z',
        updatedAt: '2018-02-06T02:55:06.389Z'
      }
    ]
  },

  user: {
    firstName: 'johnny',
    lastName: 'doey',
    emailAddress: 'johnyy@gmail.com'
  }


};

export default mockData;
