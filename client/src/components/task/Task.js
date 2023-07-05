import React from "react";
import "./task.css";
import PendingIcon from "../../assets/pending.png";
import DelayedIcon from "../../assets/delayed.png";
import CompletedIcon from "../../assets/completed.png";
import DeleteIcon from "../../assets/delete.png"
import EditIcon from "../../assets/edit.png"


const Task = ({ title, desc, status, edit, del, taskId }) => {
  return (
    <div className="task-comp" id={taskId}>
      <div className="task-top">
        <h1 className="task-title">{title}</h1>
        <div className="task-top-buttons">
          <button onClick={edit}>
            <img src={EditIcon} alt="edit" className="modify" />
          </button>
          <button onClick={del}>
          <img src={DeleteIcon} alt="delete" className="modify" />
          </button>
        </div>
      </div>
      <div className="task-bottom">
        <p className="task-desc">{desc}</p>
        <div className="task-status">
          {status === "Pending" ? (
            <img src={PendingIcon} alt="pending" />
          ) : status === "Delayed" ? (
            <img src={DelayedIcon} alt="delayed" />
          ) : (
            <img src={CompletedIcon} alt="completed" />
          )}
          <p>{status}</p>
          </div>
      </div>
    </div>
  );
};

export default Task;
