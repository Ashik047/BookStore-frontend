import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom"
import { serverUrl } from '../../services/serverURL';
import { adminProfileUpdateContext } from '../../context/ContextSearch';

const OffCanvas = ({ activeTabs = "home" }) => {
    const [activeTab, setActiveTab] = useState(activeTabs);
    const [adminDetails, setAdminDetails] = useState({
        username: "",
        profile: ""
    })
    const activeTabStyle = "text-blue-700 cursor-pointer"
    const { adminProfileUpdateStatus } = useContext(adminProfileUpdateContext);


    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            const user = JSON.parse(sessionStorage.getItem("Existing User"));
            setAdminDetails({ username: user.username, profile: user.profile });
        }
    }, [adminProfileUpdateStatus]);
    return (
        <div className='w-50 bg-white text-black '>
            <img src={adminDetails.profile == "" ? "https://cdn-icons-png.flaticon.com/512/9187/9187604.png" : `${serverUrl}/uploads/${adminDetails.profile}`} alt="profile icon" className='w-[60px] aspect-square mt-8 block mx-auto rounded-[50%] object-cover' />
            <p className='text-center mt-3'>{adminDetails.username}</p>
            <ul className='p-6 mt-4 ms-3'>
                <li>
                    <Link to={"/admin-home"}>
                        <button onClick={() => setActiveTab("home")} className={activeTab === "home" ? activeTabStyle : "cursor-pointer"}>Home</button>
                    </Link>
                </li>
                <li>
                    <Link to={"/admin-allbooks"}>
                        <button onClick={() => setActiveTab("allBooks")} className={activeTab === "allBooks" ? activeTabStyle : "cursor-pointer"}>All Books</button>
                    </Link>
                </li>
                <li>
                    <Link to={"/admin-careers"} >
                        <button onClick={() => setActiveTab("careers")} className={activeTab === "careers" ? activeTabStyle : "cursor-pointer"}>Careers</button>
                    </Link>
                </li>
                <li>
                    <Link to={"/admin-settings"}>
                        <button onClick={() => setActiveTab("settings")} className={activeTab === "settings" ? activeTabStyle : "cursor-pointer"}>Settings</button>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default OffCanvas