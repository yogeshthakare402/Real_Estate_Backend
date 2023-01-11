let express = require('express');
let multer = require('multer');
let mongoose = require('mongoose');
let router = express.Router();
let User = require("../models/user");
let Property = require('../models/property');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
    },
});

const upload = multer({
    storage: multerStorage,
});

router.post("/", upload.array('items', 5), async (req, res) => {
    try {
        console.log(req.body)
        console.log(req.files)
        console.log("user in add " + req.user)
        // console.log("this is req.body" + req.body + "Checkthis")
        const ppd_id = "PPD" + Math.floor((Math.random() * 9999) + 999);
        const views = parseInt(Math.random() * 30);
        const daysLeft = parseInt(Math.random() * 50);

        const property = await Property.create({
                ppdId: ppd_id,
                image: req.files,
                views: views,
                status: "Unsold",
                daysLeft: daysLeft,
                property: req.body.property,
                length: req.body.length,
                breadth: req.body.breadth,
                area: parseInt(req.body.length) * parseInt(req.body.breadth),
                mobile: req.body.mobile,
                negotiable: req.body.negotiable,
                price: req.body.price,
                ownership: req.body.ownership,
                propertyAge: req.body.propertyAge,
                propApproved: req.body.propApproved,
                propDescription: req.body.propDescription,
                bankLoan: req.body.bankLoan,
                areaUnit: req.body.areaUnit,
                bhk: req.body.bhk,
                floorNum: req.body.floorNum,
                attached: req.body.attached,
                westToilet: req.body.westToilet,
                furnished: req.body.furnished,
                parking: req.body.parking,
                lift: req.body.lift,
                electricity: req.body.electricity,
                facing: req.body.facing,
                name: req.body.name,
                postedBy: req.body.postedBy,
                saleType: req.body.saleType,
                package: req.body.package,
                ppdPackage: req.body.ppdPackage,
                email: req.body.email,
                city: req.body.city,
                addArea: req.body.addArea,
                pincode: req.body.pincode,
                address: req.body.address,
                landmark: req.body.landmark,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                userid:req.user
           })

           res.status(200).json({
                status: "Success",
                property
            })

    } catch (e) {
        res.status(500).json({
            status: "failed",
            message: e.message
        })
    }
});

module.exports = router;