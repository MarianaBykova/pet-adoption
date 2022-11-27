const authRouter = require('express').Router();
const bcrypt = require('bcrypt');
const { User, Token } = require('../db/models');
const tokenService = require('../services/tokenService');

function isTokenInvalid(data, dbToken) {
  return !data || !dbToken || data._id !== dbToken?.user?.toString();
}

// вход на сайт пользователя
authRouter.post('/', async(req, res) => {
  try {
    const {email, password} = req.body;

    console.log('email password', email, password)

    const user = await User.findOne({where: {email}});
    if (!user) return res.status(400).json({message: 'Пользователя с таким email не существует'})

    const mathcPassword = await bcrypt.compare(password, user.password);
    console.log(mathcPassword, 'matchPass')
    if(!mathcPassword) return res.status(400).json({message: 'Неправильный пароль'});

    const tokens = tokenService.generate({id: user.id});
    console.log('login tokens', tokens)
    await tokenService.refreshSave(user.id, tokens.refreshToken)
    return res.json({message: 'Вы вошли в систему', ...tokens, user: user.id})
  } catch (e) {
    res.send({message: 'Произошла ошибка входа пользователя на сервер'})
  }
});

authRouter.post('/token', async(req,res) => {
  try {
    const {refreshToken} = req.body;
    const data = tokenService.validateRefresh(refreshToken)
    console.log('data validate', data)
    const dbToken = await tokenService.findToken(refreshToken);
    console.log('dbToken', dbToken )

    if (isTokenInvalid(data, dbToken)) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const tokens = tokenService.generate({
      id: data.id,
    });

    await tokenService.refreshSave(data.id, tokens.refreshToken)

    return res.status(200).send({message: 'Вы вошли в систему', ...tokens, user: data.id });

  } catch (e) {
    res.status(500).json({message: 'На сервере произошла ошибка. Попробуйте позже!'})
  }
})

module.exports = authRouter;
