import React, { useState } from "react";
import "./List.css";
import Table from "./Table.jsx";
import CreateTask from "./CreateTask.jsx";

const List = () => {
    const [showCreateTask, setShowCreateTask] = useState(false);
    const openCreateTaskModal = () => {
        setShowCreateTask(true);
    }
    const closeCreateTaskModal = (e) => {
        setShowCreateTask(e);
    }
    const handleNewTask = (e) => {
        console.log(e);
    }
    return (
        <div>
            <div>
                <div style={{textAlign: "center"}}>
                    <button onClick={openCreateTaskModal} className="createNewTaskButton">Create a new task</button>
                </div>
            </div>
            <div style={{display:'flex', flexDirection:'column', height: '70vh', justifyContent:'end'}}>
                <div style={{marginLeft: "2rem", marginBottom:'1rem'}}>
                    <img src="/assets/filter.svg" style={{height: "18px", cursor: "pointer"}} alt="" />
                </div>
                <Table/>
            </div>
            {
                showCreateTask && (
                    <div style={{position: "fixed",height: "100%", width:"100%",background:"rgb(115 111 111 / 50%)", zIndex:9, top:"0",left:"0"}}>
                        <div style={{position: "fixed", height: "35%", width: "50%", borderRadius: "10px", left: "25%", top: "22%", zIndex: 999, background: "white", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", margin: "10px", padding: "10px"}}>
                            <CreateTask closeCreateTaskModal={closeCreateTaskModal} savedTask={handleNewTask} />
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default List;