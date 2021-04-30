const router = require("express").Router();
const verify_user = require("../middleware/verify_user");
const Withdrawal = require("../db/withdrawal");
const Investment = require("../db/investment");

/**
 * @desc this route will be responsible for handling a withdrawal for a client
 */
router.post(
  "/:investment_id",
  verify_user,
  async ({ params, body, headers }, res) => {
    // verify if the investment is still active and not cancelled
    let { investment_id } = params;
    let { amount } = body;
    let { user: owner } = headers;
    try {
      let investmentIsStillActive = await Investment.findOne({
        where: { id: investment_id, cancelled: false, settled: false }
      });
      if (!investmentIsStillActive)
        return res.status(301).json({
          error: true,
          errorMsg: "withdrawal not allowed, investment not found"
        });
      /**
       * @summary this block of code is responsible for creating a withdraw
       */
      await Withdrawal.create({
        amount,
        owner,
        investmentToBalance: investmentIsStillActive.dataValues.amount
      });
      //after the investment is created, then respond to the user that it is created
      res.status(201).json({error: false, errorMsg: null, data: "your withdrawal has been placed"})
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

module.exports = router;
