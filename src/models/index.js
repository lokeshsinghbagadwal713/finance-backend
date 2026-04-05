import Sequelize from 'sequelize';
import sequelize from '../config/db.js';
import userModel from './user.js';
import recordModel from './financialRecord.js';

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = userModel(sequelize, Sequelize);
db.FinancialRecord = recordModel(sequelize, Sequelize);

db.User.hasMany(db.FinancialRecord, { foreignKey: 'createdBy' });
db.FinancialRecord.belongsTo(db.User, { foreignKey: 'createdBy' });

export default db;