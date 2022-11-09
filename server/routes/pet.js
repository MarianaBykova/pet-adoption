const petRouter = require('express').Router();
const { Pet } = require('../db/models');

// get all pets
petRouter.get('/', async(req, res) => {
  const {sort} = req.query;
  let pets;

  if (sort === 'activityDESC') {
    pets = await Pet.findAll({order: [['activity', 'DESC']]});
  } else pets = await Pet.findAll({order: [[sort, 'ASC']]});
  return res.json(pets);
})

// get one pet
petRouter.get('/:id', async (req, res) => {
  const {id} = req.params;
  const pet = await Pet.findByPk(+id)

  return res.json(pet);
})

module.exports = petRouter;
