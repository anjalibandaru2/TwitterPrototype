const express = require('express');

var app = express();
app.set('view engine', 'ejs');

var Users = require('../models/UserSchema');
var Tweets = require('../models/TweetSchema');
var Lists = require('../models/Lists')

const dbConnection = require('./../database/dbConnectionPool');


router = express.Router();
var exports = module.exports = {};

exports.profileTopicService = function profileTopicService(msg, callback) {
    console.log("e path:", msg.path);
    switch (msg.path) {
        case "getProfileDetails":
            getProfileDetails(msg, callback);
            break;
        case "updateProfile":
            updateProfile(msg, callback);
            break;
        case "getLikes":
            getLikes(msg, callback);
            break;
        case "getTweets":
            getTweets(msg, callback);
            break;
        case "getFollow":
            getFollow(msg, callback);
            break;
    }
};


async function getProfileDetails(msg, callback) {

    console.log("In user getProfileDetails topic service. Msg: ", msg);

    Users.findOneAndUpdate({  $and:[{username: msg.data }, {active:true}]}, {
        $inc: {
            viewCount: 1
        }
    }, async function (err, rows) {
        if (err) {
            console.log(err);
            console.log("unable to read the database");
            callback(err, "Database Error");
        } else {

            console.log(" got user ");
            callback(null, { status: 200, rows });
        }
    });

}


async function updateProfile(msg, callback) {

    console.log("In user updateProfile topic service. Msg: ", msg);
    console.log(msg)
    console.log(msg.data.username)
    let con = await dbConnection();
    var fullname=msg.data.firstName+' '+msg.data.lastName;

    try {
        Users.findOneAndUpdate({ 'username': msg.data.username }, {
            $set: {
                "firstName": msg.data.firstName,
                "lastName": msg.data.lastName,
                "description": msg.data.description,
                "state": msg.data.state,
                "city": msg.data.city,
                "zipcode": msg.data.zipcode,
                "profilePicture":msg.media
            }
        },
            async function (err, results) {
                console.log("results:")
                console.log(results);
                console.log(err)
                if (err) {
                    console.log(err);
                    callback(err, "Database Error");
                } else {
                    if (results) {
                        console.log("results:")
                        console.log(results);
                        callback(null, { status: 200 });
                        results.save(function (err) {
                            if (!err) {
                                callback(null, { status: 200, message: "user updated successfully!!" });
                            } else {
                                callback(null, { status: 200, message: "user updated failed!!" });
                            }
                        })
                    }
                    else {
                        console.log("No results found");
                        callback(null, { status: 205 });
                    }
                }

            })
        await con.query("START TRANSACTION");
       
        let savedUser = await con.query('UPDATE userMysql SET firstname = ?, lastName= ?', [msg.data.firstName, msg.data.lastName]);
        await con.query("COMMIT");

        console.log(savedUser)
        
        
            //creatorImage: msg.profilePicture
        // Lists.update({creatorID: msg.data.profileDetails.username},{
        //     $set:
        //      {creatorName: fullname}}, function(err, result){
        //     if (err) {
        //         console.log(err);
        //         console.log("unable to read the database");
        //         callback(err, "Database Error");
        //     } else {
        //         console.log(" updated in links");
        //        // callback(null, { status: 200, rows });
        //     }
        
        // })
    
    
    } 
    
    
    catch (ex) {
        console.log(ex);
        await con.query("ROLLBACK");
        console.log(ex);
        //callback(null, { status: 500 });
        throw ex;
    } finally {
        await con.release();
        await con.destroy();
    }

}


async function getLikes(msg, callback) {

    console.log("In user getLikes topic service. Msg: ", msg);

    Tweets.find({ 'likes': { username: "anjali" } }, function (err, rows) {
        console.log(rows)
        if (err) {
            console.log(err);
            console.log("unable to read the database");
            callback(err, "Database Error");
        } else {
            console.log(" got likes");
            callback(null, { status: 200, rows });
        }
    });

}

async function getTweets(msg, callback) {

    console.log("In user getTweets topic service. Msg: ", msg);

    Tweets.find({ username: msg.data }, async function (err, rows) {
        console.log(rows)
        if (err) {
            console.log(err);
            console.log("unable to read the database");
            callback(err, "Database Error");
        } else {
            console.log(" got user ");
            callback(null, { status: 200, rows });
        }
    });

}


async function getFollow(msg, callback) {

    console.log("In user getFollow topic service. Msg: ", msg);

    Users.findOne({username: {$in: msg.data}}, 
        async function(err, rows) {
            console.log(rows)
            if (err) {
                console.log(err);
                console.log("unable to read the database");
                callback(err, "Database Error");
            } else {

                console.log(" got follows ");
                callback(null, { status: 200, rows });
            }
        }
    )
}

