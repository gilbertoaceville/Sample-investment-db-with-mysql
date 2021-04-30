const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("opera", "servers", "mummy", {
  dialect: "mysql",
  logging: false
});

// authenticate and try

sequelize
  .authenticate()
  .then(() => console.log("the database has connected without errors"))
  .catch(e => console.log("the database has failed to connect " + e));

// export the db instance

module.exports = sequelize;
