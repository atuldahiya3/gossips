import mongoose from "mongoose";

const connectDB = (uri) => {
  mongoose
    .connect(uri, { dbName: "gossips" })
    .then((data) => {console.log(`connected to database: ${data.connection.host}`)})
    .catch((err) => {
      throw err;
    });
};

export {connectDB}