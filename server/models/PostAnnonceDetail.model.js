const { DataTypes } = require('sequelize');
const sequelize = require('../configurations/database.configuration');

const PostAnnonceDetail = sequelize.define('PostAnnonceDetail', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  titre: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
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
  },
  nom_utilisateur: {
    type: DataTypes.STRING(255)
  },
  prenom_utilisateur: {
    type: DataTypes.STRING(255)
  },
  avatar_utilisateur: {
    type: DataTypes.STRING(255)
  },
  titre_competence: {
    type: DataTypes.STRING(100)
  },
  types_competence: {
    type: DataTypes.STRING(100)
  },
  icon_competence: {
    type: DataTypes.STRING(255)
  },
  description_competence: {
    type: DataTypes.TEXT
  },
  ordre_competence: {
    type: DataTypes.INTEGER
  },
  root_competence: {
    type: DataTypes.INTEGER
  },
  titre_racine_competence: {
    type: DataTypes.STRING(100)
  },
  couleur_racine_competence: {
    type: DataTypes.STRING(100)
  },
  id_racine_competence: {
    type: DataTypes.INTEGER
  },
  id_root_competence: {
    type: DataTypes.INTEGER
  },
  nb_proposition: {
    type: DataTypes.INTEGER
  }
}, {
  tableName: 'POST_ANNONCE_DETAIL',
  timestamps: false, // Si vous ne voulez pas de champs createdAt et updatedAt,
  isView: true
});

module.exports = PostAnnonceDetail;
