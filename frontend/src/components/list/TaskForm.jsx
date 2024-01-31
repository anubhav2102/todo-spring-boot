import React, { useState } from "react";

const TaskForm = ({closeCreateTaskModal, savingData}) => {
    const [title,setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [duedate, setDuedate] = useState('');
    const handleClose = () => {
        closeCreateTaskModal(false);
    }
    const handleSave = () => {
        if(!title || !description || !duedate){
            alert('Please fill all the fields.');
            return;
        }
        let obj = {
            'title': title,
            'description': description,
            'duedate': duedate
        };
        savingData(obj);
        handleClose();
    }
    return (
        <div>
            <form style={{display: "flex", height: "23vh", width: "50vw", justifyContent: "space-evenly", alignItems: "center"}}>
                <label htmlFor="title" style={{display:"flex", flexDirection: "column"}}>
                   <span style={{fontWeight: "500", marginBottom: "5px", fontSize: "11px", fontFamily: "Arial, sans-serif"}}> Title</span>  
                   <span>
                    <input style={{outline: "none", padding: "6px", borderRadius: "5px", border: "1px solid lightgrey"}} placeholder="Enter title" type="text" onChange={(e)=>setTitle(e.target.value)} />
                   </span>
                </label>
                <label htmlFor="description" style={{display:"flex", flexDirection: "column"}}>
                   <span style={{fontWeight: "500", marginBottom: "5px", fontSize: "11px", fontFamily: "Arial, sans-serif"}}> Description</span>  
                   <span>
                    <input style={{outline: "none", padding: "6px", borderRadius: "5px", border: "1px solid lightgrey"}} placeholder="Enter description" type="text" onChange={(e)=>setDescription(e.target.value)} />
                    </span>
                </label>
                <label htmlFor="due_date" style={{display:"flex", flexDirection: "column"}}>
                    <span style={{fontWeight: "500", marginBottom: "5px", fontSize: "11px", fontFamily: "Arial, sans-serif"}}>Due Date</span>  
                    <span>
                        <input style={{outline: "none", padding: "6px", borderRadius: "5px", border: "1px solid lightgrey"}} type="date" onChange={(e)=>setDuedate(e.target.value)} />
                    </span>
                </label>
            </form>
            <div style={{display: "flex", alignItems: "center", justifyContent: "end", marginRight: "1rem"}}>
                <button style={{cursor: "pointer",border:"1px solid grey", color:"black",background:"white", padding: "8px", width: "6rem", fontSize: "16px", marginRight: "15px", borderRadius: "6px"}} onClick={handleClose}>Cancel</button>
                <button style={{cursor: "pointer",border:"none", color:"white",background:"#7171ed", padding: "8px", width: "6rem", fontSize: "16px", borderRadius: "6px"}} onClick={handleSave}>Save</button>
            </div>
        </div>
    );
};

export default TaskForm;