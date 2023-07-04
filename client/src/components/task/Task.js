import React from 'react'
import './task.css'

const Task = ({title, desc, status, edit, del, taskId}) => {


  return (
    <div className='task-comp' id={taskId}>
        <div className='task-top'>
            <h1 className='task-title'>{title}</h1>
            <div className='task-top-buttons'>
                <button onClick={edit}>Edit</button>
                <button onClick={del}>Delete</button>
            </div>

        </div>
        <div className='task-bottom'>
            <p className='task-desc'>{desc}</p>
            <p className='task-status'>{status}</p>
        </div>

    </div>
  )
}

export default Task