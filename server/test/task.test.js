import app from "../app";
import request from "supertest";
import { UserModel } from "../models/UserModel";
import { TaskModel } from "../models/TaskModel";

const username = "Tasktest";
const taskData = {
  title: "Task 1",
  description: "Task description",
  status: "in progress",
};

describe("POST /task/:userId", () => {
  describe("Successfully creating a post", () => {
    test("The message returned to the client", async () => {
      const user = await UserModel.findOne({ username });

      const response = await request(app)
        .post(`/task/${user._id}`)
        .send(taskData);

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toEqual(`Task ${taskData.title} saved!`);
    });
    test("Missing a title, description, or status", async () => {
      const user = await UserModel.findOne({ username });

      const multipleTaskData = [
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

      for (const data of multipleTaskData) {
        const response = await request(app)
          .post(`/task/${user._id}`)
          .send(data);

        if (!data.title || !data.description || !data.status) {
          // Expecting a status code of 405 for incomplete data
          expect(response.statusCode).toBe(405);
          expect(response.body.error).toBeDefined();
        } else {
          // Expecting a status code of 200 for valid data
          expect(response.statusCode).toBe(200);
          expect(response.body.status).toEqual(`Task ${data.title} saved!`);
        }
      }
    });
  });
  describe("Unsuccessful request", () => {
    test("No information is inputted", async () => {
      const user = await UserModel.findOne({ username });

      const emptyTaskData = {};

      const response = await request(app)
        .post(`/task/${user._id}`)
        .send(emptyTaskData);

      expect(response.statusCode).toBe(405);
      expect(response.body.error).toBeDefined();
    });
  });
});

describe("GET /task/:userId", () => {
  describe("Successful request", () => {
    test("The message returned to the client", async () => {
      const user = await UserModel.findOne({ username });

      await request(app).post(`/task/${user._id}`).send(taskData);

      const response = await request(app).get(`/task/${user._id}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
    });
  });
});

describe("DELETE /task/:userId/:taskId", () => {
  describe("Successfull delete request", () => {
    test("The message returned to the client", async () => {
      const user = await UserModel.findOne({ username });

      const deleteTaskData = {
        title: "hello",
        description: "Task description",
        status: "in progress",
      };

      await request(app).post(`/task/${user._id}`).send(deleteTaskData);

      const task = await TaskModel.findOne({ title: "hello" });

      const response = await request(app).delete(
        `/task/${user._id}/${task._id}`
      );

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBeDefined();
    });
  });
});

describe("PUT /task/:userId/:taskId", () => {
  describe("Successful put request", () => {
    test("The message returned to the client", async () => {
      const user = await UserModel.findOne({ username });

      const updateTaskData = {
        title: "Hello",
        description: "Task description",
        status: "in progress",
      };

      await request(app).post(`/task/${user._id}`).send(updateTaskData);

      const task = await TaskModel.findOne({ title: "Hello" });

      const response = await request(app)
        .put(`/task/${user._id}/${task._id}`)
        .send({
          status: "pending",
        });

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBeDefined();
    });

    test("The content has been updated", async () => {
      const user = await UserModel.findOne({ username });

      const updateTaskData = {
        title: "Hello",
        description: "Task description",
        status: "in progress",
      };

      await request(app).post(`/task/${user._id}`).send(updateTaskData);

      const task = await TaskModel.findOne({ title: "Hello" });

      await request(app)
        .put(`/task/${user._id}/${task._id}`)
        .send({
          status: "pending",
        });

      const check = await TaskModel.findOne({ title: "Hello" });

      expect(check.status).toEqual("pending");
    });
  });
});

describe("DELETE /task/:userId", () => {
  describe("Successful Delete Request", () => {
    test("The message returned to the client", async () => {
      const user = await UserModel.findOne({ username });

      const response = await request(app).delete(`/task/${user._id}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBeDefined();
    });
    test("The users tasks are empty", async () => {
      const user = await UserModel.findOne({ username });

      await request(app).delete(`/task/${user._id}`);

      const updatedUser = await UserModel.findOne({ username });

      expect(updatedUser.tasks).toEqual([]);
    });
  });
});
