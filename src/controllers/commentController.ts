import { RequestHandler } from "express";
import { Comment } from "../models/comment";
import { User } from "../models/user";
import { Recipe } from "../models/recipe";
import { verifyUser } from "../services/auth";

export const getAllComments: RequestHandler = async (req, res, next) => {

    let user: User | null = await verifyUser(req);

    if (user) {
        const result = await User.findByPk(user.userId, {
            include: [Recipe, User]
        });

        res.status(200).json(result);
    }
    else {
        res.status(401).send();
    }
};

export const getUserComments: RequestHandler = async (req, res, next) => {
    
    let user: User | null = await verifyUser(req);

    if (user) {
        const result = await User.findByPk(user.userId, {
            include: Recipe
        });

        res.status(200).json(result);
    }
    else {
        res.status(401).send();
    }
};

export const createComment: RequestHandler = async (req, res, next) => {
    
    let user: User | null = await verifyUser(req);

    if (!user) {
        return res.status(401).send();
    }

    let newComment: Comment = req.body;
    newComment.UserUserId = user.userId;

    if (newComment.commentTitle) {
        let created = await Comment.create(newComment);
        res.status(201).json(created);
    }
    else {
        res.status(400).send();
    }
};

export const getRecipeComments: RequestHandler = async (req, res, next) => {

    let recipeId = req.params.recipeId;
    let commentFound = await Comment.findAll({where: {
        RecipeRecipeId: recipeId
    }});

    res.status(200).json(commentFound);
   
};

export const getComment: RequestHandler = async (req, res, next) => {

    let commentId = req.params.commentId;
    let commentFound = await Comment.findByPk(commentId);

    if (commentFound) {
        res.status(200).json(commentFound);
    }
    else {
        res.status(404).json();
    }
};

export const updateComment: RequestHandler = async (req, res, next) => {

    let commentId = req.params.commentId;
    let newComment: Comment = req.body;

    let commentFound = await Comment.findByPk(commentId);

    if (commentFound && commentFound.commentId == newComment.commentId
        && newComment.commentTitle && newComment.UserUserId) {
        await Comment.update(newComment, {
            where: { commentId: commentId }
        });
        res.status(200).json();
    }
    else {
        res.status(400).json();
    }
};

export const deleteComment: RequestHandler = async (req, res, next) => {
    
    let commentId = req.params.commentId;
    let commentFound = await Comment.findByPk(commentId);

    if (commentFound) {
        await Comment.destroy({
            where: { commentId: commentId }
        });
        res.status(200).json();
    }
    else {
        res.status(404).json();
    }
};