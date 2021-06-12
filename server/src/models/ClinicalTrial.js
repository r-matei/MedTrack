module.exports = (sequelize, DataTypes) => {
  const ClinicalTrial = sequelize.define('ClinicalTrial', {
    title: DataTypes.STRING,
    phase: DataTypes.STRING,
    description: DataTypes.TEXT,
    adverseEffects: DataTypes.STRING,
    supervisorId: DataTypes.NUMBER,
    status: DataTypes.STRING,
    link: DataTypes.STRING,
    requirements: DataTypes.TEXT
  })

  return ClinicalTrial
}