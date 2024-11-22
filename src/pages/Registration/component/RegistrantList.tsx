import { useEffect, useState } from "react";
import { IRegistration } from "../utility/models/registration.model";
import {
  useDeleteRegistrationListMutation,
  useGetRegistrationListDataQuery,
} from "../utility/service/registration.service";
import { useNavigate } from "react-router-dom";

const RegistrantList = () => {
  const navigate = useNavigate();
  const { data: RegistrationData } = useGetRegistrationListDataQuery();
  const [deleteRegistration] = useDeleteRegistrationListMutation();
  const [registrationListData, setBatchListData] = useState<IRegistration[]>(
    []
  );

  useEffect(() => {
    if (RegistrationData) {
      setBatchListData(RegistrationData);
    }
  }, [RegistrationData]);

  const handleDelete = (id: string) => {
    // Remove the registrant at the given index
    deleteRegistration(id);
  };

  const handleEdit = (id: string) => {
    // Set the editing state to the current row
    navigate("/register/edit/" + id);
  };
  return (
    <div className="table-container">
      <h2>Registrant List</h2>
      <button className="btn-primary" onClick={() => navigate("/register")}>
        Add New Registrant
      </button>
      {registrationListData.length > 0 ? (
        <table className="registrant-table">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Attendance</th>
              <th>Adults</th>
              <th>Kids</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {registrationListData.map((registrant, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{registrant.firstName}</td>
                <td>{registrant.lastName}</td>
                <td>{registrant.email}</td>
                <td>{registrant.phone}</td>
                <td>{registrant.attendance}</td>
                <td>{registrant.adults}</td>
                <td>{registrant.numberOfKids}</td>
                <td>{registrant.message ? registrant.message : "N/A"}</td>
                <td>
                  <div className="d-flex gap-3 align-items-center">
                    <button
                      className="btn-primary"
                      onClick={() => handleEdit(registrant.id!)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(registrant.id!)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No registrants yet.</p>
      )}
    </div>
  );
};

export default RegistrantList;
