import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
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
  message: {
    type: String,
    required: [true, "Please provide your message"],
    minLength: [10, "Message must be at least 10 characters"],
  },
});

export const Message = mongoose.model("Message", messageSchema);
