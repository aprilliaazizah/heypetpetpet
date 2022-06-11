"use strict";

let faker = require("faker");
let data = [];

// password = test123
for (let i = 0; i < 10; i++) {
  data.push({
    name: faker.name.findName().toUpperCase(),
    bio: faker.lorem.sentence(5),
    email: faker.internet.email().toLowerCase(),
    phoneNumber: faker.phone.phoneNumberFormat().split("-").join(""),
    password: "$2a$08$J.gYPG4tIeOTsTsOPauC5OC.6uinjSExXJhrPuXIrvPrsVp18T45S",
    photo: faker.internet.avatar(),
    role: i % 2 == 1 ? "admin" : "user",
  });
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("users", data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
