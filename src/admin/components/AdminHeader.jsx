import React from 'react'
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem("Existing User");
        sessionStorage.removeItem("token");
        navigate("/");
    }
    return (
        <header>
            <div className='flex justify-between items-center px-4 py-2'>
                <div>
                    <img src="https://openclipart.org/download/275692/1489798288.svg" alt="icon" className='w-[50px] aspect-square inline-block' />
                    <h2 className='inline-block ms-3'>Book Store</h2>
                </div>
                <button onClick={handleLogout} className='bg-red-600 hover:opacity-75 text-white px-4 py-1 rounded-md cursor-pointer'>Logout</button>
            </div>

            <div className='bg-gray-900 text-white py-1 text-sm'><marquee behaviour="" direction="left"><p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. </p></marquee></div>
        </header>
    )
}

export default AdminHeader