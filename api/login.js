const UserModel = require("../db/user");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const userModel = require("../db/user");
/**
 * @description the list of below imported contents are responsible for handling the routes
 * @default all the routes starts with /v1/
 */

router.post("/", async ({ body }, res) => {
  let { username = '', password = '' } = body;
  try {
    /**
     * @todo check the database if the email is really in it
     * else i will throw and error
     */
    let usernameIsInDB = await userModel.findOne({ where: { username } });
    if (!usernameIsInDB)
      return res
        .status(403)
        .json({ error: true, errorMsg: `invalid username or password` });
    /**
     * @default if the username is in the db please compare the passwords
     * it is a better way to verify ownership of account on this platform
     */
    let passwordIsMatch = await bcrypt.compare(
      password,
      usernameIsInDB.password
    );
    if (!passwordIsMatch)
      res
        .status(403)
        .json({ errorMsg: "invalid username or password", error: true });
    /**
     * @param this is only met when the above data falls to be true
     * @template res.json(token)
     * @template res.cookie()
     */
    let token = jwt.sign(
      { ...usernameIsInDB.dataValues, password: null },
      "MONEY_MIND"
    );
    res.cookie('_at', token, {
        expires: new Date(Date.now() * 60 * 60+1000)
    })
    res.json({ errorMsg: null, error: false, token });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({
        error: true,
        errorMsg: "oops, an unknown problem was encountered",
      });
  }
});

module.exports = router;
