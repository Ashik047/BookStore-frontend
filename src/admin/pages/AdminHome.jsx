import React from 'react'
import AdminHeader from '../components/AdminHeader'
import Footer from '../../components/Footer'
import OffCanvas from '../components/OffCanvas'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faUsers } from '@fortawesome/free-solid-svg-icons'
import { BarChart, Bar, Legend, Tooltip, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie } from "recharts";

const AdminHome = () => {
    const data = [
        {
            "name": "Page A",
            "uv": 4000,
            "pv": 2400
        },
        {
            "name": "Page B",
            "uv": 3000,
            "pv": 1398
        },
        {
            "name": "Page C",
            "uv": 2000,
            "pv": 9800
        },
        {
            "name": "Page D",
            "uv": 2780,
            "pv": 3908
        },
        {
            "name": "Page E",
            "uv": 1890,
            "pv": 4800
        },
        {
            "name": "Page F",
            "uv": 2390,
            "pv": 3800
        },
        {
            "name": "Page G",
            "uv": 3490,
            "pv": 4300
        }
    ]
    const data01 = [
        {
            "name": "Group A",
            "value": 400
        },
        {
            "name": "Group B",
            "value": 300
        },
        {
            "name": "Group C",
            "value": 300
        },
        {
            "name": "Group D",
            "value": 200
        },
        {
            "name": "Group E",
            "value": 278
        },
        {
            "name": "Group F",
            "value": 189
        }
    ];
    const data02 = [
        {
            "name": "Group A",
            "value": 2400
        },
        {
            "name": "Group B",
            "value": 4567
        },
        {
            "name": "Group C",
            "value": 1398
        },
        {
            "name": "Group D",
            "value": 9800
        },
        {
            "name": "Group E",
            "value": 3908
        },
        {
            "name": "Group F",
            "value": 4800
        }
    ];
    return (
        <>
            <AdminHeader />
            <main className="grow flex">
                <OffCanvas activeTabs="home" />
                <div className='mt-6 p-4 w-full flex flex-col items-center gap-14'>
                    <div className='flex justify-evenly flex-wrap gap-16'>
                        <div className='bg-red-700 p-10 w-[250px] rounded-lg text-white'>
                            <div className='flex items-center gap-2'>
                                <FontAwesomeIcon icon={faBook} className='text-2xl' />
                                <div className='text-center'>
                                    <h3 className='text-xs'>Total Number of Books</h3>
                                    <p className='text-xl font-bold'>100+</p>
                                </div>
                            </div>
                        </div>
                        <div className='bg-green-700 p-10 w-[250px] rounded-lg text-white'>
                            <div className='flex items-center gap-2'>
                                <FontAwesomeIcon icon={faUsers} className='text-2xl' />
                                <div className='text-center'>
                                    <h3 className='text-xs'>Total Number of Users</h3>
                                    <p className='text-xl font-bold'>50+</p>
                                </div>
                            </div>
                        </div>
                        <div className='bg-blue-700 p-10 w-[250px] rounded-lg text-white'>
                            <div className='flex items-center gap-2'>
                                <FontAwesomeIcon icon={faBook} className='text-2xl' />
                                <div className='text-center'>
                                    <h3 className='text-xs'>Total Number of Employees</h3>
                                    <p className='text-xl font-bold'>20+</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-[50%] h-[400px] mx-auto'>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                responsive data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis width="auto" />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="pv" fill="#8884d8" />
                                <Bar dataKey="uv" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className='w-[50%] h-[400px] mx-auto'>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Tooltip />
                                <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius="50%" fill="#8884d8" />
                                <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius="60%" outerRadius="80%" fill="#82ca9d" label />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default AdminHome