import axios from "axios";
import { Alert } from "react-native";

const url = "http://192.168.0.106:5000/api/v1/auth/login"; // database url

const loginUser = async (email, password) => {
  try {
    const response = await axios.post(url, {
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    Alert.alert("Invalid credentials!!!", error.response.data?.message);
  }
};
export const authApi = {
  loginUser,
};
