import axios from 'axios';

interface LoginResponse {
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