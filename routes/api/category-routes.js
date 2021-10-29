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

// Find a single category by id
router.get('/:id', (req, res) => {
  Category.findOne({

    // Check for matching id value
    where: {
      id: req.params.id
    },

    // Check for attributes id, and category name 
    attributes: ['id', 'category_name'],
    include: [
      {
        // Make sure the category has the following:
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
    .then(oneCategoryData => {

      // Make sure res isnt null
      if (!oneCategoryData) {
        res.status(404).json({
          message: `No category found with ID: ${req.params.id}.`
        });
        return;
      }

      // It must exist so return as response
      res.json(oneCategoryData);
    })

    // Catch any errors
    .catch(err => {
      // Console log and send json response
      console.log(err);
      res.status(500).json(err);
    })
});

// Create a new Category
router.post('/', (req, res) => {
  Category.create({
    
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
