import React from "react";
import TaskForm from "./TaskForm.jsx";

const CreateTask = ({closeCreateTaskModal, savedTask}) => {
    const closeModal = () => {
        closeCreateTaskModal(false);
    }
    const closeFromTask = (e) => {
        closeCreateTaskModal(e);
    }
    const handleSaveTask = (e) => {
        savedTask(e);
    }
    return(
        <div>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div style={{flex: "0.1"}}></div>
                <div style={{flex: "0.4"}}><h1 style={{fontSize:'30px'}}>Create New Task</h1></div>
                <div style={{flex: "0"}}><img src="/assets/close.svg" style={{height: "20px", cursor:"pointer", marginRight: "10px"}} onClick={closeModal} alt="" /></div>
            </div>
            <div>
                <TaskForm closeCreateTaskModal={closeFromTask} savingData={handleSaveTask} />
            </div>
        </div>
    );
}

export default CreateTask;