const userRouter = require('express').Router();
const { User } = require('../db/models');
const checkAuth = require('../middleware/auth.middleware')
const bcrypt = require('bcrypt');

userRouter.get('/', checkAuth, async(req, res) => {
  const user = await User.findOne({where: {id: req.userId}})
  console.log('user id req', req.userId)
  if(!user) return res.status(400).json({message: 'Такого пользователя не существует'});

  return res.json({
    userName: user.userName,
    email: user.email
  })
})

userRouter.post('/edit', checkAuth, async(req, res) => {
  try {
    const {password, ...restData} = req.body;
        
    if (password) restData.password = await bcrypt.hash(password, 7);

    await User.update(restData, {where: {id: req.userId}});
    const updatedUser = await User.findByPk(req.userId)

    return res.json({
      user: 
      {userName: updatedUser.userName, email: updatedUser.email}, 
      message: 'Данные успешно обновлены'
    })
  } catch (e) {
    return res.status(500).json({message: 'Ошибка сервера'})
  }
})

module.exports = userRouter;
