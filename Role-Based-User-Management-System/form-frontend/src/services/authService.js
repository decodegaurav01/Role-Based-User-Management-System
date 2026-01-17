import axios from "axios";

import {config} from "../config"

const BASE_URL = config.serverUrl ;

//  LOGIN
export async function   loginUser(email, password) {
  try {
    const url = `${BASE_URL}/auth/login`;
    const body = { email, password };
    const response = await axios.post(url, body);
    console.log(response.data)
    if (response) return response.data;
  } catch (e) {
    
    return e;
  }
}

//  REGISTER
export async function registerUser(formData
) {
  try {
    const url = `${BASE_URL}/auth/register`;
    const response = await axios.post(url, formData);
    console.log("from axios",response)
    if (response)
      return response;
    else return null;
  } catch (e) {
    console.log(e);
    return null;
  }
}





// 
