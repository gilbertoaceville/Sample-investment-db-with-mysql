const router = require("express").Router();
const investmentModel = require("../db/investment");
const verify_user = require("../middleware/verify_user");

/**
 * @summary this route is to allow the users to be able to view a single investment
 * by visiting the end point URL, followed by the investment_id
 */
router.get("/:investment_id", verify_user, async ({ params }, res) => {
  try {
    let { investment_id } = params;
    let foundInvestment = await investmentModel.findOne({
      where: { id: investment_id },
    });
    /**
     * @protected
     */
    if (!foundInvestment)
      return res
        .status(301)
        .json({
          errorMsg: "the content has been moved or deleted",
          error: true,
        });
    res.json({ foundInvestment });
  } catch (error) {
    res
      .status(500)
      .json({ error: true, errorMsg: "oops!, an internal error occurred " });
  }
});

/**
* @summary the below route will be responsible for viewing all the investment(s) made by a 
particular user, 
and the user will be gotten from the token attached to the headers of the request
*/

router.get("/", verify_user, async ({ headers }, res) => {
  try {
    let {user} = headers;
    let allInvestmentsByTheUser = await investmentModel.findAll({where: { investor: user.id } });
    /**
     * @tutorial after the investments are found, then respond to the user with the details about it
     *
     */
    
    res.json({ data: allInvestmentsByTheUser, error: false, errorMsg: null });
  } catch (error) {
      res.status(500).json({error: true, errorMsg: 'oops!!!, an unknown error occurred in the server',e:error})
  }
});

module.exports = router;
