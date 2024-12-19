import HttpClient from "../apis/HttpClient";

export default class ProvinceService {
  static async get(id) {
    return HttpClient.get(`/province/${id}`);
  }
  static async gets(queryParams) {
    return HttpClient.get(`/province?${queryParams}`);
  }
  static async getForSelect() {
    return HttpClient.get(`/province/getforselect`);
  }
  static async post(formData) {
    return HttpClient.post("/province", formData);
  }
  static async put(id, formData) {
    return HttpClient.put(`/province/${id}`, formData);
  }
  static async delete(id) {
    return HttpClient.delete(`/province/${id}`);
  }
}
