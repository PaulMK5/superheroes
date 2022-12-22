'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('heroes_powers', {
      heroId: {
        field: 'hero_id',
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'superheroes', key: 'id' }
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },

      powerId: {
        field: 'power_id',
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'superpowers', key: 'id' }
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      createdAt: {
        allowNull: false,
        field: 'created_at',
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        field: 'updated_at',
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('heroes_powers');
  }
};
