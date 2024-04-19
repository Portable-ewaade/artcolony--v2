import axios from 'axios';

const BASE_URL = 'https://xlut18p5h6.execute-api.us-east-1.amazonaws.com'; // Your base URL goes here

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    // You can add any other default headers here
  },
});

// Define a generic fetchData function
export async function fetchData<T>(config: any): Promise<T> {
  try {
    const response = await axiosInstance.request(config);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default axiosInstance;
