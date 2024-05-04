const { DataTypes } = require('sequelize');
const sequelize = require('../configurations/database.configuration');

const User = sequelize.define('User', {
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  login: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  salt: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profile: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  mail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fax: {
    type: DataTypes.STRING,
    allowNull: false
  },
  function: {
    type: DataTypes.STRING,
    allowNull: false
  },
  company: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  address1: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address2: {
    type: DataTypes.STRING,
    allowNull: false
  },
  zip: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  custom1: {
    type: DataTypes.STRING,
    allowNull: false
  },
  custom2: {
    type: DataTypes.STRING,
    allowNull: false
  },
  disable: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  chgpwd: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  last_login: {
    type: DataTypes.DATE,
    allowNull: false
  },
  last_pwd_chg: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  auth_attempt: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ip: {
    type: DataTypes.STRING,
    allowNull: false
  },
  skin: {
    type: DataTypes.STRING,
    allowNull: false
  },
  default_ticket_state: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dashboard_ticket_order: {
    type: DataTypes.STRING,
    allowNull: false
  },
  limit_ticket_number: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  limit_ticket_days: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  limit_ticket_date_start: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'fr_FR'
  },
  ldap_guid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ldap_sid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  azure_ad_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  planning_color: {
    type: DataTypes.STRING,
    allowNull: false
  }, 
  numero_poste: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'utilisateur',
  timestamps: false
});


module.exports = User;