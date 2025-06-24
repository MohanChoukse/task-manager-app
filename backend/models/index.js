const User = require('./user');
const Task = require('./task');

// Define associations
User.hasMany(Task, { foreignKey: 'user_id', as: 'tasks' });
Task.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = {
  User,
  Task
}; 