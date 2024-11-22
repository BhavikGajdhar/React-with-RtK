import { ErrorMessage, Field, Form, Formik } from "formik";
import { ValidationSchema } from "../utility/validation/registrationValidation";
import { IRegistration } from "../utility/models/registration.model";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAddRegistrationListMutation,
  useGetRegistrationListByIdQuery,
  useUpdateRegistrationListMutation,
} from "../utility/service/registration.service";
import { useEffect, useState } from "react";
import { initialFormValues } from "../utility/constants/registration.constant";

const RegistrationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [updateRegistrationData] = useUpdateRegistrationListMutation();
  const [addRegistrationData] = useAddRegistrationListMutation();
  const { data: formData } = useGetRegistrationListByIdQuery(id!, {
    skip: !id,
  });

  const [initialValues, setInitialValues] = useState(initialFormValues);
  const [kidsCount, setKidsCount] = useState(0);

  useEffect(() => {
    if (formData) {
      setInitialValues(formData);
      setKidsCount(formData.numberOfKids || 0);
    }
  }, [formData]);

  const navigateBack = () => {
    navigate("/registrants");
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleKidsChange = (numOfKids: number, setFieldValue: any) => {
    const currentKidsAges = [...initialValues.kidsAges];
    let updatedKidsAges;

    if (numOfKids > currentKidsAges.length) {
      updatedKidsAges = [
        ...currentKidsAges,
        ...Array(numOfKids - currentKidsAges.length).fill(""),
      ];
    } else {
      updatedKidsAges = currentKidsAges.slice(0, numOfKids);
    }

    setFieldValue("numberOfKids", numOfKids);
    setFieldValue("kidsAges", updatedKidsAges);
    setKidsCount(numOfKids);
  };

  const handleSubmit = async (values: IRegistration) => {
    if (id) {
      updateRegistrationData({ id, ...values });
      navigate("/registrants");
    } else {
      addRegistrationData(values);
      navigate("/registrants");
    }
  };

  return (
    <div className="p-3">
      <div className="form-container">
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={ValidationSchema}
          onSubmit={(values: IRegistration) => {
            handleSubmit(values);
          }}
        >
          {(formik) => {
            const { setFieldValue, values } = formik;
            return (
              <Form className="form-card">
                <div className="form-group">
                  <label htmlFor="profileImage">Profile Image:</label>
                  <div className="text-start">
                    {initialValues.profileImage && (
                      <img
                        src={initialValues.profileImage}
                        alt="Profile Preview"
                        className="profile-preview"
                      />
                    )}
                  </div>
                  <div className="text-start">
                    <input
                      id="profileImage"
                      name="profileImage"
                      type="file"
                      onChange={async (event) => {
                        if (event.currentTarget.files) {
                          const file = event.currentTarget.files[0];
                          const base64 = await convertToBase64(file);
                          setFieldValue("profileImage", base64);
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="firstName">First Name:</label>
                  <Field
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="form-input"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name:</label>
                  <Field
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="form-input"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number:</label>
                  <Field
                    type="text"
                    id="phone"
                    name="phone"
                    className="form-input"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="form-group">
                  <label>Will you be attending the event?</label>
                  <div className="form-radio-group">
                    <label>
                      <Field type="radio" name="attendance" value="Yes" />
                      Yes
                    </label>
                    <label>
                      <Field type="radio" name="attendance" value="Maybe" />
                      Maybe
                    </label>
                    <label>
                      <Field type="radio" name="attendance" value="No" />
                      No
                    </label>
                  </div>
                  <ErrorMessage
                    name="attendance"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="adults">Adults attending:</label>
                  <Field as="select" name="adults" className="form-select">
                    {[...Array(6).keys()].map((val) => (
                      <option key={val} value={val}>
                        {val}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="adults"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="numberOfKids">How many kids?</label>
                  <Field
                    as="select"
                    id="numberOfKids"
                    name="numberOfKids"
                    className="form-select"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      const numOfKids = parseInt(e.target.value);
                      handleKidsChange(numOfKids, setFieldValue);
                    }}
                    value={values.numberOfKids}
                  >
                    {[...Array(6).keys()].map((val) => (
                      <option key={val} value={val}>
                        {val}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="numberOfKids"
                    component="div"
                    className="error"
                  />
                </div>

                {Array.from({ length: kidsCount }, (_, index) => (
                  <div key={index} className="form-group">
                    <label htmlFor={`kidsAges.${index}`}>
                      Age of Kid {index + 1}:
                    </label>
                    <Field
                      as="select"
                      name={`kidsAges.${index}`}
                      id={`kidsAges.${index}`}
                      className="form-select"
                      value={values.kidsAges[index] || ""}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        const age = parseInt(e.target.value);
                        const newKidsAges = [...values.kidsAges];
                        newKidsAges[index] = age;
                        setFieldValue("kidsAges", newKidsAges);
                      }}
                    >
                      <option value="">Select Age</option>
                      {Array.from({ length: 18 }, (_, i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name={`kidsAges.${index}`}
                      component="div"
                      className="error"
                    />
                  </div>
                ))}

                <div className="form-group">
                  <label htmlFor="message">
                    Send a message to the host (Optional):
                  </label>
                  <Field
                    as="textarea"
                    id="message"
                    name="message"
                    className="form-textarea"
                  />
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    onClick={navigateBack}
                    className="btn-cancel"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-submit">
                    Submit
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default RegistrationForm;
