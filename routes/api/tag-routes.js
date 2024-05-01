const router = require('express').Router();
const { Tags, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tags.findAll({
    include: [{ model: Product, through: ProductTag }]
  })
  .then(tags => {
    // Log fetched tags
    console.log('Fetched tags:', tags);
    res.json(tags);
  })
  .catch(err => {
    // Log error
    console.error('Error fetching tags:', err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tags.findOne({
    where: { id: req.params.id },
    include: [{ model: Product, through: ProductTag }]
  })
  .then(tag => res.json(tag))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tags.create(req.body)
    .then(tag => res.status(200).json(tag))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});



router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tags.update(req.body, { // Updated model name
    where: {
      id: req.params.id
    }
  })
  .then(tag => {
    if (tag[0] === 0) {
      res.status(404).json({ message: "No tag found with this id." });
      return;
    }
    res.status(200).json(tag);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete one tag by its `id` value
  Tags.destroy({ // Updated model name
    where: {
      id: req.params.id
    }
  })
  .then(tag => {
    if (!tag) {
      res.status(404).json({ message: "No tag found with this id." });
      return;
    }
    res.json(tag);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
