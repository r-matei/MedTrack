module.exports = (sequelize, DataTypes) => {
  const Medication = sequelize.define('Medication', {
    clinicalTrialId: DataTypes.NUMBER,
    type: DataTypes.STRING,
    name: DataTypes.STRING,
    period: DataTypes.STRING,
    qtyPerUse: DataTypes.NUMBER,
    qtyPerPacient: DataTypes.NUMBER
  })

  return Medication
}