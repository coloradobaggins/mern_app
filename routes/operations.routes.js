import express from 'express';
import { createOp, deleteOp, getAllOp, updateOp, statsOp } from '../controllers/operations.controller.js';

const router = express.Router();

router.post('/op', createOp);
router.delete('/:id', deleteOp);
router.get('/op', getAllOp);
router.patch('/:id', updateOp);
router.get('/stats', statsOp);

export default router;