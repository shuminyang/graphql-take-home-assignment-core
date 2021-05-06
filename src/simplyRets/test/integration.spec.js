const supertest = require("supertest");
const nock = require("nock");
const faker = require("faker");

const { GET_PROPERTIES_URL, SIMPLY_RETS_URL } = require("../datasource");

const MOCK_CITY = faker.address.cityName();

const VALID_RESPONSE = [
  {
    showingContactName: faker.name.findName(),
    address: {
      state: faker.address.cityName(),
    },
  },
  {
    showingContactName: faker.name.findName(),
    address: {
      state: faker.address.cityName(),
    },
  },
];

const QUERY = `{
  getProperties(city: "${MOCK_CITY}") {
    showingContactName
    address {
      state
    }
  }
}`;

describe("Integration test", () => {
  it("should return unauthorized if authorization has not been sent", async () => {
    const app = createTestServer();

    const res = supertest(app).post("/graphql").send({ query: QUERY });

    await res.then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.errors).toBeDefined();
      expect(res.body.errors[0].extensions.code).toBe("UNAUTHENTICATED");
    });
  });

  it("should return valid response", async () => {
    nock(SIMPLY_RETS_URL)
      .get(GET_PROPERTIES_URL)
      .query({ q: MOCK_CITY })
      .reply(200, VALID_RESPONSE);

    const app = createTestServer();

    const res = supertest(app)
      .post("/graphql")
      .send({ query: QUERY })
      .set({ authorization: "bearer 676cfd34-e706-4cce-87ca-97f947c43bd4" });

    await res.then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.data.getProperties).toBeDefined();
      expect(res.body.data.getProperties).toMatchObject(VALID_RESPONSE);
    });
  });
});
