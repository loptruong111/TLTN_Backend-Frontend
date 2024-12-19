import HttpClient from "../apis/HttpClient";

export default class ReviewService {
  static async get(id) {
    return HttpClient.get(`/review/${id}`);
  }
  static async gets(queryParams) {
    return HttpClient.get(`/review?${queryParams}`);
  }
  static async getForDestination(queryParams) {
    return HttpClient.get(`/review/getfordestination?${queryParams}`);
  }
  static async post(formData) {
    return HttpClient.post("/review", formData);
  }
  static async put(id, formData) {
    return HttpClient.put(`/review/${id}`, formData);
  }
  static async delete(id) {
    return HttpClient.delete(`/review/${id}`);
  }
}
