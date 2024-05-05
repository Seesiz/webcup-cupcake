const { DataTypes } = require('sequelize');
const sequelize = require('../configurations/database.configuration');

const PostAnnonce = sequelize.define('PostAnnonce', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titre: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  id_utilisateur: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_competence: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_competence_recherche: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date_creation: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  date_modification: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  etat: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'POST_ANNONCE',
  timestamps: false // Si vous ne voulez pas de champs createdAt et updatedAt
});

module.exports = PostAnnonce;
