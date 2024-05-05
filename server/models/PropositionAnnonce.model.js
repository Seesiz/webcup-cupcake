const { DataTypes } = require('sequelize');
const sequelize = require('../configurations/database.configuration');

const PropositionAnnonce = sequelize.define('PropositionAnnonce', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_post: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_utilisateur: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_competence: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date_creation: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  etat: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'PROPOSITION_ANNONCE',
  timestamps: false // Si vous ne voulez pas de champs createdAt et updatedAt
});

module.exports = PropositionAnnonce;
