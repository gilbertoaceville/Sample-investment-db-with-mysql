const router = require('express').Router()
// const adminModel = require('../db/')
const withdrawalModel = require('../db/withdrawal')


/**
 * @access only the admin can access this route
 * @summary the route will resolve the withdrawal
 */
router.post('/:withdrawal_id', async({params},res)=> {
    let {withdrawal_id} = params;
    try {
        let investmentIsActive = await withdrawalModel.findOne({where: {id:withdrawal_id }})
        if(!investmentIsActive) return res.status(301).json({error: true, errorMsg: "the investment has been moved", data: null})
        res.json({investmentIsActive})
    } catch (error) {
        console.log(error);
        res.status(400).json({error: true, errorMsg: "oops an error occurred in the server.", data: null})
    }
})