import HttpClient from "../apis/HttpClient";

export default class UserService {
  static async get(id) {
    return HttpClient.get(`/user/${id}`);
  }
  static async gets(queryParams) {
    return HttpClient.get(`/user?${queryParams}`);
  }
  static async put(id, formData) {
    return HttpClient.put(`/user/${id}`, formData);
  }
  static async putByAdmin(id, formData) {
    return HttpClient.put(`/user/${id}/byadmin`, formData);
  }
  static async delete(id) {
    return HttpClient.delete(`/user/${id}`);
  }
}
