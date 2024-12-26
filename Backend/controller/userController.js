import ErrorHandler from "../middlewares/errorMiddlewares.js";
import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js";
import {User} from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, phone, email, password,gender,nic,dob,role } = req.body;
  if (!firstName || !lastName || !email || !password || !phone || !gender || !nic || !dob || !role) {
    return next(new ErrorHandler("Please fill all the fields!", 400));
  }
  let user = await User.findOne({ email });
  if (user) {
    return next( 
      new ErrorHandler("User already Registered!", 400)
    );
  }
  user = await User.create({
    firstName, 
    lastName,
    email,
    password,
    phone, 
    gender,
    nic, 
    dob,
    role
  });
  generateToken(user,"User registered successfully", 200, res);
  })

  export const Login = catchAsyncErrors(async (req, res, next) => {
    const { email, password ,confirmPassword,role} = req.body;
    if (!email || !password || !confirmPassword || !role) {
      return next(new ErrorHandler("Please fill all the fields!", 400));
    }
    if (password !== confirmPassword) {
      return next(new ErrorHandler("Passwords and confirm passwords do not match!", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) { 
      return next(new ErrorHandler("Invalid email or password", 401));
    }
    if (user.role !== role) {
      return next(new ErrorHandler("User with this role not found", 401));
    }
    generateToken(user,`${role} login successfully`, 200, res);
  });

  export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, phone, email, password,gender,nic,dob } = req.body;

    if (!firstName || !lastName || !email || !password || !phone || !gender || !nic || !dob) {
      return next(new ErrorHandler("Please fill all the fields!", 400));
    }
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
      return next(
        new ErrorHandler(`${isRegistered.role} with this email is already exists`, 400)
      );
    }
    const admin = await User.create({
      firstName,
      lastName,
      email,
      password,
      phone,
      gender,
      nic,
      dob,
      role:"Admin"
    });
    generateToken(admin,"New Admin Registered!", 200, res);
  })

  export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
    const doctors = await User.find({ role: "Doctor" });
    res.status(200).json({
      success: true,
      doctors,
    });
  });

  export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
      success: true,
      user,
    });
  });


  export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
    res.cookie("adminToken", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "Admin Log Out",
    });
  })

  export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
    res.cookie("patientToken", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "Patient Log Out",
    });
  })

  export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
    if(!req.files || Object.keys(req.files).length === 0) {
      return next(new ErrorHandler("Doctor Image is required", 400));
    }
    const {docAvatar} = req.files; 
    const allowedFormats = ["image/png", "image/jpeg", "image/webp", "image/jpg"];
    if (!allowedFormats.includes(docAvatar.mimetype)) {
      return next(new ErrorHandler("Only png, jpeg, and webp images are allowed", 400));
    }
    const { firstName, lastName, phone, email, password,gender,nic,dob,doctorDepartment } = req.body;
    if (!firstName || !lastName || !email || !password || !phone || !gender || !nic || !dob || !doctorDepartment) {
      return next(new ErrorHandler("Please fill all the fields!", 400));
    }
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
      return next(
        new ErrorHandler(`${isRegistered.role} with this email is already exists`, 400)
      );
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath);
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error("Error uploading image : ", cloudinaryResponse.error|| "Unknown cloudinary error");
    }
    const doctor = await User.create({
      firstName,
      lastName,
      email,
      password,
      phone,
      gender,
      nic,
      dob,
      role:"Doctor", 
      doctorDepartment,
      docAvatar: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });
    res.status(200).json({
      success: true,
      message: "New Doctor Registered!",
      doctor,
    });
  })