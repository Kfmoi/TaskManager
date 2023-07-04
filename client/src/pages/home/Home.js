import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";
import "./home.css";
import { Task } from "../../components";
import useUserID from "../../hooks/useUserID";
import axios from "axios";

const Home = () => {
  const [cookies] = useCookies(["mytoken"]);
  const navigate = useNavigate();
  const userID = useUserID();
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/task/${window.localStorage.getItem("userID")}`
      );
      console.log(response.data);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching user tasks:", error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="home">
      <div className="title">
        <h1>Task Manager</h1>
      </div>
      <div className="home-body">

        {cookies.mytoken ? (
          <div>
            <Link to="/create-task" className="create-task">
              Create Task
            </Link>
            {tasks.map((task) => (
              <Task
                key={task.id} 
                title={task.title}
                desc={task.description}
                status={task.status}
              />
            ))}
          </div>
        ) : (
          <div>
            <h1>You are not logged in</h1>
            <button onClick={() => navigate("/login")}>Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
