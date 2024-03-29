import axios from "axios";

import { global } from "../_config/global";

const userService = {};

userService.getAll = async (token, page = 1) => {
  const options = {
    method: "GET",
    url: `${global.BASE_API_URL}/users`,
    params: { page: page },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  //await sleep(2000); // TODO
  const response = await axios.request(options);
  return response.data;
};

userService.getCustomers = async (token) => {
  const options = {
    method: "GET",
    url: `${global.BASE_API_URL}/users/all-customers`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  //await sleep(2000); // TODO
  const response = await axios.request(options);
  return response.data;
};

userService.getDoctors = async (token) => {
  const options = {
    method: "GET",
    url: `${global.BASE_API_URL}/users/all-doctors`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  //await sleep(2000); // TODO
  const response = await axios.request(options);
  return response.data;
};

userService.getProfile = async (token) => {
  const options = {
    method: "GET",
    url: `${global.BASE_API_URL}/users/profile`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  //await sleep(2000); // TODO
  const response = await axios.request(options);
  return response.data;
};

userService.getAppointment = async (token, id) => {
  const options = {
    method: "GET",
    url: `${global.BASE_API_URL}/users/appointment/${id}`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  //await sleep(2000); // TODO
  const response = await axios.request(options);
  return response.data;
};

userService.getAppointments = async (token) => {
  const options = {
    method: "GET",
    url: `${global.BASE_API_URL}/users/user-appointments`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  //await sleep(2000); // TODO
  const response = await axios.request(options);
  return response.data;
};

userService.getAllAppointments = async (token) => {
  const options = {
    method: "GET",
    url: `${global.BASE_API_URL}/users/all-appointments`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  //await sleep(2000); // TODO
  const response = await axios.request(options);
  return response.data;
};

userService.saveProfile = async (token, user) => {
  const options = {
    method: "POST",
    url: `${global.BASE_API_URL}/users/update-profile`,
    data: user,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  // await sleep(2000); // TODO
  const response = await axios.request(options);
  return response.data;
};

userService.deleteAppointment = async (token, id) => {
  const options = {
    method: "DELETE",
    url: `${global.BASE_API_URL}/users/delete-appointment/${id}`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  // await sleep(2000); // TODO
  const response = await axios.request(options);
  return response.data;
};

userService.createAppointment = async (token, data) => {
  const options = {
    method: "POST",
    url: `${global.BASE_API_URL}/users/create-appointment`,
    data: data,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  // await sleep(2000); // TODO
  const response = await axios.request(options);
  return response.data;
};

userService.updateAppointment = async (token, data, id) => {
  const options = {
    method: "PUT",
    url: `${global.BASE_API_URL}/users/update-appointment/${id}`,
    data: data,
    // params: { id },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  // await sleep(2000); // TODO
  const response = await axios.request(options);
  return response.data;
};

export default userService;
