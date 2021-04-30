const router = require('express').Router()
const verify_user = require('../middleware/verify_user');
const userModel = require('../db/user');
const bcrypt = require('bcryptjs')
router.post('/', verify_user, async ({headers,params,body},res)=> {
    let {user} = headers;
    let {oldPassword:password = '', newPassword = ''} = body;
     try {
         let userIsActive = await userModel.findOne({where: {id: user.id}})
         if(!userIsActive) return res.status(400).json({data:null, error: true, errorMsg: "invalid user in session"});
         //compare the old and new
         let passwordIsMatch = await bcrypt.compare(password,userIsActive.dataValues.password)
         if(!passwordIsMatch) return res.status(400).json({error: true,errorMsg:'password doesn\'t match',data:null})
        //  if password match
        await userModel.update({password: newPassword}, {where: {id:user.id}})
         res.json({error: false, errorMsg: null, data: "password change was successful"})
     } catch (error) {
         console.log(error);
         res.status(500).json({error: true, errorMsg: "internal server error", data: null})
     }
})

module.exports = router;