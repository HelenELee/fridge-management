const router = require('express').Router();
const { Recipe, Ingredient, RecipeIngredient } = require('../../models');
//const withAuth = require('../../utils/auth');

//create new Recipe

router.post('/', async (req, res) => {
  try {
    
    const newRecipe = await Recipe.create({
      ...req.body,
    });
   
    const recipe = newRecipe.get({ plain: true })
    
    res.status(200).json(recipe);
  } catch (err) {
    res.status(400).json(err);
  }
});

//update one ingredient based on id
router.put('/:id', async(req, res) => {
  try {
    const ingredientData = await Ingredient.update({
      quantity: req.body.quantity,
    },
    {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(ingredientData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete one ingredient based on id

router.delete('/:id', async (req, res) => {
  try {
    const ingredientData = await Ingredient.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!ingredientData) {
      res.status(404).json({ message: 'No ingredient found with this id!' });
      return;
    }

    res.status(200).json(ingredientData);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;