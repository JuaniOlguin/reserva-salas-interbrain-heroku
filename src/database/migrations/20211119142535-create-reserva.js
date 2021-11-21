'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reservas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      fecha: {
        allowNull: false,
        type: Sequelize.DATE,
        get(){
          return moment(this.getDataValue(fecha)).format('MM/DD/YYYY h:mm:ss')
        }
      },
      salaId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "salas",
          key: "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Reservas');
  }
};