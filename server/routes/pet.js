const petRouter = require('express').Router();
const { Op } = require('sequelize');
const { Pet, Archive } = require('../db/models');
const checkAuth = require('../middleware/auth.middleware');

// get archive pets
petRouter.get('/archive', async(req, res) => {
  try {
    const archivePets = await Archive.findAll();
    return res.json(archivePets);
  } catch (e) {
    res.status(500).json({ message: 'На сервере произошла ошибка. Попробуйте позже.' })
  }
})

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

// get all pets without queries
petRouter.get('/all', checkAuth, async(req,res) => {
  const pets = await Pet.findAll();
  return res.json(pets)
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

// update pet
petRouter.post('/update/:id', checkAuth, async(req, res) => {
  try {
    const { id } = req.params;
    await Pet.update(req.body, {where: {id}})
    return res.status(202).json({ message: 'Питомец обновлен.' })
  } catch (e) {
    res.status(500).json({ message: 'На сервере произошла ошибка. Попробуйте позже.' })
  }
})

// update archive pet 
petRouter.post('/archive/:id', checkAuth, async(req, res) => {
  try {
    const { id } = req.params;
    const { text, history } = req.body;

    if (history) {
      await Archive.update({ text, history, hasHistory: true }, { where: {id} })
    } else {
      await Archive.update(req.body, { where: {id} })
    }
    return res.json({ message: 'Данные обновлены.' })
  } catch (e) {
    res.status(500).json({ message: 'На сервере произошла ошибка. Попробуйте позже.' })
  }
})

// send pet to archive
petRouter.delete('/archive/:id', checkAuth, async(req, res) => {
  try {
    const { id } = req.params;
    console.log('ID', id)
    const pet = await Pet.findByPk(+id);
    await Pet.destroy({where: { id }});
    await Archive.create({ name: pet.name, age: pet.age, image: pet.image[0], hasHistory: false })
    return res.status(201).json({ message: 'Питомец отправлен в архив.' })
  } catch (e) {
    res.status(500).json({ message: 'На сервере произошла ошибка. Попробуйте позже.' })
  }
})

// delete one pet 
petRouter.delete('/:id', checkAuth, async(req, res) => {
  try {
    const { id } = req.params;
    await Pet.destroy({ where: { id } })
    return res.json({ message: 'Питомец удален.' })
  } catch (e) {
    res.status(500).json({ message: 'На сервере произошла ошибка. Попробуйте позже.' })
  }
})

module.exports = petRouter;
