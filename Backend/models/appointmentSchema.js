import mongoose from "mongoose";
import validator from "validator";
const appointmentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide your first name"],
    minLength: [3, "First name must be at least 3 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide your last name"],
    minLength: [3, "Last name must be at least 3 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    validate: [validator.isEmail, "Please provide a valid email!"],
  },
  phone: {
    type: String,
    required: [true, "Please provide your phone number"],
    minLength: [11, "Phone number must be at least 11 digits"],
    maxLength: [11, "Phone number must be at most 11 digits"],
  },
  gender: {
    type: String, 
    required: [true, "Please provide your gender"],
    enum: ["Male", "Female"],
  },
  nic: {
    type: String,
    required: [true, "Please provide your NIC number"],
    minLength: [13, "NIC number must be at least 13 digits"],
    maxLength: [13, "NIC number must be at most 13 digits"],
  },
  dob: {
    type: String,
    required: [true, "Please provide your date of birth"],
  },
  appointment_date: {
    type: String,
    required: [true, "Please provide your date"],
  },
  department: {
    type: String,
    required: [true, "Please provide your department"],
  },
  doctor: {
    firstName: {
      type: String,
      required: [true, "Please provide your first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide your last name"],
    }
  },
  hasVisited: {
    type: Boolean,
    default: false,
  },
  doctorId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Please provide your doctor id"],
  },
  patientId : {
    type: mongoose.Schema.ObjectId,
    required: [true, "Please provide your patient id"],
  },
  address: {
    type: String,
    required: [true, "Please provide your address"],
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
});
  
export const Appointment = mongoose.model("Appointment", appointmentSchema);