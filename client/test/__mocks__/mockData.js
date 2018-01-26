const mockData = {
  authResponse: {
    message: 'Log in successful',
    user: {
      id: 2,
      firstName: 'mary',
      lastName: 'doe',
      emailAddress: 'marydoe@gmail.com',
      iat: 1515777593,
      exp: 1515863993
    },
    token:
    `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
    eyJpZCI6MiwiZmlyc3ROYW1lIjoibWFyeSIsImxhc3ROYW1lIjoiZG9lIiwiZW1haWxBZGRy
    ZXNzIjoibWFyeWRvZUBnbWFpbC5jb20iLCJpYXQiOjE1MTU3Nzc1
    OTMsImV4cCI6MTUxNTg2Mzk5M30.
    y6Ky5AX7JYAEuj_DXYfMaK20rlLqCVFFR4pcvhX0ZQg`
  },

  signinData: {
    emailAddress: 'john@gmail.com',
    password: 'password'
  },

  allRecipesData: {
    page: 1,
    pageCount: 1,
    pageSize: 1,
    totalCount: 1,
    recipes: [
      {
        id: 1,
        userId: 21,
        name: 'how to cook nigerian jollof rice',
        favoriteCount: 0,
        ingredients: `3¾ cups (750g) long grain parboiled rice 2-3 cups 
        tomato stew chicken (whole chicken, 
          drumsticks or chicken breast) pepper and 
        salt (to taste) 2 medium onions 
        3 knorr cubes 2 teaspoons thyme 2 teaspoons curry
         powder (nigerian curry powder)',
        recipeDirection: 'prepare the tomato 
        stew. visit the tomato stew page for details on how 
        to do that. it is advisable to prepare 
        tomato stew before hand and keep in the freezer. 
        this is so that whenever you want to cook 
        any jollof rice related dish, it is just a 
        matter of adding it to your cooking.\nif 
        you will use whole chicken then wash and cut
         it into pieces. cook with the thyme, knorr
          cubes and 2 bulbs of onions (chopped). 
         the cooking time depends on the type of 
         chicken. the rooster or cockerel cooks much 
         faster than the hen but the hen is definitely 
         tastier. when done, grill it in an oven.
          you may also fry it. this is to give it a 
          golden look which is more presentable 
          especially if you have guests for dinner.
          \nparboil the rice using the method detailed
           in parboiling rice for cooking jollof rice.
            rinse the parboiled rice and put in a sieve to drain.`,
        image: `http://res.cloudinary.com/fuchodeveloper/image/
        upload/v1516027828/oekpqjhvnxcvom0w7edw.jpg`,
        views: 1,
        upVotes: 0,
        downVotes: 0,
        recipeOwnerView: true,
        createdAt: '2018-01-15T14:50:41.129Z',
        updatedAt: '2018-01-15T14:50:46.952Z'
      }
    ]
  },

  singleRecipeData: {
    recipe: {
      id: 1,
      userId: 21,
      name: 'how to cook nigerian jollof rice',
      favoriteCount: 0,
      ingredients: `3¾ cups (750g) long grain parboiled rice
       2-3 cups tomato stew chicken (whole chicken, 
        drumsticks or chicken breast) pepper and 
        salt (to taste) 2 medium onions 3 knorr 
        cubes 2 teaspoons thyme 2 teaspoons
         curry powder (nigerian curry powder)',
      recipeDirection: 'prepare the tomato stew.
       visit the tomato stew page for details on 
       how to do that. it is advisable to prepare 
       tomato stew before hand and keep in the freezer
       . this is so that whenever you want to cook any
        jollof rice related dish, it is just a matter 
        of adding it to your cooking.\nif you will use 
        whole chicken then wash and cut it into pieces.
         cook with the thyme, knorr cubes and 2 bulbs of
          onions (chopped). the cooking time depends on the
           type of chicken. the rooster or cockerel cooks 
           much faster than the hen but the hen is definitely
            tastier. when done, grill it in an oven. you may 
            also fry it. this is to give it a golden look which
             is more presentable especially if you have guests
              for dinner.\nparboil the rice using the method 
              detailed in parboiling rice for cooking jollof rice
              . rinse the parboiled rice and put in a sieve to drain.`,
      image: `http://res.cloudinary.com/fuchodeveloper/
      image/upload/v1516027828/oekpqjhvnxcvom0w7edw.jpg`,
      views: 1,
      upVotes: 0,
      downVotes: 0,
      recipeOwnerView: true,
      createdAt: '2018-01-15T14:50:41.129Z',
      updatedAt: '2018-01-15T14:50:46.952Z',
      Reviews: []
    }
  }

};

export default mockData;
