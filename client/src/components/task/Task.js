import React from 'react'
import './task.css'

const Task = ({title, desc, status, edit, del}) => {


  return (
    <div className='task-comp'>
        <div className='task-top'>
            <h1>{title}</h1>
            <div className='task-top-buttons'>
                <button onClick={edit}>Edit</button>
                <button onClick={del}>Delete</button>
            </div>

        </div>
        <div className='task-bottom'>
            <p>{desc}</p>
            <p>{status}</p>
        </div>

    </div>
  )
}

export default Task