import express from 'express';

const router = express.Router();

global.recipes = [{
  id: 1,
  recipeImage: null,
  recipeQuantity: 1,
  recipeIngredient: 'tomatoes',
  recipeDirection: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque eius in magnam omnis perferendis saepe tempora. Adipisci consectetur consequatur dolorum facilis id ipsum modi quas quibusdam repellat voluptas. Sit, sunt?'
}];

router.get('/', (request, response) => {
  return response.json({
    recipes: global.recipes,
    error: false
  });
});

router.post('/', (request, response) => {
  if (!request.body.recipeQuantity) {
    return response.json({
      message: 'Fill all fields',
      error: true
    });
  }

  global.recipes.push(request.body);

  return response.json({
    message: 'Recipe successfully created',
    error: false
  });
});

router.put('/:recipeId', (request, response) => {
  for (let i = 0; i < global.recipes.length; i++) {
    if (global.recipes[i].id === parseInt(request.params.recipeId, 10)) {
      global.recipes[i].recipeImage = request.body.recipeImage;
      global.recipes[i].recipeQuantity = request.body.recipeQuantity;
      global.recipes[i].recipeIngredient = request.body.recipeIngredient;
      global.recipes[i].recipeDirection = request.body.recipeDirection;
      return response.json({
        message: 'recipe successfully updated',
        error: false
      });
    }
  }

  /**
     * If recipe id is not found
     */
  return response.status(404).json({
    message: 'Recipe not found.',
    error: true
  });
});

router.get('/:recipeId', (request, response) => {
  for (let i = 0; i < global.recipes.length; i++) {
    if (global.recipes[i].id === parseInt(request.params.recipeId, 10)) {
      return response.json({
        recipe: global.recipes[i],
        message: 'Successful',
        error: false
      });
    }
  }
  return response.status(404).json({
    message: 'Recipe not found',
    error: true
  });
});

router.delete('/:recipeId', (request, response) => {
  for (let i = 0; i < global.recipes.length; i++) {
    if (global.recipes[i].id === parseInt(request.params.recipeId, 10)) {
      global.recipes.splice(i, 1);
      return response.json({
        message: 'Successfully deleted',
        error: false
      });
    }
  }

  return response.status(404).json({
    message: 'Recipe not found',
    error: true
  });
});

module.exports = router;
