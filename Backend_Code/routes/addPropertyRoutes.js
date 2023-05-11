let express = require('express');
let multer = require('multer');
let mongoose = require('mongoose');
let router = express.Router();
let User = require("../models/user");
let Property = require('../models/property');
let cloudinary = require('../models/cloudinary');
let fs = require('fs');

//temporary storage until it creates cloudinary url
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


router.post("/", upload.array('imgfiles', 5), async (req, res) => {
    try {
        console.log("Post Data");
        // console.log(req.body);
        // console.log(req.files);
        // console.log("user in add " + req.user)
        const ppd_id = "PPD" + Math.floor((Math.random() * 9999) + 999);
        const views = parseInt(Math.random() * 30);
        const daysLeft = parseInt(Math.random() * 50);
        let state = ""
        if (daysLeft === 0) {
            state = "Sold"
        } else {
            state = "Unsold"
        };

        const imgfiles = req.files;
        const getImgUrls = async (imgfiles) => {
            const imgurls = []
            // console.log(imgfiles);
            // console.log("loop started");
            for (const file of imgfiles) {
                const { path } = file;
                let newpath = await cloudinary.uploads(path);
                // console.log(newpath.url);
                imgurls.push(newpath.url);
                console.log(imgurls);
                fs.unlinkSync(path)
            }

            // console.log("loop end");
            // console.log(imgurls);

            const property = await Property.create({
                ppdId: ppd_id,
                image: imgurls,
                views: views,
                status: state,
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
                userid: req.user
            })

            res.status(200).json({
                status: "Success",
                property
            })
        }

        getImgUrls(imgfiles);

    } catch (e) {
        res.status(500).json({
            status: "failed",
            message: e.message
        })
    }
});
router.patch('/sale/:id', async (req, res) => {
    try {
        console.log("updating sales status")
        console.log(req.body)
        let property = await Property.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body });
        if (property) {
            res.status(200).json({
                status: "Success",
                detail: "Property Updated"
            })
        } else {
            res.status(401).json({
                status: "Failed",
                detail: "Property Can't Update"
            })
        }

    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
})

router.patch('/:id', async (req, res) => {
    try {
        console.log("update Property")
        // console.log(req.body);
        let property = await Property.findOneAndUpdate({ _id: req.params.id }, { $set: req.body });
        if (property) {
            // console.log(property)
            res.status(200).json({
                status: "Success",
                detail: "Property Updated"
            })
        } else {
            res.status(401).json({
                status: "Failed",
                detail: "Property Can't Update"
            })
        }

    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
})

router.delete('/delete/:id', async(req, res) => {
    try {
        console.log("I am inside delete Property with id")
        console.log(req.params)
        const property = await Property.findByIdAndDelete({_id: req.params.id});
        if(property){
            // console.log(property);
            res.json({
                status: "Success",
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