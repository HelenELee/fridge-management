const router = require('express').Router();
const { Recipe , Ingredient , RecipeIngredient} = require('../../models');

//update several ingredient based on recipe id
router.put('/:id', async(req, res) => {
    try {
      const ingredientData = await Ingredient.update({
        quantity: req.body.newElement,
      },
      {
        where: {
          name: req.body.nameElement,
        },
      });
      res.status(200).json(ingredientData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //create new Recipe
router.post('/addrecipe', async (req, res) => {
  try {
    
    const newRecipe = await Recipe.create({
      ...req.body,
      "user_id" : req.session.user_id,
    });
   
    //const recipe = newRecipe.get({ plain: true })
    //console.log("RECIPE - " + recipe);
   // console.log("STRINGIFY - " + JSON.stringify(newRecipe));
   // console.log("NEWRECIPE - " + newRecipe);
  //console.log(newRecipe);
    res.status(200).json(newRecipe);
  } catch (err) {
    res.status(400).json(err);
  }
});

//delete one recipe based on id

router.delete('recipe/:id', async (req, res) => {
  try {
    const recipeData = await Recipe.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!recipeData) {
      res.status(404).json({ message: 'No recipe found with this id!' });
      return;
    }

    res.status(200).json(recipeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  //create new Recipe Ingredient
  router.post('/addrecipeingredient', async (req, res) => {
    try {
      console.log("creating new recipe ingredient");
      console.log(req.body);
      const newRecipeIngredient = await RecipeIngredient.create({
        ...req.body,
        //"user_id" : req.session.user_id,
      });
     
      const recipeingredient = newRecipeIngredient.get({ plain: true })
      
      res.status(200).json(newRecipeIngredient);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.post('/addrecipeingredientSAFE', async (req, res) => {
    try {
      console.log("creating new recipe ingredient");
      console.log(req.body);
      const newRecipeIngredient = await RecipeIngredient.create({
        ...req.body,
        //"user_id" : req.session.user_id,
      });
     
      //const recipeingredient = newRecipeIngredient.get({ plain: true })
      
      res.status(200).json(newRecipeIngredient);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
module.exports = router;
