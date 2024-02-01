import React, { useState } from "react";
import "./List.css";
import Table from "./Table.jsx";
import CreateTask from "./CreateTask.jsx";

const List = () => {
    const [showCreateTask, setShowCreateTask] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const [updateTask, setUpdateTask] = useState({});
    const [data, setData] = useState([
        {'task': 'abc','description':'def','status':'completed','duedate':"23/03/2023"},
        {'task': 'abc','description':'def','status':'completed','duedate':'28/01/2024'},
        {'task': 'abc','description':'def','status':'open','duedate':'25/01/2023'},
        {'task': 'abc','description':'def','status':'completed','duedate':'29/03/2024'},
        {'task': 'abc','description':'def','status':'open','duedate':'24/02/2024'}
    ]);
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
    const handleNewTask = (e) => {
        console.log(e);
        e.duedate = convertDate(e.duedate);
        if(e.updated){
            let vol = data;
            vol[e.index] = {
                'task': e.title,'description':e.description,'status':'open','duedate':e.duedate
            };
            setData(vol);
        }else{
            let obj = {'task': e.title,'description':e.description,'status':'open','duedate':e.duedate};
            let val = data.push(obj);
            console.log(data, val);
            setData(data);
        }
    }
    const checkDateStatus = (dateString) => {
        const [day, month, year] = dateString.split('/').map(Number);
        return new Date(year, month - 1, day);
    };
    
    const sortRows = (mode, columnName) => {
        let sortedData = [...data];
    
        if (columnName === 'duedate') {
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
    return (
        <div>
            <div>
                <div style={{textAlign: "center"}}>
                    <button onClick={openCreateTaskModal} className="createNewTaskButton">Create a new task</button>
                </div>
            </div>
            {
                openFilter && (
                    <div style={{position: "fixed", background: "aliceblue", padding: "10px", left: "4%", top: "15%", height: "16vh", width: "16vw",boxShadow: "rgba(0, 0, 0, 0.2) 0px 4px 8px 0px, rgba(0, 0, 0, 0.19) 0px 6px 3px 0px"}}>
                        <div>
                            <div style={{display: "flex", alignItems: 'center', justifyContent: 'space-between', marginBottom: "0.5rem"}}>
                                <span style={{fontSize: "18px"}}>Filter</span>
                                <span><img onClick={()=>setOpenFilter(false)} src="/assets/close.svg" style={{height: "13px", cursor: "pointer"}} alt="" /></span>
                            </div>
                            <div style={{display: "flex", flexDirection: "column", height: "13vh", justifyContent: "space-evenly"}}>
                                <span onClick={()=>handleFilter('status')} style={{fontSize: "14px", cursor: "pointer"}}>Completion Status</span>
                                <span onClick={()=>handleFilter('duedate')} style={{fontSize: "14px", cursor:"pointer"}}>Due Date (Earliest First)</span>
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
                    <div style={{display:'flex', flexDirection:'column', height: '70vh', justifyContent:'end'}}>
                <div style={{marginBottom:'1rem', display:'flex'}}>
                    <div style={{flex:"0.07"}}></div>
                    <img src="/assets/filter.svg" onClick={()=>setOpenFilter(true)} style={{height: "18px", cursor: "pointer", flex:"0.1"}} alt="" />
                </div>
                <Table tableData={data} editTask={handleEditTask} />
            </div></>
                )
            }
            {
                showCreateTask && (
                    <div style={{position: "fixed",height: "100%", width:"100%",background:"rgb(115 111 111 / 50%)", zIndex:9, top:"0",left:"0"}}>
                        <div style={{position: "fixed", height: "35%", width: "50%", borderRadius: "10px", left: "25%", top: "22%", zIndex: 999, background: "white", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", margin: "10px", padding: "10px"}}>
                            <CreateTask closeCreateTaskModal={closeCreateTaskModal} savedTask={handleNewTask} updateTask={updateTask} />
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default List;