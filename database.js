const { Sequelize, DataTypes, Model } = require('sequelize');

// initialize an instance of Sequelize
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

class User extends Model {}

User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
}, { sequelize, modelName: 'user' });

class Poll extends Model {}

Poll.init({
    name: DataTypes.STRING,
    creatorId: DataTypes.INTEGER
}, { sequelize, modelName: 'poll' });

class Option extends Model {}

Option.init({
    text: DataTypes.STRING,
    pollId: DataTypes.INTEGER
}, { sequelize, modelName: 'option' });

class Vote extends Model {}

Vote.init({
    userId: DataTypes.INTEGER,
    optionId: DataTypes.INTEGER,
    rank: DataTypes.INTEGER
}, { sequelize, modelName: 'vote' });

// Create associations
User.hasMany(Poll, { foreignKey: 'creatorId' });
Poll.belongsTo(User, { as: 'creator', foreignKey: 'creatorId' });
Poll.hasMany(Option, { foreignKey: 'pollId' });
Option.belongsTo(Poll, { foreignKey: 'pollId' });
User.hasMany(Vote, { foreignKey: 'userId' });
Vote.belongsTo(User, { foreignKey: 'userId' });
Option.hasMany(Vote, { foreignKey: 'optionId' });
Vote.belongsTo(Option, { foreignKey: 'optionId' });

module.exports = { sequelize, User, Poll, Option, Vote };
