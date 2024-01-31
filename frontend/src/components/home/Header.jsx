import React from "react";

const Header = () => {
    return (
        <div>
            <div style={{height:'25vh', display:'flex', alignItems:'center', justifyContent:'center',flexDirection:'column'}}>
                <h1>ToDo Application - CRUD and more!</h1>
                <h3 style={{marginTop:'1rem'}}>Organize, prioritize, and conquer with my intuitive ToDo application</h3>
            </div>
        </div>
    );
}

export default Header;