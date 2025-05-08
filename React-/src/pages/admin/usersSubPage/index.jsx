import React from "react";
import Navbar from "../../../components/Admin_Navbar/Navbar"
import UsersSubPage from "./UsersSubPage"

function index() {
    return ( 
        <>
            <Navbar />
            <UsersSubPage />
        </>
     );
}

export default index;