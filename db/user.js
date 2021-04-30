const DB = require("./connection");
const { DataTypes } = require("sequelize");
const { uuid } = require("uuidv4");
const bcrypt = require("bcryptjs");
const moment = require("moment");

const userModel = DB.define(
  "user",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: "please enter a valid email",
        },
      },
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    upline: {
      type: DataTypes.STRING,
      defaultValue: "admin@elitecoins.com",
      validate: {
        isEmail: {
          args: true,
          msg: "please enter a valid upline email",
        },
      },
    },
    walletID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    date: {
      type: DataTypes.STRING,
      defaultValue: moment().format("LLLL"),
    },
  },
  {
    hooks: {
      beforeValidate: async (user) => {
        if (user.id === null) {
            let id = uuid().split('-').join('');
            user.id = id;
        }
      },
      afterValidate: async (user) => {
        if (user.password) {
          // generate a hash  and update the user
          let salt = await bcrypt.genSalt(12);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

// writing the changes to the db

userModel
  .sync({ force: false })
  .then(() => console.log("the users table has been created"))
  .catch((e) => console.log("the user table crashed", e));

// export
module.exports = userModel;
