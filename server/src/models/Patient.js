const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (patient)
 {
   const SALT_FACTOR = 8

   if (!patient.changed('password')) {
     return
   }

   return bcrypt
   .genSaltAsync(SALT_FACTOR)
   .then(salt => bcrypt.hashAsync(patient.password, salt, null))
   .then(hash => {
    patient.setDataValue('password', hash)
   })
 }
module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define('Patient', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword,
      beforeSave: hashPassword
    }
  })

  Patient.prototype.comparePassword = function (password) {
    return bcrypt.compareAsync(password, this.password)
  }

  return Patient
}