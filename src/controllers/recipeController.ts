import { RequestHandler } from "express";
import { Op } from "sequelize";
import { Recipe } from "../models/recipe";
import { User } from "../models/user";
import { verifyUser } from "../services/auth";



export const getAllRecipe: RequestHandler = async (req, res, next) => {
    let recipes = await Recipe.findAll({include: User});
    res.status(200).json(recipes);
}


export const createRecipe: RequestHandler = async (req, res, next) => {
    //get the logged in user from token
    let user: User | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    let newRecipe: Recipe = req.body;
    newRecipe.userId = user.userId;

    //create new recipe by that user with userId
    if (newRecipe.recipe) {
        let created = await Recipe.create(newRecipe);
        res.status(200).json(created);
    }
    else {
        res.status(403).send();
    }
}

export const getRecipe: RequestHandler = async (req, res, next) => {
    let recipeId = req.params.id;
    let recipe = await Recipe.findByPk(recipeId, {include: User});
    if (recipe) {
        res.status(200).json(recipe);
    }
    else {
        res.status(404).json({});
    }
}

export const editRecipe: RequestHandler = async (req, res, next) => {
    //get the logged in user from token
    let user: User | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }
    
    let recipeId = req.params.id;
    let recipeFound = await Recipe.findByPk(recipeId);

    if (recipeFound && user.userId == recipeFound.userId 
        && req.body.recipe) {
            recipeFound.recipe = req.body.recipe;
            recipeFound.instructions = req.body.instructions;
            recipeFound.ingredients = req.body.ingredients;
            recipeFound.continent = req.body.continent;
            recipeFound.image = req.body.image;
            recipeFound.country = req.body.country;
            recipeFound.servings = req.body.servings;
            recipeFound.prepTime = req.body.prepTime;
            recipeFound.cookTime = req.body.cookTime;
            await recipeFound.save()

            res.status(200).json(recipeFound);
    }
    
    else {
        res.status(400).json();
    }
}

export const deleteRecipe: RequestHandler = async (req, res, next) => {  
    let user: User | null = await verifyUser(req);
    let recipeId = req.params.id;
    let found = await Recipe.findByPk(recipeId);

    if (!user) {
        return res.status(403).send();
    }
    
    if (found) {
        await Recipe.destroy({
                where: { recipeId: req.params.id }
        });
        res.status(200).json();
    }
    else {
        res.status(404).json();
    }
}

export const searchRecipe: RequestHandler = async (req, res, next) => {

    let searchQuery = req.params.searchQuery;
    let recipe = await Recipe.findAll({
        where: {
            [Op.or]: [
                {
                    recipe: 
                    {  [Op.like]: `%${searchQuery}%` }
                }
            ],
                    
        }
      });
    if (recipe) {
        res.status(200).json(recipe);
    }
    else {
        res.status(404).json();
    }
}

export const getAllUserRecipe: RequestHandler = async (req, res, next) => {
     let currentUserId = req.params.userId
     let recipe = await Recipe.findAll ({
        where: { 
        userId: `${currentUserId}`
        }
     })
     if (recipe) {
        res.status(200).json(recipe);
    }
    else {
        res.status(404).json();
    }
}