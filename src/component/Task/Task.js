import React from "react";
import './Task.css'

const Task = ({id, title,description,priority, removeTaskfromList, obj, setTaskEditable}) => {
    return (
        <div className='task-container' >
          <h2 className="task-title">{title}</h2>
          <p className="task-description"> {description} </p>
           <p className="task-priority"> {priority}</p>
           <button className="btn-card" onClick={()=>{
            alert("Added cart succesfully")
            ;
           }}>Add to Cart</button>
           <button className="btn-card" > Buy Now</button>
           <span className="card-delet"
           onClick={()=>{ 
            
            removeTaskfromList(obj);
           }}
           >🗑️</span>
           <span className="card-edit-icon"
           onClick={()=>{
            setTaskEditable(id);
           }}
           
           >
            🖊️
           </span>
        </div>
    )
}

export default Task