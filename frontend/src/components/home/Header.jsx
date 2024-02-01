import React from "react";

const Header = () => {
    return (
        <div>
            <div style={{height:'25vh', display:'flex', alignItems:'center', justifyContent:'center',flexDirection:'column', background:"rgb(198, 225, 211)"}}>
                <h1 style={{fontSize: (window.innerWidth>760) ? "35px":"21px"}}>ToDo Application - CRUD and more!</h1>
                <h3 style={{marginTop:'1rem', fontWeight: (window.innerWidth<760) ? "500":"bold", fontSize: (window.innerWidth>760) ? "1.17em" : "16px", textAlign: "center"}}>Organize, prioritize, and conquer with my intuitive ToDo application</h3>
            </div>
        </div>
    );
}

export default Header;