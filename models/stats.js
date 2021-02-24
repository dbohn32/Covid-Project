module.exports = function(sequelize, DataTypes) {
  const Stats = sequelize.define("Stat", {
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    totalCases: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    totalDeaths: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return Stats;
};
