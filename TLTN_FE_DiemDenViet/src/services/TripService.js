import HttpClient from "../apis/HttpClient";

export default class TripService {
  static async get(id) {
    return HttpClient.get(`/trip/${id}`);
  }
  static async gets(queryParams) {
    return HttpClient.get(`/trip?${queryParams}`);
  }
  static async post(formData) {
    return HttpClient.post("/trip", formData);
  }
  static async delete(id) {
    return HttpClient.delete(`/trip/${id}`);
  }
}
