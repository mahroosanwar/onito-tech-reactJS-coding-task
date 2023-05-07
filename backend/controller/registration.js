const Registration = require("../model/registration");

exports.postRegistration = async (req, res, next) => {
  const {
    name,
    age,
    sex,
    mobileNumber,
    idType,
    govtId,
    labelType,
    guardianName,
    email,
    emergencyContactNum,
    address,
    selectState,
    city,
    country,
    pincode,
    occupation,
    selectReligion,
    bloodGroup,
    maritalStatus,
    nationality,
  } = req.body;

  const registration = new Registration({
    personalDetail: { name, age, sex, mobileNumber, idType, govtId },
    contactDetail: { labelType, guardianName, email, emergencyContactNum },
    addressDetail: { address, selectState, city, country, pincode },
    otherDetail: {
      occupation,
      selectReligion,
      bloodGroup,
      maritalStatus,
      nationality,
    },
  });

  await registration.save();

  res.status(200).send({ message: "registration successful" });
};

exports.getUsersData = async (req, res, next) => {
  try {
    const usersData = await Registration.find();
    // res.status(200).json(usersData);
    res.status(200).send({ status: "OK", usersData: usersData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving user data" });
  }
};
