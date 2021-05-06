const { RESTDataSource } = require("apollo-datasource-rest");

const SIMPLY_API_KEY = "simplyrets";
const SIMPLY_API_SECRET = "simplyrets";
const AUTH = `Basic ${Buffer.from(
  SIMPLY_API_KEY + ":" + SIMPLY_API_SECRET
).toString("base64")}`;

const SIMPLY_RETS_URL = "https://api.simplyrets.com";
const GET_PROPERTIES_URL = "/properties";

class SimplyRetsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = SIMPLY_RETS_URL;
  }

  willSendRequest(request) {
    request.headers.set("Authorization", AUTH);
  }

  async getPropertiesByCity(cityParam) {
    return await this.get(`${GET_PROPERTIES_URL}?q=${cityParam}`);
  }
}

module.exports = {
  SimplyRetsAPI,
  SIMPLY_RETS_URL,
  GET_PROPERTIES_URL,
};
