const { DataTypes } = require('sequelize');
const sequelize = require('../configurations/database.configuration');

const UtilisateurCompetenceTyped = sequelize.define('UtilisateurCompetenceTyped', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  id_utilisateur: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_competence: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  root: {
    type: DataTypes.INTEGER
  }
}, {
  tableName: 'UTILISATEUR_COMPETENCE_TYPED',
  timestamps: false // Si vous ne voulez pas de champs createdAt et updatedAt
});

module.exports = UtilisateurCompetenceTyped;