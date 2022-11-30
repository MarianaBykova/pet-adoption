const petRouter = require('express').Router();
const { Op } = require('sequelize');
const { Pet } = require('../db/models');
const checkAuth = require('../middleware/auth.middleware')

// get all pets
petRouter.get('/', async(req, res) => {
  const {sort, limit, page, ...restParams} = req.query;
  
  let pets;
  let offset = page * limit - limit;
  const {activity, activityLow, ...filters} = restParams;
  console.log(activity, activityLow, filters)

  if (sort === 'activityDESC' && activity && activityLow) {
    pets = await Pet.findAll({
      order: [['activity', 'DESC'], ['id', 'DESC']], 
      where: filters,
      limit, offset });
  } else if (sort === 'activityDESC' && activity) {
    pets = await Pet.findAll({
      order: [['activity', 'DESC'], ['id', 'DESC']], 
      where: {...filters, activity: {[Op.gt]:activity}},
      limit, offset }); 
    } else if (sort === 'activityDESC' && activityLow) {
      pets = await Pet.findAll({
        order: [['activity', 'DESC'], ['id', 'DESC']], 
        where: {...filters, activity: {[Op.lt]: activityLow}},
        limit, offset }); 
    } else if (sort === 'activityDESC') {
      pets = await Pet.findAll({ order: [['activity', 'DESC'], ['id', 'DESC']], where: filters, limit, offset });
    } else if (activity && activityLow) {
      console.log('HERERERER')
      pets = await Pet.findAll({order: [[sort, 'ASC'], ['id', 'ASC']], where: filters, limit, offset});
    } else if (activity) {
      console.log('here', activity)
      pets = await Pet.findAll({order: [[sort, 'ASC'], ['id', 'ASC']], where: {...filters, activity: {[Op.gt]: activity}}, limit, offset});
    } else if (activityLow) {
      pets = await Pet.findAll({order: [[sort, 'ASC'], ['id', 'ASC']], where: {...filters, activity: {[Op.lt]: activityLow}}, limit, offset});
    } else pets = await Pet.findAll({order: [[sort, 'ASC'], ['id', 'ASC']], where: filters, limit, offset});
  
    if (pets.length === 0) return res.json({message: 'По заданным параметрам ничего не найдено'})
    return res.json(pets);
})

// get pet's colors
petRouter.get('/color', async(req, res) => {
  const colors = await Pet.findAll({attributes: ['color']})

  return res.json(colors)
})


// get one pet
petRouter.get('/:id', async (req, res) => {
  const {id} = req.params;
  const pet = await Pet.findByPk(+id)

  return res.json(pet);
})

// create pet
petRouter.post('/create', checkAuth, async(req, res) => {
  try {
    await Pet.create(req.body)
    return res.status(201).json({message: 'Питомец создан!'})
  } catch (e) {
    res.status(400).json({message: 'Осуществлен некорректный запрос. Попробуйте еще раз.'})
  }
})


module.exports = petRouter;
