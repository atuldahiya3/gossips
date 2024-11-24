import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";
import { v2 as coludinary } from "cloudinary";
import { getBase64 } from "../lib/helper.js";
const connectDB = (uri) => {
  mongoose
    .connect(uri, { dbName: "gossips" })
    .then((data) => {
      console.log(`connected to database: ${data.connection.host}`);
    })
    .catch((err) => {
      throw err;
    });
};

const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: "none",
  secure: true,
  httpOnly: true,
};
const sendToken = (res, user, code, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  return res.status(code).cookie("gossips-token", token, cookieOptions).json({
    success: true,
    token,
    message,
    user,
  });
};

const emitEvent = (req, event, users, data) => {
  console.log("event emitted");
};

const uploadFilesToCloudinary = async (files = []) => {
  const uploadPromise = files.map((file) => {
    return new Promise((resolve, reject) => {
      coludinary.uploader.upload(
        getBase64(file),
        {
          public_id: v4(),
          resource_type: "auto",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  });
  try {
    const results = await Promise.all(uploadPromise);
    const formattedResults = results.map((result) => ({
      public_id: result.public_id,
      url: result.secure_url,
    }));
    return formattedResults;
  } catch (err) {
    throw new Error("Error uploading files to cloudinary", err);
  }
};
const deleteFilesFromCloudinary = async (public_ids) => {};

export {
  connectDB,
  sendToken,
  cookieOptions,
  emitEvent,
  deleteFilesFromCloudinary,
  uploadFilesToCloudinary,
};
