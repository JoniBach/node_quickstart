const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

var bodyParser = require('body-parser');


const profileRoutes=require('./routes/profile')

const userRoutes=require('./routes/user')


app.use(cors());

const urlencodedParser = bodyParser.urlencoded({ extended: false})
app.use(bodyParser.json(), urlencodedParser)


require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5001;

app.use('/',profileRoutes)
app.use('/',userRoutes)

mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("db Connected"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

