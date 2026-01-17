import axios from "axios";

import { config } from "../config"

const BASE_URL = config.serverUrl;


export async function getUserProfile() {
  try {
    const url = `${BASE_URL}/user/profile`;
    const token = sessionStorage.getItem("token");
    // console.log("token: ", token)

    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function updateUserProfile(formData) {
  try {

    const url = `${BASE_URL}/user/update`;
    const token = sessionStorage.getItem("token");

    const response = await axios.put(url, formData, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data", },
    });

    return response;
  } catch (e) {
    console.log(e);
    return null;
  }
}
