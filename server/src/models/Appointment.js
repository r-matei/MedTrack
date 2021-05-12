module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
    userId: DataTypes.NUMBER,
    name: DataTypes.STRING,
    supervisorId: DataTypes.NUMBER,
    date: DataTypes.DATE,
    description: DataTypes.TEXT
  })

  return Appointment
}