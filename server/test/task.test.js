import app from "../app";
import request from "supertest";
import { UserModel } from "../models/UserModel";

const username = "Tasktest"

describe("POST /user/:userId", () => {
  describe("Successfully creating a post", () => {
    test("The message returned to the client", async () => {
      const user = await UserModel.findOne({username});

      const taskData = {
        title: "Task 1",
        description: "Task description",
        status: "in progress",
      };

      const response = await request(app)
        .post(`/task/${user._id}`)
        .send(taskData);

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toEqual(`Task ${taskData.title} saved!`);
    });
    test("Missing a title, description, or status", async () => {
      const user = await UserModel.findOne({username});

      const taskData = [
        { title: "Task 1", description: "Task description" },
        {
          description: "Task description",
          status: "in progress",
        },
        {
          title: "Task 3",
          status: "Pending",
        },
        {
          title: "Task 3",
        },
        {
          status: "Pending",
        },
        {
          description: "Task description",
        },
      ];

      for (const data of taskData) {
        const response = await request(app)
          .post(`/task/${user._id}`)
          .send(data);

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toEqual(`Task ${data.title} saved!`);
      }
    });
  });
});
