// import models
const Product = require('./Product');
const Category = require('./Category');
const Tags = require('./Tags');
const ProductTag = require('./ProductTag');

// Define associations
// Products belong to a Category
Product.belongsTo(Category, {
  foreignKey: 'category_id', // Foreign key in the Product table
  onDelete: 'CASCADE',      // If a Category is deleted, associated Products are also deleted
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id', // Foreign key in the Product table
  onDelete: 'CASCADE',      // If a Category is deleted, associated Products are also deleted
});

// Products belong to many Tags through ProductTag
Product.belongsToMany(Tags, {
  through: ProductTag,      // Use the ProductTag model as the intermediary table
  foreignKey: 'product_id', // Foreign key in the ProductTag table referencing Product
});

// Tags belong to many Products through ProductTag
Tags.belongsToMany(Product, {
  through: ProductTag,   // Use the ProductTag model as the intermediary table
  foreignKey: 'tag_id',  // Foreign key in the ProductTag table referencing Tag
});

module.exports = {
  Product,
  Category,
  Tags,
  ProductTag,
};
