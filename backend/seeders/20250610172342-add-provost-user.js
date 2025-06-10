'use strict';

const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
      const hashedPassword = await bcrypt.hash("u4l1hjjg@cy@!", 10);

      await queryInterface.bulkInsert("Users", [
        {
          id: Sequelize.literal('uuid_generate_v4()'),
          email: "provost.office@narxoz.kz",
          password: hashedPassword,
          name: "Provost Office",
          role: "career_center",
          photo: '/uploads/users/default.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("Users", { email: "provost.office@narxoz.kz" });
  },
};
