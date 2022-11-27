const { User } = require('../db/models');
const tokenService = require('../services/tokenService');

module.exports = async (req, res, next) => {
  try {
    const token = (req.headers.authorization);
    console.log('token req headers', token);

    if (!token) return res.status(401).json({message: 'Пользователь не авторизован'})

    const decoded = tokenService.validateAccess(token)
    console.log('decoded', decoded);
    req.userId = decoded.id
    next()

  } catch(e) {
    return res.status(401).json({message: 'Пользователь не авторизован'})
  }
}
