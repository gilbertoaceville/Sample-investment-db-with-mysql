const router = require('express').Router()
const verify_user = require('../middleware/verify_user');
const userModel = require('../db/user');

router.get('/', verify_user, async ({headers,params,body},res)=> {
    let {user} = headers;
    try {
        let Downlines = await userModel.findAll({where: {upline: user.email}})
        res.json({Downlines})
    } catch (error) {
        res.status(400).json({error: true, errorMsg: "an error occured", data: null})
    }
})

module.exports = router;