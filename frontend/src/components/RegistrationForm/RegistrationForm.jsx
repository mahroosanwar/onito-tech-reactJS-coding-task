import { React, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import styles from "./RegistrationForm.module.css";

const mobileRegExp = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6-9]\d{9}$/;

const pincodeRegExp = /^[1-9]{1}[0-9]{5}$/;

const registrationSchema = yup
  .object()
  .shape({
    name: yup
      .string()
      .matches(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces")
      .required("Please enter name!"),
    age: yup
      .number()
      .typeError("Enter Valid Age!")
      .integer()
      .min(0, "Age cannot be negative")
      .max(150, "Age cannot be more than 150 years old")
      .required("Please enter age!"),
    sex: yup.string().required("Please Select"),
    mobileNumber: yup
      .number()
      .nullable()
      .when({
        is: (exist) => !!exist,
        // is: (val) => val && val.length > 0,
        then: () =>
          yup.string().matches(mobileRegExp, "Mobile number is not valid"),
        otherwise: () => yup.string().notRequired(),
      }),
    idType: yup.string().nullable(),
    govtId: yup
      .string()
      .nullable()
      .when("idType", {
        is: "Aadhar",
        then: () =>
          yup
            .string()
            .matches(/^[2-9]{12}$/, "Must be a valid 12-digit Aadhar Number!"),
      })
      .when("idType", {
        is: "PAN",
        then: () =>
          yup
            .string()
            .matches(
              /[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/,
              "Must be a valid 10-digit PAN Number!"
            ),
      }),
    email: yup.string().nullable().email("Not a valid Email!"),
    emergencyContactNum: yup
      .number()
      .nullable()
      .when({
        is: (exist) => !!exist,
        // is: (val) => val && val.length > 0,
        then: () =>
          yup.string().matches(mobileRegExp, "Mobile number is not valid"),
        otherwise: () => yup.string().notRequired(),
      }),
    pincode: yup
      .string()
      .nullable()
      .when({
        is: (exist) => !!exist,
        then: () => yup.string().matches(pincodeRegExp, "Enter Valid Pincode!"),
      }),
  })
  .required();

const RegistrationForm = (props) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registrationSchema) });

  const onSubmit = (data) => {
    console.log(data);

    fetch("http://localhost:8080/registration/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        age: data.age,
        sex: data.sex,
        mobileNumber: data.mobileNumber,
        idType: data.idType,
        govtId: data.govtId,
        labelType: data.labelType,
        guardianName: data.guardianName,
        email: data.email,
        emergencyContactNum: data.emergencyContactNum,
        address: data.address,
        selectState: data.selectState,
        city: data.city,
        country: data.country,
        pincode: data.pincode,
        occupation: data.occupation,
        selectReligion: data.selectReligion,
        bloodGroup: data.bloodGroup,
        maritalStatus: data.maritalStatus,
        nationality: data.nationality,
      }),
    })
      .then((response) => response.json())
      .then((userData) => {
        console.log("User data:", userData);
      })
      .catch((error) => console.error("Error:", error));

    navigate("/");
  };

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        props.onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles["registration-form"]}
    >
      <div className={styles["form-content"]}>
        <div className={styles["form-header"]}>Registration Form</div>
        <div className={styles["form-section"]}>
          <div className={styles["form-group"]}>
            <h4>Personal Details</h4>
            <div className={styles["form-control"]}>
              <label htmlFor="name">
                Name<span className={styles["red-star"]}>*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                pattern="[^\d]+"
                {...register("name")}
              />
              <p className={styles["errorMsg"]}>{errors.name?.message}</p>
            </div>
            <div className={styles["form-control"]}>
              <label htmlFor="age">
                Date of Birth or Age
                <span className={styles["red-star"]}>*</span>
              </label>
              <input
                type="number"
                name="age"
                placeholder="DD/MM/YYYY or Age in Years"
                {...register("age")}
              />
              <p className={styles["errorMsg"]}>{errors.age?.message}</p>
            </div>
            <div className={styles["form-control"]}>
              <label htmlFor="sex">
                Sex<span className={styles["red-star"]}>*</span>
              </label>
              <select {...register("sex")}>
                <option value="">Enter Sex</option>
                <option>Male</option>
                <option>Female</option>
              </select>
              <p className={styles["errorMsg"]}>{errors.sex?.message}</p>
            </div>
            <div className={styles["form-control"]}>
              <label htmlFor="mobileNumber">Mobile</label>
              <input placeholder="Enter Mobile" {...register("mobileNumber")} />
              <p className={styles["errorMsg"]}>
                {errors.mobileNumber?.message}
              </p>
            </div>
            <div className={styles["form-control"]}>
              <label htmlFor="idType">Govt Issued ID</label>
              <select {...register("idType")}>
                <option value="">ID Type</option>
                <option>Aadhar</option>
                <option>PAN</option>
              </select>
              <input placeholder="Enter Govt ID" {...register("govtId")} />
              <p className={styles["errorMsg"]}>{errors.idType?.message}</p>
              <p className={styles["errorMsg"]}>{errors.govtId?.message}</p>
            </div>
          </div>
          <div className={styles["form-group"]}>
            <h4>Contact Details</h4>
            <div className={styles["form-control"]}>
              <label htmlFor="guardianName">Guardian Details</label>
              <select {...register("labelType")}>
                <option value="">Enter Label</option>
                <option>Mr.</option>
                <option>Mrs.</option>
                <option>Miss.</option>
                <option>Ms.</option>
              </select>
              <input
                type="text"
                placeholder="Enter Guardian Name"
                {...register("guardianName")}
              />
            </div>
            <div className={styles["form-control"]}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                {...register("email")}
              />
              <p className={styles["errorMsg"]}>{errors.email?.message}</p>
            </div>
            <div className={styles["form-control"]}>
              <label htmlFor="emergencyContactNum">
                Emergency Contact Number
              </label>
              <input
                placeholder="Enter Emergenct No."
                {...register("emergencyContactNum")}
              />
              <p className={styles["errorMsg"]}>
                {errors.emergencyContactNum?.message}
              </p>
            </div>
          </div>
          <div className={styles["form-group"]}>
            <h4>Address Details</h4>
            <div className={styles["form-control"]}>
              <label htmlFor="address">Address</label>
              <input
                type="text"
                placeholder="Enter Address"
                {...register("address")}
              />
            </div>
            <div className={styles["form-control"]}>
              <label htmlFor="selectState">State</label>
              <select {...register("selectState")}>
                <option value="">Enter State</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Andaman and Nicobar Islands">
                  Andaman and Nicobar Islands
                </option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chandigarh">Chandigarh</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Dadar and Nagar Haveli">
                  Dadar and Nagar Haveli
                </option>
                <option value="Daman and Diu">Daman and Diu</option>
                <option value="Delhi">Delhi</option>
                <option value="Lakshadweep">Lakshadweep</option>
                <option value="Puducherry">Puducherry</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="West Bengal">West Bengal</option>
              </select>
            </div>
            <div className={styles["form-control"]}>
              <label htmlFor="city">City</label>
              <input type="text" {...register("city")} />
            </div>
            <div className={styles["form-control"]}>
              <label htmlFor="country">Country</label>
              <input
                type="text"
                value="India"
                {...register("country")}
                readOnly
              />
            </div>
            <div className={styles["form-control"]}>
              <label htmlFor="pincode">Pincode</label>
              <input
                type="number"
                placeholder="Enter Pincode"
                {...register("pincode")}
              />
              <p className={styles["errorMsg"]}>{errors.pincode?.message}</p>
            </div>
          </div>
          <div className={styles["form-group"]}>
            <h4>Oter Details</h4>
            <div className={styles["form-control"]}>
              <label htmlFor="occupation">Occupation</label>
              <input
                type="text"
                placeholder="Enter Occupation"
                {...register("occupation")}
              />
            </div>
            <div className={styles["form-control"]}>
              <label htmlFor="selectReligion">Religion</label>
              <select {...register("selectReligion")}>
                <option value="">Enter Religion</option>
                <option>Hinduism</option>
                <option>Islam</option>
                <option>Christianity</option>
                <option>Sikhism</option>
                <option>Buddhism</option>
                <option>Jainism</option>
                <option>Other</option>
              </select>
            </div>
            <div className={styles["form-control"]}>
              <label htmlFor="maritalStatus">Marital Status</label>
              <select {...register("maritalStatus")}>
                <option value="">Enter Marital Status</option>
                <option>Yes</option>
                <option>No</option>
                <option>Preferred not to Say</option>
              </select>
            </div>
            <div className={styles["form-control"]}>
              <label htmlFor="bloodGroup">Blood Group</label>
              <select {...register("bloodGroup")}>
                <option value="">Group</option>
                <option>A+</option>
                <option>B+</option>
                <option>AB+</option>
                <option>O+</option>
                <option>A-</option>
                <option>B-</option>
                <option>AB-</option>
                <option>O-</option>
              </select>
            </div>
            <div className={styles["form-control"]}>
              <label htmlFor="nationality">Nationality</label>
              <input
                type="text"
                value="Indian"
                {...register("nationality")}
                readOnly
              />
            </div>
          </div>
        </div>
        <div className={`${styles["form-section"]} ${styles["btn-section"]}`}>
          <button
            className={`${styles["custom-btn"]} ${styles["btn"]} ${styles["btn-1"]}`}
            type="submit"
          >
            <span>Submit</span>
          </button>
          <button
            className={`${styles["custom-btn"]} ${styles["btn"]} ${styles["btn-2"]}`}
            onClick={props.onClose}
            type="button"
          >
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegistrationForm;
