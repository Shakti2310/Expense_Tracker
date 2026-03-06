import "dotenv/config";
import connectDB from "./config/mongoDB.config.js";
import "./config/cloudinary.config.js";
import app from "./app.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Your server is started on PORT ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log("MongoDB connection failed: ", error));
