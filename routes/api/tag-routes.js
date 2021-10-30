// tag-routes.js by Jack Loveday

const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Find all the tags
router.get('/', (req, res) => {
  Tag.findAll({

    // Check for attributes
    attributes: [
      'id',
      'tag_name'
    ],
    include: [
      {
        // Make sure the folowing is included
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

    // Return the tag data as a json
    .then(allTagData => res.json(allTagData))

    // Catch errors
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get one Tag by id
router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {

      // Match the id
      id: req.params.id
    },

    // Check the attributes
    attributes: [
      'id',
      'tag_name'
    ],

    // Make sure the following is included
    include: [
      {
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

    // Then check if the data is valid and return it as a json
    .then(oneTagData => {
      if (!oneTagData) {
        res.status(404).json({
          message: `No category found with ID: ${req.params.id}.`
        });
        return;
      }
      res.json(oneTagData);
    })

    // Catch errors
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Create a new tag
router.post('/', (req, res) => {
  Tag.create({

    // Create a new tag with the name value
    tag_name: req.body.tag_name
  })

    // Then return our new tag as json
    .then(newTagData => res.json(newTagData))

    // Catch errors
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Update a tag by its id
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {

      // Match the id
      id: req.params.id
    }
  })

    // Then make sure the data is valid, and return it as a json
    .then(deletedTagData => {
      if (!deletedTagData[0]) {
        res.status(404).json({
          message: `No category found with ID: ${req.params.id}.`
        });
        return;
      }
      res.json(deletedTagData);
    })

    // Catch errors
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Delete a tag by id
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {

      // Check for matching id
      id: req.params.id
    }
  })

    // Then check if the data is valid and remove it
    .then(deletedTagData => {
      if (!deletedTagData) {
        res.status(404).json({
          message: `No category found with ID: ${req.params.id}.`
        });
        return;
      }

      // Return the data as json
      res.json(deletedTagData);
    })

    // Catch errors
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
