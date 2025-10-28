import React from 'react'
import { createContext } from 'react';
import { useState } from 'react';

export const searchKeyContext = createContext("");
export const adminProfileUpdateContext = createContext("");
export const userProfileUpdateContext = createContext("");

const ContextSearch = ({ children }) => {
    const [searchKey, setSearchKey] = useState("");
    const [adminProfileUpdateStatus, setAdminProfileUpdateStatus] = useState("");
    const [userProfileUpdateStatus, setUserProfileUpdateStatus] = useState("");
    return (
        <adminProfileUpdateContext.Provider value={{ adminProfileUpdateStatus, setAdminProfileUpdateStatus }} >
            <userProfileUpdateContext.Provider value={{ userProfileUpdateStatus, setUserProfileUpdateStatus }} >
                <searchKeyContext.Provider value={{ searchKey, setSearchKey }}>
                    {children}
                </searchKeyContext.Provider>
            </userProfileUpdateContext.Provider>
        </adminProfileUpdateContext.Provider>
    )
}

export default ContextSearch