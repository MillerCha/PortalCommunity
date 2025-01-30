import axios, { AxiosResponse } from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_BASE_URL = process.env.NEXT_PUBLIC_AUTH_SERVICE_URL;

export const registerUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Authentication`,{userName:username,password:password});
    setUserData(response);
    
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Registration failed');

  }
};

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Authentication`,{userName:username,password:password});
    setUserData(response);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

const setUserData =(response : AxiosResponse)=>{
  const decoded: { name: string } = jwtDecode(response.data.token);
  localStorage.setItem('token', response.data.token);
  localStorage.setItem('name', decoded.name);
}