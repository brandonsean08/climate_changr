const request = require("supertest");
const app = require("../server");

/**
 * Unit test to test that we are able to retrieve all of the 'Actual Data'. If the lenght is 195 then we know that we have all of it.
 */
describe("Get Endpoints", () => {
  it("Should retrieve all of the actual data", async () => {
    const res = await request(app).get("/data/actual/all");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(195);
  });
});

/**
 * Unit test to test that we are able to retrieve all of the 'Predicted Data'. If the lenght is 193 then we know that we have all of it.
 */
describe("Get Endpoints", () => {
  it("Should retrieve all of the predicted data", async () => {
    const res = await request(app).get("/data/predicted/all");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(193);
  });
});

/**
 * Unit test to test that we are able to retrieve all of the 'Countries'. If the lenght is 195 then we know that we have all of it.
 */
describe("Get Endpoints", () => {
  it("Should retrieve all of the countries", async () => {
    const res = await request(app).get("/countries/all");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(195);
  });
});
