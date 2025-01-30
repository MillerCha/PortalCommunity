import axios, { AxiosResponse } from "axios";

export const get = async <T>(url: string): Promise<AxiosResponse<T>> => {
  console.log(url);
    try {
    return await axios.get<T>(url);
  } catch (error: any) {
    console.error("Error fetching data:", error);
    throw new Error(error.response?.data?.message || "Request failed");
  }
};