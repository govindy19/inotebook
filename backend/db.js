const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://govindyadavy1998:3EgjN43J0myMPSx8@cluster0.ibarkve.mongodb.net/inotebook";
const connectToMongo = () => {
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
  //   console.log("Connected to MongoDB);");
};

module.exports = connectToMongo;
