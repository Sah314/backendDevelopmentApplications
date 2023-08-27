import express from 'express';
const router = express.Router();
import authenticateToken from '../middlewares/authentication';
import {addTodos,getTodos,deleteTodos,updateTodos} from '../controllers/todoController'

router.post('/add',authenticateToken,addTodos);
router.get('/',authenticateToken, getTodos);
router.delete('/deletetodo/:id',authenticateToken, deleteTodos);
router.put('/edittodo/:id',authenticateToken, updateTodos);

export default router;
