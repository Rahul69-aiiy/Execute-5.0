const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const ResourceData = sequelize.define('ResourceData', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  type: {
    type: DataTypes.ENUM('water', 'electricity'),
    allowNull: false,
  },
  value: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  unit: {
    type: DataTypes.STRING, // e.g., 'liters', 'kWh'
    allowNull: false,
  },
  zone_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = ResourceData;
