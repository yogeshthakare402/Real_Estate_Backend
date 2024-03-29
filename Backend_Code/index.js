const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload')
// const connect = require("./connection/connect");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
var cors = require("cors");
const propertyListRoutes = require("./routes/propertyListRoutes");
const addPropertyRoutes = require("./routes/addPropertyRoutes");
var jwt = require('jsonwebtoken');
const User = require('./models/user');

//not working if in connection page
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
mongoose.connect(
    "mongodb+srv://yogeshthakare402:Yogesh402@Real_Estate_app.nkhpbif.mongodb.net/Real_Estate_app?retryWrites=true&w=majority",
{ useNewUrlParser: true, useUnifiedTopology: true },
() => {
  console.log("successfully connected to db");
},
(err) => {
  console.log(err);
}
);


// const fileUpload = require("express-fileupload");

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use('/public', express.static('public'))


// use fileupload
// app.use(fileUpload({
//     useTempFiles:true
// }))

app.use("/api/users/property", (req, res, next) => {
    try {
        console.log("Authenticate user");
        // console.log(req.headers.token)
        if (req.headers.token) {
            const token = req.headers.token;
            // console.log(token)
            if (token) {
                // console.log("got the token")
                let secret = req.headers.id
                // console.log(secret)
                jwt.verify(token, secret, async function (err, decoded) {
                    if (err) {
                        return res.status(403).json({
                            status: "failed",
                            message: "Invalid token"
                        })
                    }
                    // console.log(decoded)
                    const user = await User.findOne({ _id: decoded.data });
                    // console.log(user)
                    req.user = user.email;
                    // req.user = decoded.data;
                    console.log("Token Verified You can access routes")
                    next();
                });
            } else {
                return res.status(403).json({
                    status: "failed",
                    message: "Invalid token"
                })
            }
        } else {
            return res.status(403).json({
                status: "Failed",
                message: "Not authenticated user"
            });
        }

    } catch (e) {
        res.status(400).json({
            status: "Failed",
            message: e.message,
        });
    }

})


app.use("/api/users", authRoutes);
app.use("/api/users/property", addPropertyRoutes);
app.use("/api/users/property", propertyListRoutes);


app.listen(process.env.PORT || 8000, () => console.log('Server is running at 8000'))
