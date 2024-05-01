const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');
const Product = require('./Product'); // Import Product model
const Tag = require('./Tags'); // Import Tag model

class ProductTag extends Model {}

ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
  },
  product_id: {
    type: DataTypes.INTEGER,
    references: {
        model: Product, 
        key: 'id', 
    },
},

tag_id: {
  type: DataTypes.INTEGER,
  references: {
      model: Tag, 
      key: 'id', 
  },
},
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
