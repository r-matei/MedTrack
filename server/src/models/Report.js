module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    userId: DataTypes.STRING,
    title: DataTypes.STRING,
    size: DataTypes.STRING,
    link: DataTypes.STRING
  })

  return Report
}