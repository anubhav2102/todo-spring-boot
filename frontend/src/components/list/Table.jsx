import React, { useEffect, useState } from "react";

const Table = ({tableData, editTask}) => {
    const [data, setData] = useState([]);
    const checkDate = (e) => {
        const [day, month, year] = e.split('/');
        let parsedDate = new Date(year, month - 1, day);
        if (isNaN(parsedDate.getTime())) {
            console.error("Invalid date:", e);
            parsedDate = new Date(e);
            parsedDate = parsedDate.toString();
            // return false;
        }
        console.log(parsedDate)
        return new Date() > parsedDate;
    }
    const updateTask = (task ,index) => {
        console.log(task, index)
        editTask(task,index);
    }
    const markAsCompleted = (e) => {
        console.log(e)
        for(let i=0;i<data.length;i++){
            if(data[i]===e){
                data[i].status = 'completed';
                break;
            }
        }
        console.log(data);
        setData(data);
    }
    const deleteTask = (e) => {
        let idx = -1;
        for(let i=0;i<data.length;i++){
            if(data[i]===e){
                idx = i
                break;
            }
        }
        data.splice(idx, 1);
        console.log(data);
        setData(data);
    }
    const getColor = (e,f) => {
        if(checkDate(e) && f.status==='open'){
            return "red";
        }else if(!checkDate(e) && f.status==='open'){
            return "black";
        }else{
            return "#ada9a9";
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
    
    let columns = [{
        'key': 'task',
        'name': 'Task',
        'width': '10%'
    },{
        'key': 'description',
        'name': 'Description',
        'width': '10%'
    },{
        'key': 'status',
        'name': 'Status',
        'width': '10%'
    },{
        'key': 'duedate',
        'name': 'Due Date',
        'width': '10%'
    },{
        'key': 'actions',
        'name': 'Actions',
        'width': '10%'
    }];
    useEffect(() => {
        const check = () => {
            console.log(tableData)
            setData(tableData);
        };
        check();
    }, [tableData]);
    return (
        <div>
            <div style={{display: "flex", justifyContent: "center", height: '60vh'}}>
                <table style={{width: (window.innerWidth>760)?"80vw":"97vw", height: "40vh",boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px -1px 0 rgba(0, 0, 0, 0.19)"}}>
                    <thead>
                        <tr>
                            {
                                columns.map((auto, idx)=>{
                                    return (
                                    <td key={idx} style={{width: auto['width'], textAlign: 'center', fontWeight: '600', height: '50px', background: '#c6e1d3',boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                                        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                                        <span style={{fontSize: (window.innerWidth<760) ? "13px":"15px"}}>
                                        {auto['name']}
                                        </span>
                                        {
                                            (auto['name'] === 'Due Date' || auto['name'] === 'Status') && (
                                                <span style={{display:'flex', alignItems:'center' ,justifyContent:'center',flexDirection:'column', marginLeft:'10px'}}>
                                                    <img onClick={()=>sortRows('desc', auto['key'])} src="/assets/up-arrow.svg" style={{height:"8px", cursor:'pointer'}} alt="" />
                                                    <img onClick={()=>sortRows('asc', auto['key'])} src="/assets/down-arrow.svg" style={{height:'8px', cursor:'pointer'}} alt="" />
                                                </span>
                                            )
                                        }
                                        </div>
                                    </td>
                                    );
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, idx)=>{
                                return(
                                    <tr key={idx}>
                                        {
                                            columns.map((auto, index)=>{
                                                return (
                                                <td key={index} style={{width: auto['width'], textAlign: 'center', background: 'aliceblue',boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                                                    {
                                                        (auto.key==='actions') && (
                                                            <div style={{display: "flex", justifyContent: "center"}}>
                                                                <span style={{marginRight: '7px'}}>
                                                                {
                                                                    (item['status']!=='completed') && (
                                                                        <img onClick={()=>markAsCompleted(item)} src="/assets/checked.png" style={{height: "16px", cursor: "pointer"}} alt="" />
                                                                    )
                                                                }
                                                                </span>
                                                                <span><img onClick={()=>updateTask(item, idx)} src="/assets/edit.png" style={{height: "16px", marginRight: '7px', cursor: "pointer"}} alt="" /></span>
                                                                <span><img onClick={()=>deleteTask(item)} src="/assets/delete.png" style={{height: "16px", marginRight: '7px', cursor: "pointer"}} alt="" /></span>
                                                            </div>
                                                        )
                                                    }
                                                    {
                                                        (auto.key==='duedate') && (
                                                            <div style={{color: getColor(item[auto.key], item), fontSize: (window.innerWidth < 760) ? "12px" : "17px"}}>
                                                                {item[auto.key]}
                                                            </div>
                                                        )
                                                    }
                                                    {
                                                        (auto.key==='status') && (
                                                            <div style={{color: (item[auto.key]==='completed') ? "blue" : "black", fontSize: (window.innerWidth < 760) ? "13px" : "17px"}}>
                                                                {item[auto.key]}
                                                            </div>
                                                        )
                                                    }
                                                    {
                                                        (auto.key==='description') && (
                                                            <div style={{fontSize: (window.innerWidth < 760) ? "13px" : "17px"}}>
                                                                {item[auto.key]}
                                                            </div>
                                                        )
                                                    }
                                                    {
                                                        (auto.key==='task') && (
                                                            <div style={{fontSize: (window.innerWidth < 760) ? "13px" : "17px"}}>
                                                                {item[auto.key]}
                                                            </div>
                                                        )
                                                    }
                                                </td>
                                                );
                                            })
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;