
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
   negotiable: {type: String, default:"NA"},
   price: {type: Number},
   ownership: {type: String , default:"NA"},
   propertyAge: {type: String , default:"NA"},
   propApproved: {type: String , default:"NA"},
   propDescription: {type: String , default:"NA"},
   bankLoan: {type: String, default:"NA"},
   areaUnit: {type: String, default:"NA"},
   bhk: {type: String, default:"NA"},
   floorNum: {type: Number, default:"NA"},
   attached: {type: String, default:"NA"},
   westToilet: {type: String, default:"NA"},
   furnished: {type: String, default:"NA"},
   parking: {type: String, default:"NA"},
   lift: {type: String, default:"NA"},
   electricity: {type: String, default:"NA"},
   facing: {type: String, default:"NA"},
   name: {type: String, default:"NA"},
   postedBy: {type: String, default:"NA"},
   saleType: {type: String, default:"NA"},
   package: {type: String, default:"NA"},
   ppdPackage: {type: String},
   email: {type: String, required: true},
   city: {type: String, default:"NA"},
   addArea: {type: String, default:"NA"},
   pincode: {type: String, default:"NA"},
   address: {type: String, default:"NA"},
   landmark: {type: String, default:"NA"},
   latitude: {type: String, default:"NA"},
   longitude: {type: String, default:"NA"},
   userid:{type:String, default:"NA"},
   user : {type :mongoose.Schema.Types.ObjectId, ref: "Users"}
})

const addPropertyModel = mongoose.model("Property", addPropertySchema);
module.exports = addPropertyModel;