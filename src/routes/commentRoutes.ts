import { Router } from 'express';
import {
    getAllComments,
    createComment,
    getComment,
    updateComment,
    deleteComment,
    getUserComments,
    getRecipeComments
} from '../controllers/commentController';

const router = Router();

router.get('/', getAllComments);
router.get('/userComments', getUserComments)
router.get('/recipeComments/:recipeId', getRecipeComments)
router.post('/', createComment);
router.get('/:commentId', getComment);
router.put('/:commentId', updateComment);
router.delete('/:commentId', deleteComment);


export default router;