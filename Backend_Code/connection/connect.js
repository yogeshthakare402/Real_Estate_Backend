// const mongoose = require("mongoose");

// mongoose.connect('mongodb://localhost:27017/restapi')
// .then(console.log("login Successful"))
// .catch(console.error);

const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

// mongoose.connect(process.env.DB_URL, {})
// .then(() => {
//   console.log("CONNECTED TO DATABASE");
// })


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
