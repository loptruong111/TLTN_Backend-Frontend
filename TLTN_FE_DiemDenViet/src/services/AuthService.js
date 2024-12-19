import HttpClient from "../apis/HttpClient";

export default class AuthService {
  static async signIn(formData) {
    return HttpClient.post("/auth/signin", formData);
  }
  static async signUp(formData) {
    return HttpClient.post("/auth/signup", formData);
  }
  static async signOut() {
    return HttpClient.post("/auth/signout");
  }
  static async getUserByToken() {
    const res = await HttpClient.get("/user/user-by-token");
    if (res.status) {
      return { user: res.data, isAuthenticated: true };
    } else {
      return { user: null, isAuthenticated: false };
    }
  }
}
