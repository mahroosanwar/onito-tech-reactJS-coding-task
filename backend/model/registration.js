const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const personalDetailSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  sex: { type: String, required: true },
  mobileNumber: { type: String },
  idType: { type: String },
  govtId: { type: String },
});

const contactDetailSchema = new mongoose.Schema({
  labelType: { type: String },
  guardianName: { type: String },
  email: { type: String },
  emergencyContactNum: { type: String },
});

const addressDetailSchema = new mongoose.Schema({
  address: { type: String },
  selectState: { type: String },
  city: { type: String },
  country: { type: String },
  pincode: { type: String },
});

const otherDetailSchema = new mongoose.Schema({
  occupation: { type: String },
  selectReligion: { type: String },
  bloodGroup: { type: String },
  maritalStatus: { type: String },
  nationality: { type: String },
});

const registrationSchema = new Schema({
  personalDetail: personalDetailSchema,
  contactDetail: contactDetailSchema,
  addressDetail: addressDetailSchema,
  otherDetail: otherDetailSchema,
});

module.exports = mongoose.model("Registration", registrationSchema);
