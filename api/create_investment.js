const verify_user = require("../middleware/verify_user");
const userModel = require("../db/user");
const investmentModel = require("../db/investment");
const router = require("express").Router();

router.post(
    "/",
    verify_user,
    async({ headers, body = { amount: "", btc: "" } }, res) => {
        let { user = {} } = headers;
        try {
            if (!+body.amount)
                return res.status(400).json({
                    error: true,
                    errorMsg: "please enter a valid amount to create an investment",
                });
            /**
             * @todo before the investment will be created,
             * @access verify if the user that was supplied by the client is really a registered user and still active on the platform
             */
            let userIsStillActive = await userModel.findOne({
                where: { id: user.id },
            });
            if (!userIsStillActive)
                return res
                    .status(403)
                    .json({ error: true, errorMsg: "unauthorized access" });
            /**
             * @template the below line of codes will only be seen by the complier if the user is still active on the platform
             * @private here is where we create an investment for the valid user
             */
            let newInvestment = await investmentModel.create({
                amount: body.amount,
                btc: body.btc,
                investor: user.id,
            });
            res.json({
                newInvestment,
            });
        } catch (error) {
            res.status(500).json({
                error: true,
                errorMsg: "oops an unknown error was encountered on the server",
               
            });
            console.log(error);
        }
    }
);

module.exports = router;