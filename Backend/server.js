import app from "./app.js";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOODINARY_CLOUD_NAME,
  api_key: process.env.CLOODINARY_API_KEY,
  api_secret: process.env.CLOODINARY_API_SECRET
})
app.listen(process.env.PORT,()=>{
  console.log(`Server listening on port ${process.env.PORT}`)
})
