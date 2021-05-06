const { RESTDataSource } = require("apollo-datasource-rest");

const SIMPLY_RETS_URL = "https://api.simplyrets.com/";
const SIMPLY_API_KEY = "simplyrets";
const SIMPLY_API_SECRET = "simplyrets";
const GET_PROPERTIES = "properties";
const AUTH = `Basic ${Buffer.from(
  SIMPLY_API_KEY + ":" + SIMPLY_API_SECRET
).toString("base64")}`;

class SimplyRetsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = SIMPLY_RETS_URL;
  }

  willSendRequest(request) {
    request.headers.set("Authorization", AUTH);
  }

  async getPropertiesByCity() {
    return await this.get(`${GET_PROPERTIES}?q=houston`);
  }
}

module.exports = {
  SimplyRetsAPI,
};
