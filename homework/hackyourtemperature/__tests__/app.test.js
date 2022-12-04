import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);

describe("POST /weather", () => {
  it("should return 200 status code when name of city is correct", async () => {
    const response = await request.post("/weather").send({
      cityName: "london",
    });
    expect(response.statusCode).toBe(200);
  });
  it("should return 404 status code when name of city is not correct", async () => {
    const response = await request.post("/weather").send({
      cityName: "leuwaden ",
    });
    expect(response.statusCode).toBe(404);
  });
});
