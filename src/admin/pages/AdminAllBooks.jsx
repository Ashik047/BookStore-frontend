import React from 'react'
import AdminHeader from '../components/AdminHeader'
import Footer from '../../components/Footer'
import OffCanvas from '../components/OffCanvas'
import { useState } from 'react'
import { approveBookApi, getAllBooksAdminApi, getAllUserApi } from '../../services/allApi'
import { useEffect } from 'react'

const AdminAllBooks = () => {
    const [activeTab, setActiveTab] = useState("bookList");
    const activeTabStyle = "text-blue-600 bg-white border border-gray-300 px-2 py-0.5 hover:cursor-pointer";
    const inactiveTabStyle = "bg-gray-100 text-black px-2 py-0.5 hover:cursor-pointer";
    const [bookDetails, setBookDetails] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [tok, setTok] = useState("");

    const getAllBooks = async (token) => {
        // console.log(token);

        const reqHeader = {
            "Authorization": `Bearer ${token}`
        };
        const result = await getAllBooksAdminApi(reqHeader);
        // console.log(result);
        if (result.status == "200") {
            setBookDetails(result.data);
        }

    };
    const getAllUsers = async (token) => {
        // console.log(token);
        const reqHeader = {
            "Authorization": `Bearer ${token}`
        };
        const result = await getAllUserApi(reqHeader);
        // console.log(result);
        if (result.status == "200") {
            setAllUsers(result.data);
        }
    };
    useEffect(() => {

        if (sessionStorage.getItem("token")) {
            const token = sessionStorage.getItem("token");
            setTok(token);
            getAllBooks(token);
            getAllUsers(token);
        }
    }, []);

    const approveBook = async (data) => {
        const reqHeader = {
            "Authorization": `Bearer ${tok}`
        };
        const result = await approveBookApi(data, reqHeader);
        // console.log(result);
        if (result.status == "200") {
            getAllBooks(tok);
        }
    }

    return (
        <>
            <AdminHeader />
            <main className="grow flex py-6">
                <OffCanvas activeTabs="allBooks" />
                <section className='w-full py-6'>
                    <h2 className='text-center mt-6 font-bold text-2xl'>All Books</h2>
                    <div className="mt-4 flex justify-center">
                        <button onClick={() => setActiveTab("bookList")} className={activeTab === "bookList" ? activeTabStyle : inactiveTabStyle}>Book List</button>
                        <button onClick={() => setActiveTab("users")} className={activeTab === "users" ? activeTabStyle : inactiveTabStyle}>Users</button>
                    </div>
                    {activeTab === "bookList" && <div className='flex flex-wrap justify-start mt-6 gap-6'>
                        {bookDetails?.length ?
                            bookDetails?.map(book => (
                                <div key={book._id} className='flex flex-col items-center gap-0.5 p-3 shadow'>
                                    <img src={book.imageUrl} alt={book.title} className='w-[100px] aspect-5/6' />
                                    <p className='text-xs'>{book.author}</p>
                                    <p className='font-bold'>{book.title}</p>
                                    <p className='text-xs font-bold text-red-700'>${book.dPrice}</p>
                                    {
                                        book.status == "pending" ?
                                            <button className='text-xs bg-green-700 font-extrabold text-white hover:opacity-75 rounded-md px-3 py-1 mt-1' onClick={() => approveBook(book)}>Approve</button> : book.status == "approved" ?
                                                <p className='text-xs text-green-700 font-extrabold mt-1'>Approved</p> :
                                                <p className='text-xs text-red-700 font-extrabold mt-1'>Sold</p>
                                    }

                                </div>
                            )) :
                            <p>No Books</p>
                        }
                    </div>}
                    {activeTab === "users" && <div className='flex flex-wrap justify-start mt-6 gap-6'>
                        {allUsers?.length ?
                            allUsers?.map(user => (
                                <div key={user._id} className='p-6 shadow-lg w-[300px]'>
                                    <p className='font-bold text-sm'>User Id: <span>{user._id}</span></p>
                                    <p className='mt-2 text-sm'>Username: <span>{user.username}</span></p>
                                    <p className='text-sm'>Email: <span>{user.email}</span></p>
                                </div>
                            )) :
                            <p>No Users</p>
                        }

                    </div>}
                </section>
            </main>
            <Footer />
        </>
    )
}

export default AdminAllBooks