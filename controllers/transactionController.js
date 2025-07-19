import Transaction from '../models/Transaction.js';

// POST /api/transactions
export const createTransaction = async (req, res) => {
  try {
    const { type, amount, remark } = req.body;

    const transaction = await Transaction.create({
      userId: req.user._id,
      type,
      amount,
      remark,
      date: new Date()
    });

    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: 'Create failed', error: err.message });
  }
};

// GET /api/transactions
export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id }).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Get all failed', error: err.message });
  }
};

// GET /api/transactions/by-date?date=YYYY-MM-DD
export const getTransactionsByDate = async (req, res) => {
  try {
    const dateParam = new Date(req.query.date);
    const nextDay = new Date(dateParam);
    nextDay.setDate(nextDay.getDate() + 1);

    const transactions = await Transaction.find({
      userId: req.user._id,
      date: { $gte: dateParam, $lt: nextDay }
    });

    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Get by date failed', error: err.message });
  }
};

// GET /api/transactions/today-summary
export const getTodaySummary = async (req, res) => {
  try {
    const today = new Date();
    const start = new Date(today.setHours(0, 0, 0, 0));
    const end = new Date(today.setHours(23, 59, 59, 999));

    const transactions = await Transaction.find({
      userId: req.user._id,
      date: { $gte: start, $lte: end }
    });

    let income = 0;
    let expense = 0;

    transactions.forEach(tx => {
      if (tx.type === 'income') income += tx.amount;
      else expense += tx.amount;
    });

    res.json({
      income,
      expense,
      balance: income - expense
    });
  } catch (err) {
    res.status(500).json({ message: 'Summary failed', error: err.message });
  }
};

// PUT /api/transactions/:id
export const updateTransaction = async (req, res) => {
  try {
    const updated = await Transaction.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Not found' });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
};

// DELETE /api/transactions/:id
export const deleteTransaction = async (req, res) => {
  try {
    const deleted = await Transaction.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!deleted) return res.status(404).json({ message: 'Not found' });

    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed', error: err.message });
  }
};