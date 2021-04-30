const router = require('express').Router()
const verify_user = require('../middleware/verify_user');
const userModel = require('../db/user');

router.put('/:user_id', verify_user, async ({headers,params,body},res)=> {
    let {user} = headers;
    let {user_id} = params;
    let {phone = '', walletID = ''} = body;
    try {
        console.log(user_id);
        let isUserIDValid =await userModel.findOne({where: {id: user_id}})
        if(!isUserIDValid) return res.status(400).json({error: true, data:null, errorMsg: "invalid user in session"})
        //if the user is registered then reset the detials
        await userModel.update({phone,walletID}, {where: {id: user.id}})
        //if the update was successful then response to the client that it was
        res.json({error: false, errorMsg: false, data: "profile update successful"})
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;