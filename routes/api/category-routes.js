// category-routes.js by Jack Loveday

const router = require('express').Router();
const { Category, Product } = require('../../models');

// Find All Categories and associated Products
router.get('/', (req, res) => {
  Category.findAll({
    // Check for attributes id, and category name
    attributes: ['id', 'category_name'],
    include: [
      {
        // Make sure the categories have the following:
        model: Product,
        attributes: [
          'id',
          'product_name',
          'price',
          'stock',
          'category_id'
        ]
      }
    ]
  })
  // Save the Data as a JSON
  .then(categoryData => res.json(categoryData))
  // Catch any errors
  .catch(err => {
    // Console log and send json response
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
