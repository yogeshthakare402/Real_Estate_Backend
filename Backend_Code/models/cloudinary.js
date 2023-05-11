const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config();

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// })
cloudinary.config({
    cloud_name: "dcip3zcp4",
    api_key: "761659471794486",
    api_secret: "j_ETkpzIDJs0_Y6uCFtL8Utf2Qw"
});
// CLOUDINARY_URL="cloudinary://761659471794486:j_ETkpzIDJs0_Y6uCFtL8Utf2Qw@dcip3zcp4"
exports.uploads = async (file) => {
    console.log("Creating url");
    const res = await cloudinary.uploader.upload(file);
    return res;
}