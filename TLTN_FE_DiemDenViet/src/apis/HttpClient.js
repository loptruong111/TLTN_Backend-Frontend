import envVar from "../utils/envVar";

class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, method = "GET", body = null, headers = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const defaultHeaders = {
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(url, {
        method,
        headers: { ...defaultHeaders, ...headers },
        body: body ? JSON.stringify(body) : null,
        credentials: "include",
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;  
    }
  }

  get(endpoint, headers = {}) {
    return this.request(endpoint, "GET", null, headers);
  }

  post(endpoint, body, headers = {}) {
    return this.request(endpoint, "POST", body, headers);
  }

  put(endpoint, body, headers = {}) {
    return this.request(endpoint, "PUT", body, headers);
  }

  delete(endpoint, headers = {}) {
    return this.request(endpoint, "DELETE", null, headers);
  }
}

export default new HttpClient(envVar.api_url);
