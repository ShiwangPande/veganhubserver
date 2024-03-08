const mongoose = require('mongoose');

async function connectDB() {
   try {
      const connection = await mongoose.connect(process.env.MONGO_URI);
      console.log("Connected to MongoDB");
      console.log("Connection:", connection); // Log the connection object
      // Continue with your code that uses the connection object...
   } catch (error) {
      console.error("Error connecting to MongoDB:", error);
   }
}

connectDB();