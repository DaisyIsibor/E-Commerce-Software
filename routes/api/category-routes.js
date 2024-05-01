const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try{
  const categories = await Category.findAll({
    // be sure to include its associated Products
    include:{model: Product}
  });
      res.status(200).json(categories);
    } catch (error) {
      console.error('Error retrieving categories:', error);
      res.status(500).json({ error: 'Failed to retrieve categories' });
    }
  
  
});

router.get('/:id', async (req, res) => {
  const categoryId = req.params.id;
  try {
    // Find one category by ID and include associated Products
    const category = await Category.findByPk(categoryId, {
      include: { model: Product } // Include associated Products
    });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error(`Error retrieving category ${categoryId}:`, error);
    res.status(500).json({ error: 'Failed to retrieve category' });
  }
});


router.post('/', async (req, res) => {
  const { category_name } = req.body;
  try {
    // Create a new category
    const newCategory = await Category.create({ category_name });
    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Failed to create category' });
  }
});


router.put('/:id', async (req, res) => {
  const categoryId = req.params.id;
  const { category_name } = req.body;
  try {
    // Find the category by ID
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    // Update the category
    category.category_name = category_name;
    await category.save();
    res.status(200).json(category);
  } catch (error) {
    console.error(`Error updating category ${categoryId}:`, error);
    res.status(500).json({ error: 'Failed to update category' });
  }
});

router.delete('/:id', async (req, res) => {
  const categoryId = req.params.id;
  try {
    // Find the category by ID
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    // Delete the category
    await category.destroy();
    res.status(204).end(); // No content to send back after successful deletion
  } catch (error) {
    console.error(`Error deleting category ${categoryId}:`, error);
    res.status(500).json({ error: 'Failed to delete category' });
  }
});


module.exports = router;
