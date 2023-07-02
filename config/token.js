const jwt=require('jsonwebtoken');
const generateToken = (_id) => {
    return jwt.sign({ _id }, "Albatros", {
      expiresIn: '1d',
    });
  }
module.exports = generateToken;