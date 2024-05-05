const { DataTypes } = require('sequelize');
const sequelize = require('../configurations/database.configuration');

const PropositionAnnonceDetail = sequelize.define('PropositionAnnonceDetail', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  id_post: DataTypes.INTEGER,
  id_utilisateur: DataTypes.INTEGER,
  id_competence: DataTypes.INTEGER,
  date_creation: DataTypes.DATE,
  etat: DataTypes.INTEGER,
  nom_utilisateur: DataTypes.STRING,
  prenom_utilisateur: DataTypes.STRING,
  avatar_utilisateur: DataTypes.STRING,
  titre_competence: DataTypes.STRING,
  types_competence: DataTypes.STRING,
  icon_competence: DataTypes.STRING,
  description_competence: DataTypes.TEXT,
  ordre_competence: DataTypes.INTEGER,
  id_root_competence: DataTypes.INTEGER,
  titre_racine_competence: DataTypes.STRING,
  couleur_racine_competence: DataTypes.STRING,
  root_competence: DataTypes.INTEGER,
  is_matching: DataTypes.INTEGER
}, {
  tableName: 'PROPOSITION_ANNONCE_DETAIL',
  timestamps: false // Si vous ne voulez pas de champs createdAt et updatedAt
});

module.exports = PropositionAnnonceDetail;
