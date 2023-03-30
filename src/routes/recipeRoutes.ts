import { Router } from 'express';
import { createRecipe, deleteRecipe, getAllRecipe, getRecipe, editRecipe } from '../controllers/recipeController';


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


export default router;
