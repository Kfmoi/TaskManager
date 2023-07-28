import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./createTask.css";

const CreateTask = () => {
  const [cookies] = useCookies(["mytoken"]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const statusOptions = ["Pending", "Delayed", "Completed"];

  const createTask = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/task/${window.localStorage.getItem("userID")}`,
        {
          title,
          description,
          status,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createTask();
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="create-task-page">
      <div className="create-task-card">
        {cookies.mytoken ? (
          <div>
            <h1 className="create-task-title">Create Task</h1>
            <form onSubmit={handleSubmit}>
              <div className="create-task-input">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="create-task-input">
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="create-task-input">
                <label htmlFor="status">Status:</label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Select status</option>
                  {statusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="create-task-submit">
                Create Task
              </button>
              <button
                type="button"
                className="create-task-submit"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h1 className="create-task-title">Please login to create a task</h1>
            <Link to="/login">
              <button className="create-task-submit">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateTask;
