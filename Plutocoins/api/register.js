const express = require("express")
const router = express.Router();
const UserModel = require('../db/user')
const jwt = require('jsonwebtoken');
const userModel = require("../db/user");


/**
 * @param this route is going to handle every user registration
 * @readonly the route is on for users
 * @template /v1/user/register
 * @default req.body
 */

router.post("/", async (req, res) => {
    try {
        let { email, full_name, password, upline, walletID, username } = req.body;
        /**
         * @param check if the email has been used before
         * @private check if the username has been used before
         */
        let emailISInDB = await userModel.findOne({ where: { email }, attributes: ['email'] })
        if (emailISInDB) return res.status(400).json({ error: true, errorMsg: `${email} has already been used` })
        // username
        let usernameIsInDb = await userModel.findOne({ where: { username }, attributes: ['email'] })
        if (usernameIsInDb) return res.status(400).json({ error: true, errorMsg: `${username} has already been used` })
        let newUser = await UserModel.create({ email, password, full_name, upline, walletID, username })
        let token = jwt.sign({ ...newUser.dataValues, password: null }, "MONEY_MIND")
        
        res.status(201).json({ error: false, errorMsg: null, token })
    } catch (error) {
        console.log(error);
        // if (error?.errors[0]?.message) return res.status(400).json({ error: true, errorMsg:error?.errors[0]?.message   })
        res.status(400).json({ error: true, errorMsg: "oops! an error occurred" });
    }
});



module.exports = router;