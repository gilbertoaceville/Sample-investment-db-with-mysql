const DB = require("./connection");
const { DataTypes } = require("sequelize");
const moment = require("moment");
const { uuid } = require("uuidv4");

/**
 * @description this model holds the withdrawal schema in the database, and helps to query the db directly without writing the
 * sql query manually.
 * ```js
 * Withdrawal.findAll()
 * Withdrawal.findOne()
 * Withdrawal.update()
 * Withdrawal.create()
 * Withdrawal.bulkCreate()
 * ```
 */
const Withdrawal = DB.define("withdrawal", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: uuid()
      .split("-")
      .join("")
  },
  amount: {
    type: DataTypes.STRING,
    allowNull: false
  },
  /**
   * this aspect keeps the id of the corresponding investment to balance
   * @returns
   * ```js
   *false
   *```
   */
  investmentToBalance: {
    type: DataTypes.STRING,
    allowNull: false
  },
  owner: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.STRING,
    defaultValue: moment().format("LLLL")
  },
  isPaid: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

/**
 * @param
 * @default the param is set at false
 * ``` js
 *  withdrawal.sync({force: false})
 * .then()
 * .catch()
 * ```
 * @function the sync function receives a param of an object
 */

Withdrawal.sync({ force: false })
  .then(() => console.log("the withdrawal table has been created"))
  .catch(e => console.log("the withdrawal table crashed"));

export default Withdrawal;
