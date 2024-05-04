const { DataTypes } = require('sequelize');
const sequelize = require('../configurations/database.configuration');
const UserXp = sequelize.define('UserXp', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id', // Nom de la colonne dans la table
    references: {
      model: 'utilisateur', // Nom de la table référencée
      key: 'id'
    }
  },
  xp: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  xpPlus: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'xp_plus' // Nom de la colonne dans la table
  },
  dateins: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP') // Définit la valeur par défaut à la date et l'heure actuelles
  }
}, {
  tableName: 'user_xp', // Nom de la table dans la base de données
  timestamps: false // Désactiver les timestamps automatiques
});

// Exporter le modèle UserXp
module.exports = UserXp;
