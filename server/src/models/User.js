const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (user)
 {
   const SALT_FACTOR = 8

   if (!user.changed('password')) {
     return
   }

   return bcrypt
   .genSaltAsync(SALT_FACTOR)
   .then(salt => bcrypt.hashAsync(user.password, salt, null))
   .then(hash => {
    user.setDataValue('password', hash)
   })
 }
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    sex: DataTypes.STRING,
    type: DataTypes.STRING,
    img: DataTypes.STRING,
    birthDate: DataTypes.DATEONLY,
    bloodType: DataTypes.STRING,
    height: DataTypes.NUMBER,
    weight: DataTypes.NUMBER,
    clinicalTrialId: DataTypes.NUMBER,
    supervisorId: DataTypes.NUMBER,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    street: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    phoneNumber: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword,
      beforeSave: hashPassword
    }
  })

  User.prototype.comparePassword = function (password) {
    return password == 'parolamea'
  }

  return User
}