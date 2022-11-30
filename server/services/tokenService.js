require('dotenv').config();
const jwt = require('jsonwebtoken');
const { Token } = require('../db/models');

class TokenService {
  generate(payload) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: '1h'});

    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '1d'});

    return {
      accessToken,
      refreshToken,
    }
  }

  async refreshSave(userId, refreshToken) {
    const refresh = await Token.findOne({where: {userId}});
    console.log('refresh save', refresh)
    if (refresh) {
      await Token.update({refreshToken}, {where: {userId}})
    } else await Token.create({userId, refreshToken})
  }

  validateAccess(accessToken) {
    try {
      return jwt.verify(accessToken, process.env.ACCESS_SECRET);
    } catch (error) {
      return null;
    }
  }

  validateRefresh(refreshToken) {
    try {console.log('jwt verify refresh', jwt.verify(refreshToken, process.env.REFRESH_SECRET))
      return jwt.verify(refreshToken, process.env.REFRESH_SECRET);
      
    } catch (error) {
      return null;
    }
  }

  async findToken(refreshToken) {
    try {
      return await Token.findOne({ refreshToken });
    } catch (error) {
      return null;
    }
  }
  
}

module.exports = new TokenService();
