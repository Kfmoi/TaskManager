import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";
import "./home.css";
import { Task } from "../../components";
import axios from "axios";

const Home = () => {
  const [cookies] = useCookies(["mytoken"]);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/task/${window.localStorage.getItem("userID")}`
      );
      setTasks(response.data);
      window.localStorage.setItem(
        "taskIds",
        JSON.stringify(response.data.map((task) => task._id))
      );
    } catch (error) {
      console.error("Error fetching user tasks:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(
        `http://localhost:8000/task/${window.localStorage.getItem(
          "userID"
        )}/${taskId}`
      );
      getTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const deleteAllTasks = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/task/${window.localStorage.getItem("userID")}`
      );
      getTasks();
    } catch (error) {
      console.error("Error deleting all tasks");
    }
  };

  useEffect(() => {
    getTasks();
  }, [tasks]);

  return (
    <div className="home">
      <div className="title">
        <h1>Task Manager</h1>
      </div>
      <div className="home-body">
        {cookies.mytoken ? (
          <div>
            <div className="home-buttons">
              <Link to="/create-task" className="create-task">
                Create Task
              </Link>
              {tasks.length > 0 && (
                <button className="delete-all" onClick={deleteAllTasks}>
                  Delete all tasks
                </button>
              )}
            </div>
            {tasks.map((task) => (
              <Task
                taskId={task._id}
                key={task._id}
                title={task.title}
                desc={task.description}
                status={task.status}
                del={() => deleteTask(task._id)}
                edit={() => navigate(`/edit-task/${task._id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="not-logged-in">
            <h1 className="create-task-title">You are not logged in</h1>
            <Link to="/login">
              <button className="create-task-submit">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
