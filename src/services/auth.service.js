import axios from 'axios';
import jwtService from './jwt.service';
const API_URL = import.meta.env.VITE_API_BASE_URL + "user/";

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'signin', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          response.data.data = jwtService.decode(response.data.data);
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }
}

export default new AuthService();
