// product-routes.js by Jack Loveday

const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// get all products
router.get('/', (req, res) => {
  Product.findAll({

    // Check attributes
    attributes: [
      'id',
      'product_name',
      'price',
      'stock',
      'category_id'
    ],

    // Check the Category, then for the Product attributes
    include: [
      {
        model: Category,
        attributes: [
          'id',
          'category_name'
        ]
      },
      {
        model: Tag,
        attributes: [
          'id',
          'tag_name'
        ]
      }
    ]
  })
    // Then return data as json
    .then(allProductData => res.json(allProductData))

    // Catch errors
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get one product
router.get('/:id', (req, res) => {
  Product.findOne({
    where: {

      // Check to match ID
      id: req.params.id
    },
    attributes: [
      'id',
      'product_name',
      'price',
      'stock',
      'category_id'
    ],
    include: [
      {
        // Check the Category then the product
        model: Category,
        attributes: [
          'id',
          'category_name'
        ]
      },
      {
        model: Tag,
        attributes: [
          'id',
          'tag_name'
        ]
      }
    ]
  })

    // Then check to make sure its there and return as json
    .then(oneProductData => {
      if (!oneProductData) {
        res.status(404).json({
          message: `No category found with ID: ${req.params.id}.`
        });
        return;
      }
      res.json(oneProductData);
    })

    // Check for errors
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create new product
router.post('/', (req, res) => {
  Product.create(req.body)
    .then((newProduct) => {
      if (req.body.tagIds.length) {
        const productArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: newProduct.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((newProductData) => res.status(200).json(newProductData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  Product.update(req.body, {
    where: {
      // Match id param
      id: req.params.id,
    },
  })
    // Then Check for associated tags
    .then((fillerData) => {
      return ProductTag.findAll({
        where: {
          product_id: req.params.id
        }
      });
    })
    // Update product based on tag
    .then((productTagData) => {

      // Create a new list of Tag ids
      const tagsList = productTagData.map(({
        tag_id
      }) => tag_id);

      // Then make a filtered list
      const filteredList = req.body.tagIds
        .filter((tag_id) => !tagsList.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });

      // Check which tags to remove
      const removedProducts = productTagData.filter(({ tag_id }) => !req.body.tagIds.includes(tag_id)).map(({ id }) => id);

      // Update new but delete the old
      return Promise.all([
        ProductTag.destroy({
          where: {

            // Verify the id
            id: removedProducts
          }
        }),

        // Then create the bulk tags
        ProductTag.bulkCreate(filteredList),
      ]);
    })

    // Return our new data as json
    .then((newProductData) => res.json(newProductData))

    // Catch errors
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {

});

module.exports = router;
