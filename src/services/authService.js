import axios from "axios";
const API_URL = "https://localhost:5001/api/Authenticate/";
class AuthService {
  login(email, password) {
    return axios.post(API_URL + "login", {
      email,
      password,
    });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(username, email, password) {
    return axios.post(API_URL + "register", {
      username,
      email,
      password,
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}
export default new AuthService();
