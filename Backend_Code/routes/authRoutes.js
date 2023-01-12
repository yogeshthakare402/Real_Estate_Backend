const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
// const secret = "RESTAPI";
const bodyParser = require("body-parser");
let User = require("../models/user");

router.post("/signup", async (req, res) => {
    try {
        // console.log(User)
        console.log(req.body);
        const existingUser = await User.findOne({ email: req.body.email });
        console.log(existingUser);
        if (!existingUser) {
            //to get last user for userid
            // let value = 1200;
            const value = await User.find().sort({ _id: -1 }).limit(1);
            const userid = parseInt(value[0].userid.split("D")[1]) + 1;
            //   console.log(value[0].userid.split("D")[1]);

            //hashing the password
            bcrypt.hash(req.body.password, 10, async function (err, hash) {
                // console.log(hash)
                if (err) {
                    return res.status(400).json({
                        status: "Failed",
                        message: err.message
                    });
                }

                const user = await User.create({
                    username: req.body.username,
                    userid: "06PPD" + userid,
                    // userid: "06PPD" + value,
                    email: req.body.email,
                    password: hash,
                })
                console.log(user)
                return res.json({
                    status: "success",
                    message: "Registration succesful",
                    user
                })

            });

        } else {
            res.status(401).json("Email id already exist");
        }
    } catch (e) {
        res.status(500).json({
            status: "Failed",
            message: e.message,
        });
    }
});


router.get("/", (req, res) => {
    res.send("Working");
});


router.post("/login", async (req, res) => {
    try {
        // console.log(req.body);
        // console.log(req.body);
        const existingUser = await User.findOne({ email: req.body.email })
        console.log(existingUser)
        if (!existingUser) {
            res.status(400).json("Invalid Email id");
        } else {
            bcrypt.compare(req.body.password, existingUser.password, function (err, result) {
                
                if (err) {
                    return res.status(500).json({
                        status: "Failed",
                        message: err.message
                    });
                }
                // result == true
                if (result) {
                    // token will be used to track the user for further operation
                    const token = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                        data: existingUser._id
                      }, existingUser.userid);

                      console.log(token)
                    res.status(200).json({
                        status: "Sucess",
                        message: "Login successful ",
                        //to show userid and email in listing page
                        details: {
                            userid: existingUser.userid,
                            email: existingUser.email.split("@")[0],
                        },
                        token : token
                    });
                } else {
                    res.status(401).json({
                        status: "Falied",
                        message: "Invalid credentials !! Please provide correct email/password"
                    });
                }
            });                
            
        }
    } catch (e) {
        res.status(500).json({
            status: "Failed",
            message: e.message,
        });
    }
});

router.get("/logout", async (req, res) => {
    res.clearCookie("jwt");
    console.log("Logout successfully");
    res.redirect("/");
});


// router.get("/protected", authVerify, (req, res) => {
//   res.send("I am protected route");
// });



module.exports = router;
