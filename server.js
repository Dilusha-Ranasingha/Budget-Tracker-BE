import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';

dotenv.config();
connectDB(); // connect to MongoDB

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL, // frontend origin allowed
  credentials: true               // allow cookies 
}));

app.use(express.json());

const PORT = process.env.PORT || 5001;

app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});