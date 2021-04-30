const DB = require("./connection");
const { DataTypes } = require("sequelize");
const  { nanoid } = require("nanoid")
const moment = require("moment");

const Investment = DB.define("investment", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    amount: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    btc: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    investor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.STRING,
        defaultValue: moment().format("LLLL"),
    },
    settled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    cancelled:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    hooks:{
        beforeValidate: function(Investinstance){
            Investinstance.id  = nanoid();
        }
    }
});

Investment.sync({ force: false })
    .then(() => console.log("the investment was created"))
    .catch(() => console.log("the investment wasn't created"));

module.exports = Investment;