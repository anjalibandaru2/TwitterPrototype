const express = require('express');
const mountRoutes = require('.');
const sha1 = require('sha1');


var crypt = require('./bcrypt.js');

var app = express();
app.set('view engine', 'ejs');

const dbConnection = require('./../database/dbConnectionPool');
var Users = require('../models/UserSchema');



router = express.Router();
var exports = module.exports = {};

exports.loginSignupService = function loginSignupService(msg, callback) {
    console.log("e path:", msg.path);
    switch (msg.path) {
        case "signup":
            signup(msg, callback);
            break;
        case "login":
            login(msg, callback);
            break;
    }
};



async function signup(msg, callback) {

    console.log("In user Signup topic service. Msg: ", msg);
    //console.log(msg)
    let con = await dbConnection();

    Users.findOne({ email: msg.formatEmail }, async function (err, rows) {
        if (err) {
            console.log(err);
            console.log("unable to read the database");
            callback(err, "Database Error");
        } else {
            if (rows) {
                console.log("User already exists");
                callback(null, { status: 401, rows });
            } else {
                var userData = {
                    "username": msg.data.username,
                    "firstName": msg.data.firstName,
                    "lastName": msg.data.lastName,
                    "username": msg.data.username,
                    "email": msg.formatEmail,
                    "state": msg.data.state,
                    "city": msg.data.city,
                    "zipcode": msg.data.zipcode,
                    "active": true
                }
                //Save the user in Mongo database
                Users.create(userData, function (err, user) {
                    if (err) {
                        console.log("unable to insert into database", err);
                        callback(err, "Database Error");
                    } else {
                        console.log("User Signup Successful");
                        callback(null, { status: 200, user });
                    }
                });
                //Save the user in MySQL database
                try {    
                    await con.query("START TRANSACTION");
                    let savedUser = await con.query('INSERT INTO userMysql SET ?', [msg.inputData]);
                    await con.query("COMMIT");
                    console.log(savedUser)
                } catch (ex) {
                    console.log(ex);
                    await con.query("ROLLBACK");
                    console.log(ex);
                    throw ex;
                } finally {
                    await con.release();
                    await con.destroy();
                }

            }
        }
    });

}


async function login(msg, callback) {

    console.log("In login topic service. Msg: ", msg);
    
    let con = await dbConnection();
    
    try {
        await con.query("START TRANSACTION");
        
        let result = await con.query('SELECT * FROM userMysql WHERE username = ?', [msg.username]);
        await con.query("COMMIT");
        result = JSON.parse(JSON.stringify(result));
        console.log("result in login db")
        console.log(result)
        console.log(result[0].password)
        password = result[0].password
        firstname = result[0].firstName
        username = result[0].username
        callback(null, {password,status:200})

        return result;
    } catch (ex) {
        console.log(ex);
        throw ex;
    } finally {
        await con.release();
        await con.destroy();
    }
}



//module.exports = router;