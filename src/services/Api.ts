import axios from 'axios';

interface LoginResponse {
  token: string;
}

interface RegisterResponse {
  token: string;
}

const login = async (email: string, password: string): Promise<LoginResponse> => {
  const { data } = await axios.post('http://localhost:3000/login', {
    email,
    password,
  });
  return data;
};
export { login };



export const register = async (name: string, email: string, password: string): Promise<RegisterResponse> => {
  const response = await axios.post('/api/register', {
    name,
    email,
    password,
  });
  return response.data;
};