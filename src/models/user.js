import bcrypt from 'bcryptjs';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('VIEWER','ANALYST','ADMIN'), defaultValue: 'VIEWER' },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  }, {
    hooks: {
      beforeCreate: async user => { if(user.password) user.password = await bcrypt.hash(user.password, 10); },
      beforeUpdate: async user => { if(user.password) user.password = await bcrypt.hash(user.password, 10); }
    }
  });

  User.prototype.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
  }

  return User;
};