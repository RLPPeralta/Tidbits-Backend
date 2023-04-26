import { Router } from 'express';
import { createRecipe, deleteRecipe, getAllRecipe, getRecipe, editRecipe, searchRecipe, getCurrentUserRecipes, getUserRecipesById } from '../controllers/recipeController';


const router = Router();

// GET /recipe - renders a list of recipes
router.get('/', getAllRecipe);

// POST /recipe - creates a recipe
router.post('/', createRecipe);

// GET /recipe/userrecipes/ - get logged in user recipes 
router.get('/userrecipes', getCurrentUserRecipes);

// GET /recipe/userprofilerecipes/userId - get user recipes by userId
router.get('/userprofilerecipes/:id', getUserRecipesById);

// GET /recipe/recipeId - gets a recipe by the recipeId
router.get('/:id', getRecipe);

// PUT /recipe/recipeId - updates a recipe by the recipeId
router.put('/:id', editRecipe);

// DELETE /recipe/recipeId - deletes recipe by recipeId
router.delete('/:id', deleteRecipe);

//test it out in postman and call search query (id)
router.get('/search/:searchQuery', searchRecipe);




export default router;
