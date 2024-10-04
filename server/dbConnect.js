const mongoose = require("mongoose");

module.exports = async () => {
  const mongoURI =
    "mongodb+srv://aakashbanjara4469:j1k2t367@cluster0.e9qawjz.mongodb.net/social-media?retryWrites=true&w=majority&appName=Cluster0/";

  try {
    await mongoose.connect(mongoURI);
    console.log(`MongoDb connected`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
