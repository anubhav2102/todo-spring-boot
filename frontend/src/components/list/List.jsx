import React, { useEffect, useState } from "react";
import "./List.css";
import Table from "./Table.jsx";
import CreateTask from "./CreateTask.jsx";
import axios from "axios"

const List = () => {
    const [showCreateTask, setShowCreateTask] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const [updateTask, setUpdateTask] = useState({});
    const [data, setData] = useState([]);
    const openCreateTaskModal = () => {
        setShowCreateTask(true);
    }
    const closeCreateTaskModal = (e) => {
        setShowCreateTask(e);
    }
    const convertDate = (date) => {
        const dateString = date;
        const dateObject = new Date(dateString);
        const day = dateObject.getDate();
        const month = dateObject.getMonth() + 1;
        const year = dateObject.getFullYear();
        const formattedDay = String(day).padStart(2, '0');
        const formattedMonth = String(month).padStart(2, '0');
        const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;

        return formattedDate;
    }
    const handleNewTask = async(e) => {
        console.log(e);
        e.dueDate = convertDate(e.dueDate);
        if(e.updated){
            let vol = data;
            vol[e.index] = {
                'task': e.title,'description':e.description,'status':'open','dueDate':e.dueDate
            };
            let response = await axios.put(`http://localhost:8080/api/update-task/${e.id}`,{
                'task': e.title,'description':e.description,'status':'open','dueDate':e.dueDate
            })
            console.log(response);
            try {
                let data = await axios.get("http://localhost:8080/api/all-tasks");
                if(data.data){
                    setData(data.data);
                }
            } catch (error) {
                console.error(error);
            }
        }else{
            let obj = {'task': e.title,'description':e.description,'status':'open','dueDate':e.dueDate};
            let val = data.push(obj);
            console.log(data, val);
            let response = await axios.post("http://localhost:8080/api/create-task",{
                'task': e.title,'description':e.description,'status':'open','dueDate':e.dueDate
            })
            console.log(response);
            try {
                let data = await axios.get("http://localhost:8080/api/all-tasks");
                if(data.data){
                    setData(data.data);
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
    const checkDateStatus = (dateString) => {
        const [day, month, year] = dateString.split('/').map(Number);
        return new Date(year, month - 1, day);
    };
    
    const sortRows = (mode, columnName) => {
        let sortedData = [...data];
    
        if (columnName === 'dueDate') {
            sortedData.sort((a, b) => {
                const dateA = checkDateStatus(a[columnName]);
                const dateB = checkDateStatus(b[columnName]);
    
                if (mode === 'asc') {
                    return dateA - dateB;
                } else if (mode === 'desc') {
                    return dateB - dateA;
                }
                return 0;
            });
        } else {
            sortedData.sort((a, b) => {
                if (mode === 'asc') {
                    return a[columnName] > b[columnName] ? 1 : -1;
                } else if (mode === 'desc') {
                    return a[columnName] < b[columnName] ? 1 : -1;
                }
                return 0;
            });
        }
    
        setData(sortedData);
    };
    const handleEditTask = (e, f) => {
        console.log(e, f);
        setShowCreateTask(true);
        e['index'] = f;
        setUpdateTask(e);
    }
    const handleFilter = (mode) => {
        let x = mode;
        setOpenFilter(false);
        sortRows('asc',x);
        x = '';
    }
    useEffect(()=>{
            const callFunc = async ()=>{
                try {
                    let data = await axios.get("http://localhost:8080/api/all-tasks");
                    if(data.data){
                        setData(data.data);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
            callFunc()
    },[]);
    return (
        <div>
            <div>
                <div style={{textAlign: "center", marginTop: "2rem"}}>
                    <button onClick={openCreateTaskModal} className="createNewTaskButton">Create a new task</button>
                </div>
            </div>
            {
                openFilter && (
                    <div style={{position: "fixed", background: "aliceblue", padding: "10px", right: "4%", top: "14%", height: "16vh", width: (window.innerWidth>760)?"16vw":"32vw",boxShadow: "rgba(0, 0, 0, 0.2) 0px 4px 8px 0px, rgba(0, 0, 0, 0.19) 0px 6px 3px 0px"}}>
                        <div>
                            <div style={{display: "flex", alignItems: 'center', justifyContent: 'space-between', marginBottom: "0.5rem"}}>
                                <span style={{fontSize: "18px", fontWeight: "600"}}>Filter</span>
                                <span><img onClick={()=>setOpenFilter(false)} src="/assets/close.svg" style={{height: "13px", cursor: "pointer"}} alt="" /></span>
                            </div>
                            <div style={{display: "flex", flexDirection: "column", height: "13vh", justifyContent: "space-evenly"}}>
                                <span onClick={()=>handleFilter('status')} style={{fontSize: "14px", cursor: "pointer", padding: "7px"}} className="filter_first">Completion Status</span>
                                <span onClick={()=>handleFilter('dueDate')} style={{fontSize: "14px", cursor:"pointer", padding: "7px"}} className="filter_second">Due Date (Earliest First)</span>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                data.length===0 ? (
                    <>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", marginTop: "2rem"}}>
                        <img src="/assets/NoData.jpg" style={{height: "200px"}} alt="" />
                        <span style={{textAlign: "center"}}>No tasks created</span>
                    </div>
                    </>
                ) : (
                    <>
                    <div style={{display:'flex', flexDirection:'column', height: '65vh', justifyContent:'end'}}>
                <div style={{marginBottom:'1rem', display:'flex', justifyContent:"end"}}>
                    <img src="/assets/filter.svg" onClick={()=>setOpenFilter(true)} style={{height: (window.innerWidth>760)?"28px":"20px", cursor: "pointer", flex: (window.innerWidth>760) ? "0.1" : "0"}} alt="" />
                    <div style={{flex:"0.07"}}></div>
                </div>
                <Table tableData={data} editTask={handleEditTask} />
            </div></>
                )
            }
            {
                showCreateTask && (
                    <div style={{position: "fixed",height: "100%", width:"100%",background:"rgb(115 111 111 / 50%)", zIndex:9, top:"0",left:"0"}}>
                        <div style={{position: "fixed", height: (window.innerWidth > 760) ? "35%" : "44%", width: (window.innerWidth > 760) ? "50%" : "85%", borderRadius: "10px", left: (window.innerWidth>760)?"25%":"2%", top: "22%", zIndex: 999, background: "white", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", margin: "10px", padding: "10px"}}>
                            <CreateTask closeCreateTaskModal={closeCreateTaskModal} savedTask={handleNewTask} updateTask={updateTask} />
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default List;