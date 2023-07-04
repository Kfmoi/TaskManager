import React, { useState } from 'react';
import useUserID from '../../hooks/useUserID';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateTask = () => {
  const [cookies] = useCookies(['mytoken']);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();
  const userID = useUserID();

  const createTask = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/task/${window.localStorage.getItem('userID')}`,
        {
          title,
          description,
          status,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createTask();
    navigate('/');
  };

  return (
    <div>
      <h1>Create Task</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <input
            type="text"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default CreateTask;
