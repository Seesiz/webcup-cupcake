const { DataTypes } = require('sequelize');
const sequelize = require('../configurations/database.configuration');

const UtilisateurCompetence = sequelize.define('utilisateurCompetence', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_utilisateur: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'utilisateur',
      key: 'id'
    }
  },
  id_competence: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'COMPETENCE_DERIVE',
      key: 'id'
    }
  }
}, {
  tableName: 'UTILISATEUR_COMPETENCE',
  timestamps: false // Si vous ne voulez pas de champs createdAt et updatedAt
});

module.exports = UtilisateurCompetence;
