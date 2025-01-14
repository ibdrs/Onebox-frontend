import axios from "axios";

class AuthService {
  login(user) {
    return axios.post("https://localhost:7230/api/Auth/login", {
      username: user.username,
      password: user.password,
    })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }
}

export default new AuthService();
