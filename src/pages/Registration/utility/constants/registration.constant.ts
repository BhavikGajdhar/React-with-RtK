import { IRegistration } from "../models/registration.model";

const initialFormValues: IRegistration = {
  profileImage: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  attendance: "",
  adults: 0,
  numberOfKids: 0,
  message: "",
  kidsAges:[],
};

export { initialFormValues };
