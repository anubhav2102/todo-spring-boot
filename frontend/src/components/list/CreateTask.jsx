import React, { useEffect, useState } from "react";
import TaskForm from "./TaskForm.jsx";
import "./CreateTask.css";

const CreateTask = ({closeCreateTaskModal, savedTask, updateTask}) => {
    const [editTask, setEditTask] = useState({});
    const closeModal = () => {
        closeCreateTaskModal(false);
    }
    const closeFromTask = (e) => {
        closeCreateTaskModal(e);
    }
    const handleSaveTask = (e) => {
        savedTask(e);
    }
    useEffect(()=>{
        console.log(updateTask)
        setEditTask(updateTask)
    },[updateTask])
    return(
        <div>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div style={{flex: "0.1"}}></div>
                <div style={{flex: (window.innerWidth>760) ? "0.4":"0.9"}}>
                    {
                        !updateTask.duedate ? (
                            <h1 style={{fontSize:(window.innerWidth>760)?'30px':'25px'}}>Create New Task</h1>
                        ) : (
                            <h1 style={{fontSize:(window.innerWidth>760)?'30px':'25px'}}>Update Task</h1>
                        )
                    }
                </div>
                <div style={{flex: "0"}}><img src="/assets/close.svg" style={{height: "20px", cursor:"pointer", marginRight: "10px"}} onClick={closeModal} alt="" /></div>
            </div>
            <div>
                <TaskForm closeCreateTaskModal={closeFromTask} savingData={handleSaveTask} updateTask={editTask} />
            </div>
        </div>
    );
}

export default CreateTask;