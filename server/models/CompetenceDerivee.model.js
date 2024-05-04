const { DataTypes } = require('sequelize');
const sequelize = require('../configurations/database.configuration');

const CompetenceDerive = sequelize.define('competenceDerive', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  types: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  icon: {
    type: DataTypes.STRING(255),
    defaultValue: ''
  },
  description: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  ordre: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  id_racine: {
    type: DataTypes.INTEGER,
    references: {
      model: 'COMPETENCE_RACINE',
      key: 'id'
    }
  }
}, {
  tableName: 'COMPETENCE_DERIVE',
  timestamps: false // Si vous ne voulez pas de champs createdAt et updatedAt
});

module.exports = CompetenceDerive;
