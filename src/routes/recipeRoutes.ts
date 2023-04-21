import { Router } from 'express';
import { createRecipe, deleteRecipe, getAllRecipe, getRecipe, editRecipe, searchRecipe, getAllUserRecipe } from '../controllers/recipeController';


const router = Router();

// GET /recipe - renders a list of recipes
router.get('/', getAllRecipe);

// POST /recipe - creates a recipe
router.post('/', createRecipe);

// GET /recipe/recipeId - gets a recipe by the recipeId
router.get('/:id', getRecipe);

// PUT /recipe/recipeId - updates a recipe by the recipeId
router.put('/:id', editRecipe);

// DELETE /recipe/recipeId - deletes recipe by recipeId
router.delete('/:id', deleteRecipe);

//test it out in postman and call search query (id)
router.get('/:searchQuery', searchRecipe);

// GET /recipe/currentuser/userId - get user recipes by userId
router.get('/userrecipes/:userId', getAllUserRecipe);


export default router;
