const { DataTypes } = require('sequelize');
const sequelize = require('../configurations/database.configuration');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  prenom: {
    type: DataTypes.STRING(255),
    defaultValue: ''
  },
  avatar: {
    type: DataTypes.STRING(255),
    defaultValue: ''
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  motdepasse: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  date_inscription: {
    type: DataTypes.DATE,
    defaultValue: new Date()
  }
}, {
  tableName: 'utilisateur',
  timestamps: false // Si vous ne voulez pas de champs createdAt et updatedAt
});


module.exports = User;