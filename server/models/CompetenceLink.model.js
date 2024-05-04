const { DataTypes } = require('sequelize');
const sequelize = require('../configurations/database.configuration');

const CompetenceLink = sequelize.define('CompetenceLink', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  child: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'CompetenceDerive', // Nom de la table référencée
      key: 'id'
    }
  },
  parent: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'CompetenceDerive', // Nom de la table référencée
      key: 'id'
    }
  },
  xp_required: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'CompetenceDerive', // Nom de la table référencée
      key: 'xp_required'
    }
  }
}, {
  tableName: 'competence_link', // Nom de la table dans la base de données
  timestamps: false // Désactiver les timestamps automatiques
});

// Exporter le modèle CompetenceLink

module.exports = CompetenceLink;
