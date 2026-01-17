import axios from "axios";

import { config } from "../config"

const BASE_URL = config.serverUrl;

// GET ALL USERS
export async function getAllUsers() {
  try {
    const url = `${BASE_URL}/admin/users`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });

    if (response) return response;
    else return null;
  } catch (e) {
    console.log(e);
    return null;
  }
}

// DELETE USER 
export async function deleteUser(id) {
  try {
    const url = `${BASE_URL}/admin/user/${id}`;//

    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      }
    });

    if (response) return response;
    else return null;
  } catch (e) {
    console.log(e);
    return null;
  }
}

// Update user
export async function updateUser(id, formData) {
  try {

    const url = `${BASE_URL}/admin/user/${id}`;
    const token = sessionStorage.getItem("token");

    const response = await axios.put(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(response)

    return response;
  } catch (e) {
    console.log(e);
    return null;
  }
}

// Get user by ID
// export async function getUserById(id) {
//   try {
//     const url = `${BASE_URL}/admin/user/${id}`;
//     const token = sessionStorage.getItem("token");

//     const response = await axios.get(url, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     return response;
//   } catch (e) {
//     console.log(e);
//     return null;
//   }
// }