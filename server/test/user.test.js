import app from "../app.js";
import request from "supertest";

describe("POST /user/register", () => {
  const body = {
    username: "test",
    password: "test",
  };
  describe("Given a username and password", () => {
    test("Should be 200 when successful", async () => {
      const response = await request(app).post("/user/register").send(body);

      expect(response.statusCode).toBe(200);
      await request(app).delete("/user").send(body);
    });
    test("The response should be in JSON format", async () => {
      const response = await request(app).post("/user/register").send(body);

      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
      await request(app).delete("/user").send(body);
    });
  });

  describe("Missing a username or password", () => {
    test("Should be 400 status code", async () => {
      const bodyData = [{ username: "hi" }, { password: "hi" }, {}];

      for (const data of bodyData) {
        const response = await request(app).post("/user/register").send(data);
        expect(response.statusCode).toBe(400);
      }
    });
  });
});

describe("DELETE /user", () => {
  describe("Given a username and password", () => {
    test("Should be 200 when successful", async () => {
      const body = {
        username: "test",
        password: "test",
      };

      await request(app).post("/user/register").send(body);

      const response = await request(app).delete("/user").send(body);

      expect(response.statusCode).toBe(200);
    });
  });
  describe("Missing a username/password, or username is not found", () => {
    test("Should be 400 status code", async () => {
      const bodyData = [{ username: "hi" }, { password: "hi" }, {}];

      for (const body of bodyData) {
        const response = await request(app).delete("/user").send(body);
        expect(response.statusCode).toBe(400);
      }
    });
  });
});

describe("POST /user/login", () => {
  const body = {
    username: "test",
    password: "test",
  };
  describe("Given a username and password", () => {
    test("Should be 200 when successful", async () => {
      await request(app).post("/user/register").send(body);
      const response = await request(app).post("/user/login").send(body);

      expect(response.statusCode).toBe(200);
      await request(app).delete("/user").send(body);
    });
    test("The response should be in JSON format", async () => {
      await request(app).post("/user/register").send(body);
      const response = await request(app).post("/user/login").send(body);

      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
      await request(app).delete("/user").send(body);
    });
  });

  describe("Missing a username/password or wrong creditionals", () => {
    test("Should be 400 status code", async () => {
      const bodyData = [{ username: "hi" }, { password: "hi" }, {}];

      for (const data of bodyData) {
        const response = await request(app).post("/user/login").send(data);
        expect(response.statusCode).toBe(400);
      }
    });
  });
});
