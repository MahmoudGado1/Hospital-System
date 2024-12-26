import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "MERN_STACK_HOSPITAL_SYSTEM",
    })
    .then(() => {
      console.log("Connected to databse!");
    })
    .catch((err) => {
      console.log(`some error occured while connecting to datbase: ${err}`);
    });
};
