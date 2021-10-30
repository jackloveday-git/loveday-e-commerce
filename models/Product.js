// Product Model by Jack Loveday

// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model { }

// set up fields and rules for Product model
Product.init(
  {
    // id: int, no null, primary, auto inc
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    // product_name: string, no null
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    // price: dec, no null, validation
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,

      // Validate type here
      validate: {
        isDecimal: true
      }
    },

    // stock: int, no null, default 10, validation
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric: true
      }
    },

    // category_id: int, reference category id
    category_id: {
      type: DataTypes.INTEGER,

      // Make reference here
      references: {
        model: "category",
        key: "id"
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
