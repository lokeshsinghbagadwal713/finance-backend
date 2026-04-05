import db from '../models/index.js';
import { fn, col } from 'sequelize';
const { FinancialRecord } = db;

export const getSummary = async (req, res, next) => {
  try {
    const totalIncome = await FinancialRecord.sum('amount', { where: { type: 'INCOME', isDeleted: false } }) || 0;
    const totalExpense = await FinancialRecord.sum('amount', { where: { type: 'EXPENSE', isDeleted: false } }) || 0;
    const netBalance = totalIncome - totalExpense;

    const categoryTotals = await FinancialRecord.findAll({
      attributes: ['category',[fn('SUM', col('amount')), 'total']],
      group: ['category'],
      where: { isDeleted: false }
    });

    const recentActivity = await FinancialRecord.findAll({
      where: { isDeleted: false },
      order: [['date','DESC']], limit: 5
    });

    res.json({ totalIncome, totalExpense, netBalance, categoryTotals, recentActivity });
  } catch(err) { next(err); }
};