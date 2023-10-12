import axios from 'axios';
const apiUrl = process.env.API_URL || 'http://localhost:3000/api';

export const getCompanies = async () => {
  const endpoint = `${apiUrl}/companies`;

  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const postCompany = async (
  name: string,
  address: string,
  userId: string[]
) => {
  const endpoint = `${apiUrl}/companies`;

  try {
    const response = await axios.post(endpoint, { name, address, userId });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCompany = async (id: string) => {
  const endpoint = `${apiUrl}/companies/${id}`;

  try {
    const response = await axios.delete(endpoint);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
