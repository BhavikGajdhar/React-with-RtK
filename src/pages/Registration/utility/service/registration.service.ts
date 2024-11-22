import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../../../shared/service/axiosBaseQuery.service";
import { IRegistration } from "../models/registration.model";

const API_BASE_URL = "http://localhost:3000/"; // Replace with your API base URL

export const registrationApi = createApi({
  reducerPath: "registrationApi",
  baseQuery: axiosBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["registrationList"],
  endpoints: (builder) => ({
    // GET RegistrationList Data
    getRegistrationListData: builder.query<IRegistration[], void>({
      query: () => ({ url: "registration", method: "GET" }),
      providesTags: ["registrationList"],
      transformResponse: (res: any) => {
        return res;
      },
    }),
    // GET RegistrationList Data by id
    getRegistrationListById: builder.query<IRegistration, string>({
      query: (id: string) => ({
        url: `registration/${id}`,
        method: "GET",
      }),
      providesTags: ["registrationList"],
    }),
    // ADD RegistrationList Data
    addRegistrationList: builder.mutation<IRegistration, IRegistration>({
      query: (registrationListData: IRegistration) => ({
        url: "registration",
        method: "POST",
        data: registrationListData,
      }),
      invalidatesTags: ["registrationList"],
    }),
    // UPDATE RegistrationList Data
    updateRegistrationList: builder.mutation<IRegistration, IRegistration>({
      query: ({ id, ...registrationListData }) => ({
        url: `registration/${id}`,
        method: "PUT",
        data: registrationListData,
      }),
      invalidatesTags: ["registrationList"],
    }),
    // DELETE RegistrationList Data
    deleteRegistrationList: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `registration/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["registrationList"],
    }),
  }),
});

export const {
  useGetRegistrationListDataQuery,
  useGetRegistrationListByIdQuery,
  useAddRegistrationListMutation,
  useDeleteRegistrationListMutation,
  useUpdateRegistrationListMutation,
} = registrationApi;
