import React from "react";

const Table = () => {
    const checkDate = (e) => {
    const [day, month, year] = e.split('/');
    const parsedDate = new Date(year, month - 1, day);
    if (isNaN(parsedDate.getTime())) {
        console.error("Invalid date:", e);
        return false;
    }
    return new Date() > parsedDate;
    }
    const columns = [{
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
    const data = [
        {'task': 'abc','description':'def','status':'open','duedate':"23/03/2023"},
        {'task': 'abc','description':'def','status':'completed','duedate':'28/01/2024'},
        {'task': 'abc','description':'def','status':'open','duedate':'25/01/2023'},
        {'task': 'abc','description':'def','status':'completed','duedate':'29/03/2024'},
        {'task': 'abc','description':'def','status':'open','duedate':'24/01/2024'}
    ];
    return (
        <div>
            <div style={{display: "flex", justifyContent: "center", height: '60vh'}}>
                <table style={{width: "80vw", height: "40vh",boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px -1px 0 rgba(0, 0, 0, 0.19)"}}>
                    <thead>
                        <tr>
                            {
                                columns.map((auto, idx)=>{
                                    return (
                                    <td key={idx} style={{width: auto['width'], textAlign: 'center', fontWeight: '600', height: '50px', background: '#c6e1d3',boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                                        {auto['name']}
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
                                                            <div>
                                                                <span><img src="/assets/checked.png" style={{height: "16px", marginRight: '7px', cursor: "pointer"}} alt="" /></span>
                                                                <span><img src="/assets/edit.png" style={{height: "16px", marginRight: '7px', cursor: "pointer"}} alt="" /></span>
                                                                <span><img src="/assets/delete.png" style={{height: "16px", marginRight: '7px', cursor: "pointer"}} alt="" /></span>
                                                            </div>
                                                        )
                                                    }
                                                    {
                                                        (auto.key==='duedate') && (
                                                            <div style={{color: (checkDate(item[auto.key])) ? "red" : "black"}}>
                                                                {item[auto.key]}
                                                            </div>
                                                        )
                                                    }
                                                    {
                                                        (auto.key==='status') && (
                                                            <div style={{color: (item[auto.key]==='completed') ? "blue" : "black"}}>
                                                                {item[auto.key]}
                                                            </div>
                                                        )
                                                    }
                                                    {
                                                        (auto.key==='description') && (
                                                            <div>
                                                                {item[auto.key]}
                                                            </div>
                                                        )
                                                    }
                                                    {
                                                        (auto.key==='task') && (
                                                            <div>
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