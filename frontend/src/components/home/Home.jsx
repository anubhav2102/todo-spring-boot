import React from "react";
import List from "../list/List.jsx";
import Header from "./Header.jsx";

const Home = () => {
    return (
        <div>
            <div>
                <Header/>
            </div>
            <div>
                <List/>
            </div>
        </div>
    );
};

export default Home;