import express from 'express';
import {
  createTransaction,
  getAllTransactions,
  getTransactionsByDate,
  getTodaySummary,
  getAllSummary,
  updateTransaction,
  deleteTransaction
} from '../controllers/transactionController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.post('/', createTransaction);
router.get('/', getAllTransactions);
router.get('/by-date', getTransactionsByDate);
router.get('/today-summary', getTodaySummary);
router.get('/all-summary', getAllSummary);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

export default router;