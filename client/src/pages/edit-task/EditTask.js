import React from "react";
import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

const EditTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [cookies] = useCookies(["mytoken"]);

  const statusOptions = ["Pending", "In Progress", "Completed"];

  const navigate = useNavigate();

  const { taskId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/task/${window.localStorage.getItem(
          "userID"
        )}/${taskId}`,
        {
          title,
          description,
          status,
        }
      );
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.error("Error creating task:", error);
    }
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
                Edit
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="create-task-submit"
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

export default EditTask;
