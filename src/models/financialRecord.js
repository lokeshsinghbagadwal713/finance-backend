export default (sequelize, DataTypes) => {
  const FinancialRecord = sequelize.define('FinancialRecord', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    type: { type: DataTypes.ENUM('INCOME','EXPENSE'), allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    note: { type: DataTypes.STRING },
    createdBy: { type: DataTypes.INTEGER, allowNull: false },
    isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false }
  });

  return FinancialRecord;
};