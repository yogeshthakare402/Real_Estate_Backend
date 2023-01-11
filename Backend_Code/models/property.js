
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addPropertySchema = new Schema({
   ppdId: { type: String },
   image: { type: Array },
   views: { type: Number },
   status: { type: String, default: "Unsold" },
   daysLeft: { type: Number },
   property: { type: String , required: true},
   length: {type: Number, required: true},
   breadth: {type: Number, required: true},
   area: {type: Number},
   mobile: {type: Number, required: true},
   negotiable: {type: String},
   price: {type: Number},
   ownership: {type: String},
   propertyAge: {type: String},
   propApproved: {type: String},
   propDescription: {type: String},
   bankLoan: {type: String},
   areaUnit: {type: String},
   bhk: {type: String},
   floorNum: {type: Number},
   attached: {type: String},
   westToilet: {type: String},
   furnished: {type: String},
   parking: {type: String},
   lift: {type: String},
   electricity: {type: String},
   facing: {type: String},
   name: {type: String},
   postedBy: {type: String},
   saleType: {type: String},
   package: {type: String},
   ppdPackage: {type: String},
   email: {type: String, required: true},
   city: {type: String},
   addArea: {type: String},
   pincode: {type: String},
   address: {type: String},
   landmark: {type: String},
   latitude: {type: String},
   longitude: {type: String},
   userid:{type:String},
   user : {type :mongoose.Schema.Types.ObjectId, ref: "Users"}
})

const addPropertyModel = mongoose.model("Property", addPropertySchema);
module.exports = addPropertyModel;