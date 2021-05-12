module.exports = (sequelize, DataTypes) => {
  const Result = sequelize.define('Result', {
    userId: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    title: DataTypes.STRING,
    text: DataTypes.TEXT,
    healthCoef: DataTypes.NUMBER
  })

  return Result
}