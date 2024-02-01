import React, { useEffect, useState } from "react";
import "./TaskForm.css";

const TaskForm = ({closeCreateTaskModal, savingData, updateTask}) => {
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
        console.log(updateTask)
        if(updateTask.duedate){
            console.log(updateTask)
            obj['updated'] = true;
            obj['index'] = updateTask.index;
        }
        savingData(obj);
        handleClose();
    }
    useEffect(()=>{
            console.log(Object.keys(updateTask));
            console.log(updateTask)
            setTitle(updateTask.task);
            setDescription(updateTask.description);
            console.log(updateTask.duedate);
            if(updateTask.duedate){
                const dateString = updateTask.duedate;
                const [day, month, year] = dateString.split('/').map(Number);

                const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

                console.log(formattedDate);
            setDuedate(formattedDate);
        }
    },[updateTask])
    return (
        <div>
            <form style={{display: "flex", height: (window.innerWidth<760) ? "33vh" : "23vh", width: (window.innerWidth<760) ? "82vw" : "48vw", justifyContent: "space-evenly", alignItems: "center", flexDirection: (window.innerWidth<760) ? "column":"row"}}>
                <label htmlFor="title" style={{display:"flex", flexDirection: "column"}}>
                   <span style={{fontWeight: "500", marginBottom: "5px", fontSize: "11px", fontFamily: "Arial, sans-serif"}}> Title</span>  
                   <span>
                    <input style={{outline: "none", padding: "6px", borderRadius: "5px", border: "1px solid lightgrey"}} value={title} placeholder="Enter title" type="text" onChange={(e)=>setTitle(e.target.value)} />
                   </span>
                </label>
                <label htmlFor="description" style={{display:"flex", flexDirection: "column"}}>
                   <span style={{fontWeight: "500", marginBottom: "5px", fontSize: "11px", fontFamily: "Arial, sans-serif"}}> Description</span>  
                   <span>
                    <input style={{outline: "none", padding: "6px", borderRadius: "5px", border: "1px solid lightgrey"}} value={description} placeholder="Enter description" type="text" onChange={(e)=>setDescription(e.target.value)} />
                    </span>
                </label>
                <label htmlFor="due_date" style={{display:"flex", flexDirection: "column"}}>
                    <span style={{fontWeight: "500", marginBottom: "5px", fontSize: "11px", fontFamily: "Arial, sans-serif"}}>Due Date</span>  
                    <span>
                        <input style={{outline: "none", padding: "6px", borderRadius: "5px", border: "1px solid lightgrey"}} value={duedate} type="date" onChange={(e)=>setDuedate(e.target.value)} />
                    </span>
                </label>
            </form>
            <div style={{display: "flex", alignItems: "center", justifyContent: (window.innerWidth<760)?"center":"end", marginRight: (window.innerWidth>760) ? "1rem":"0rem"}}>
                <button style={{cursor: "pointer",border:"1px solid grey", color:"black",background:"white", padding: "8px", width: "6rem", fontSize: "16px", marginRight: "15px", borderRadius: "6px"}} onClick={handleClose}>Cancel</button>
                <button style={{cursor: "pointer",border:"none", color:"white",background:"#7171ed", padding: "8px", width: "6rem", fontSize: "16px", borderRadius: "6px"}} onClick={handleSave}>Save</button>
            </div>
        </div>
    );
};

export default TaskForm;