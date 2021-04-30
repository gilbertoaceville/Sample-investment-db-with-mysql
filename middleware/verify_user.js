const { verify } = require("jsonwebtoken");

/**
 *
 * @param {*} {} | this is receiving the request that is coming to the server, and will parse it for authentication
 * @param {*} res | this will allow the middleware to be able to respond to the client
 * @param {*} next | this will be called when the authentication is successfully, so as to move to the next function for processing
 */
const verify_user = async ({ headers }, res = {}, next = () => {}) => {
  let { cookie = '', authorization = "bearer token" } = headers;
  try {
    /**
     * @template  app.get('/data/hidden', verify_user, ()=> {})
     * @description this function helps to make authorization simple and neat, so as to keep the codebase very simple and neat
     */
    let whoIsVisiting = verify(authorization.split(" ")[1], "MONEY_MIND");

    if (!whoIsVisiting)
      return res
        .status(403)
        .json({ error: true, errorMsg: "unauthorized access" });
    /**
     * @param
     * @desc
     * the below line of code will only be ran if the user is authenticated and not a hacked account
     */
    
     headers.user = whoIsVisiting;
    
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError")
      return res
        .status(403)
        .json({ error: true, errorMsg: "unauthorized access" });
    res.status(500).json({
      error: true,
      errorMsg: "oops, an unknown error occurred",
    });
  }
};

module.exports = verify_user;
