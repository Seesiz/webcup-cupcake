const { DataTypes } = require('sequelize');
const sequelize = require('../configurations/database.configuration');

const CompetencesUtilisateur = sequelize.define('CompetencesUtilisateur', {
    id_utilisateur: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    id_competence: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    root: {
      type: DataTypes.INTEGER,
      field: 'root'
    }
  }, {
    tableName: 'COMPETENCES_UTILISATEUR',
    timestamps: false, // Si vous ne voulez pas de champs createdAt et updatedAt
    isView: true // Déclarer que c'est une vue
  });
  
  module.exports = CompetencesUtilisateur;