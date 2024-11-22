import * as Yup from "yup";

export const ValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .max(15, "Must be 15 characters or less")
    .required("Required"), // First name must be filled
  lastName: Yup.string()
    .trim()
    .max(20, "Must be 20 characters or less")
    .required("Required"), // Last name must be filled
  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Required"), // Email must be a valid email
  phone: Yup.string()
    .trim()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Required"), // Phone number must be 10 digits
  numberOfKids: Yup.number()
    .min(0)
    .max(5)
    .required("Please select number of kids"),
  kidsAges: Yup.array().of(
    Yup.number().min(0).max(17).required("Age is required")
  ),
});
