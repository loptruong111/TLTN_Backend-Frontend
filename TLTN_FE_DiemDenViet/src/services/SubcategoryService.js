import HttpClient from "../apis/HttpClient";

export default class SubcategoryService {
  static async get(id) {
    return HttpClient.get(`/subcategory/${id}`);
  }
  static async gets(queryParams) {
    return HttpClient.get(`/subcategory?${queryParams}`);
  }  static async getForSelect(queryParams) {
    return HttpClient.get(`/subcategory/getforselect?${queryParams}`);
  }
  static async post(formData) {
    return HttpClient.post("/subcategory", formData);
  }
  static async put(id, formData) {
    return HttpClient.put(`/subcategory/${id}`, formData);
  }
  static async delete(id) {
    return HttpClient.delete(`/subcategory/${id}`);
  }
}
