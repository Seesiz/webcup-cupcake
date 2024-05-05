const { DataTypes } = require('sequelize');
const sequelize = require('../configurations/database.configuration');
const CompetenceRacine = sequelize.define('competenceRacine', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  couleur: {
    type: DataTypes.STRING(100),
    defaultValue: ''
  }
}, {
  tableName: 'COMPETENCE_RACINE',
  timestamps: false // Si vous ne voulez pas de champs createdAt et updatedAt
});

module.exports = CompetenceRacine;