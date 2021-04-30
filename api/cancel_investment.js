const router = require('express').Router()
const investmentModel = require('../db/investment')
const verify_user = require('../middleware/verify_user')


/**
 * this route is for cancelling  a single investment 
 * * The investment will be cancelled and become void.
 * @method PUT
 * @protected only a logged in user can access this route 
 * @async every other functions in it is async in nature 
 */

router.put('/:investment_id', verify_user, async({headers = {}, cookies, params},res)=>{
    let {user} = headers;
    let {investment_id} = params;
    /**
     * @returns this is where i render back to the ui from the server
     */
   try {
    let foundInvestment = await investmentModel.findOne({where: {id:investment_id}})
    if(!foundInvestment) return res.status(403).json({error:true, errorMsg: 'the investment you wished to cancel has been deleted or moved'})
    await investmentModel.update({cancelled: true},{where: {id: investment_id }, returning:true})
    foundInvestment = await investmentModel.findOne({where: {id:investment_id}})
    /**
     * after the update has been made to the model in the db 
     */
    res.json({foundInvestment})
   } catch (error) {
       res.status(403).json({error: true, errorMsg: "oops!, an error was encountered during the process"})
   }
})



module.exports = router;