import HttpClient from "../apis/HttpClient";

export default class DistrictService {
  static async get(id) {
    return HttpClient.get(`/district/${id}`);
  }
  static async gets(queryParams) {
    return HttpClient.get(`/district?${queryParams}`);
  }
  static async getForSelect(queryParams) {
    return HttpClient.get(`/district/getforselect?${queryParams}`);
  }
  static async post(formData) {
    return HttpClient.post("/district", formData);
  }
  static async put(id, formData) {
    return HttpClient.put(`/district/${id}`, formData);
  }
  static async delete(id) {
    return HttpClient.delete(`/district/${id}`);
  }
}
