const express = require('express');
const helmet = require('helmet');
const logger  = require('morgan');
const cors  = require('cors');
const app = express()
require('dotenv').config()

/**
 * @tutorial the use functions are for express middleware 
 */
app.use(express.json())
app.use(helmet())
app.use(logger())
app.use(cors())

/**
 * @protected the protection will be attached to the router from the main file
 * @description the list of below imported contents are responsible for handling the routes
 * @default all the routes starts with /v1/
 */
const registration = require('./api/register')
const login = require('./api/login')
const update_user= require('./api/update_user')
const reset_pwd= require('./api/reset-pwd')
const create_investment = require('./api/create_investment')
const cancel_investment = require('./api/cancel_investment')
const view_investment = require('./api/view_investment')
const view_downlines = require('./api/view-downlines')


 
// handling user registration 
app.use('/v1/user/register', registration)
app.use('/v1/user/login', login)
app.use('/v1/user/edit', update_user)
app.use('/v1/user/password/change', reset_pwd)
app.use('/v1/user/view/downlines', view_downlines)


/**
 * @param they only request that will hit here, are they requests for the investment 
 */


// investments route 
 app.use('/v1/investment/create', create_investment)
 app.use('/v1/investment/cancel', cancel_investment)
 app.use('/v1/investment/view', view_investment)









require('./db/connection')
app.listen(process.env.PORT || 4000, ()=>console.log(`the server has started on ${process.env.PORT}`))



// var exec = require('child_process').exec(' mysqldump -u root -p <VICMIE/> plutocoin > fileName.sql');