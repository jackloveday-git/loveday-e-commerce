// Product Tag Model by Jack Loveday

const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model { }

// Define Product Tag Columns
ProductTag.init(
  {
    // id: int, no null, primary, auto inc
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    // product_id: int, reference the product
    product_id: {
      type: DataTypes.INTEGER,

      // Make the reference here
      references: {
        model: "product",
        key: "id"
      }
    },

    // tag_id: int, reference the tag
    tag_id: {
      type: DataTypes.INTEGER,

      // Make the reference here
      references: {
        model: "tag",
        key: "id"
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
