import axios from 'axios';
const apiUrl = process.env.API_URL || 'http://localhost:3000/api';

export const getUsers = async () => {
  const endpoint = `${apiUrl}/users`;

  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const postUser = async (fullName: string, email: string) => {
  const endpoint = `${apiUrl}/users`;

  try {
    const response = await axios.post(endpoint, { fullName, email });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (id: string) => {
  const endpoint = `${apiUrl}/users/${id}`;

  try {
    const response = await axios.delete(endpoint);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
