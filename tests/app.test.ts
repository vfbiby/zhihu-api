import request from "supertest";
import app from "../src/app";

describe("Koa", () => {
  it("should return http", async () => {
    const response = await request(app.callback()).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("<h1>Homepage</h1>");
  });
});
