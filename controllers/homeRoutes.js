const router = require('express').Router();

const { User, Ingredient } = require('../models');

const withAuth = require('../utils/auth');

// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render('pages/homepage', {
      users,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
      user_name: req.session.user_name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('pages/login');
});

// Create a new user account
router.get('/signup', (req, res) => {
  try{
    if (req.session.logged_in) {
      res.redirect('/');
    } else {
      res.render('pages/signup');
    }

  }catch (err) {
    res.status(500).json(err);
  }
  

});

//display page with options - add food, view fridge, view recipes, what can I cook
router.get('/selections', withAuth, (req, res) => {
  
  try {
    
    res.render('pages/selections', {
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
      user_name: req.session.user_name,
    });
    return;
  } catch(err) {
    res.status(500).json(err);
  }

});

//display page to allow user add ingredient - category, name, quantity
router.get('/addingredient', withAuth, (req, res) => {
  
  try {
    
    res.render('pages/addingredient', {
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
      user_name: req.session.user_name,
    });
    return;
  //}
  } catch(err) {
    res.status(500).json(err); 
  }
});

//get all ingredients for logged in user
router.get('/fridge', withAuth, async(req, res) => {
  
  const ingredientData = await Ingredient.findAll({
      where: { user_id: req.session.user_id},
      order: [['category', 'ASC']],
    });

    const ingredients = ingredientData.map((ingredient) => ingredient.get({ plain: true }));
    console.log(ingredients);
    res.render('pages/fridge', {
      ingredients,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
      user_name: req.session.user_name,
      "labels": ["beef", "lamb"],
    });
  
    return;
  //}

});

module.exports = router;
