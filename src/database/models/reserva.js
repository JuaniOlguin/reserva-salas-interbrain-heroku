'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reserva extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //Asociaciones
      this.belongsTo(models.Salas);
    }
  };
  Reserva.init({
    nombre: DataTypes.STRING,
    email: DataTypes.STRING,
    fecha: DataTypes.DATE,
    salaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Reserva',
  });
  return Reserva;
};