const express = require("express");
const bodyParser = require("body-parser");
const Property = require('../models/property');
const User = require('../models/user');
// const cloudinary = require('cloudinary').v2;
const router = express.Router();

router.use(bodyParser.json());

router.get('/', async(req, res) => {
    try {
        console.log("I am inside get property");
        //here we are rendering the image giveing it in ressponse
        console.log("User " + req.user)
        const property = await Property.find({userid:req.user})

        res.json({
            status: "Sucess",
            property
        })
    } catch (e) {
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
});

router.get('/:ppdId', async(req, res) => {
    try {
        console.log("I am inside get Property with PPDID")
        console.log(req.params)
        const property = await Property.findOne({ppdId: req.params.ppdId});
        if(property){
            res.json({
                status: "Sucess",
                property
            })
        }else {
            res.json({
                status: "Failed",
                message : "Property Not Found"
            })
        }
    } catch (e) {
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
})


module.exports = router;