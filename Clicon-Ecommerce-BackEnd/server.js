import express from "express";
import "dotenv/config";
import connectDB from "./database/db.js";
import userRoute from "./routes/userRoute.js";
import homeCategoryRoute from "./routes/homeCategoryRoute.js";
import homeBannerRoute from "./routes/homeBannerRoute.js";
import servicesRoute from "./routes/servicesRoute.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/clicon-ecommerce", userRoute);
app.use("/clicon-ecommerce", homeCategoryRoute);
app.use("/clicon-ecommerce", homeBannerRoute);
app.use("/clicon-ecommerce", servicesRoute);

// http://localhost:8000/clicon-ecommerce/register

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is listening at port ${PORT}`);
});
