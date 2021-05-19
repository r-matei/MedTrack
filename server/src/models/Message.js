module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    userId: DataTypes.STRING,
    message: DataTypes.TEXT,
    to: DataTypes.STRING
  })

  return Message
}