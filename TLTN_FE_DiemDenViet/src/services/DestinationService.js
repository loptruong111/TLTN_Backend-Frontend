import HttpClient from "../apis/HttpClient";

export default class DestinationService {
  static async get(id) {
    return HttpClient.get(`/destination/${id}`);
  }
  static async getForUpdate(id) {
    return HttpClient.get(`/destination/${id}/update`);
  }
  static async gets(queryParams) {
    return HttpClient.get(`/destination?${queryParams}`);
  }
  static async search(queryParams) {
    return HttpClient.get(`/destination/search?${queryParams}`);
  }
  static async post(formData) {
    return HttpClient.post("/destination", formData);
  }
  static async put(id, formData) {
    return HttpClient.put(`/destination/${id}`, formData);
  }
  static async delete(id) {
    return HttpClient.delete(`/destination/${id}`);
  }
}
