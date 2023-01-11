// const mongoose = require("mongoose");

// mongoose.connect('mongodb://localhost:27017/restapi')
// .then(console.log("login Successful"))
// .catch(console.error);

const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
mongoose.set('strictQuery', true)
mongoose.connect(process.env.DB_URL, {})
.then(() => {
  console.log("CONNECTED TO DATABASE");
})

// mongoose.connect(
//   "mongodb+srv://lalatendu_14:Liku2324@cluster0.cb2danw.mongodb.net/realestateproject?retryWrites=true&w=majority",
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   () => {
//     console.log("successfully connected to db");
//   },
//   (err) => {
//     console.log(err);
//   }
// );
