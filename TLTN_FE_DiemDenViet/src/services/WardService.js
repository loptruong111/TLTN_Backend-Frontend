import HttpClient from "../apis/HttpClient";

export default class WardService {
  static async get(id) {
    return HttpClient.get(`/ward/${id}`);
  }
  static async gets(queryParams) {
    return HttpClient.get(`/ward?${queryParams}`);
  }
  static async getForSelect(queryParams) {
    return HttpClient.get(`/ward/getforselect?${queryParams}`);
  }
  static async post(formData) {
    return HttpClient.post("/ward", formData);
  }
  static async put(id, formData) {
    return HttpClient.put(`/ward/${id}`, formData);
  }
  static async delete(id) {
    return HttpClient.delete(`/ward/${id}`);
  }
}
