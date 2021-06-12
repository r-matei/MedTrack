module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    userId: DataTypes.NUMBER,
    message: DataTypes.TEXT,
    to: DataTypes.NUMBER
  })

  return Message
}