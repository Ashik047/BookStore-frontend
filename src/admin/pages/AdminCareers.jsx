import React from 'react'
import AdminHeader from '../components/AdminHeader'
import Footer from '../../components/Footer'
import OffCanvas from '../components/OffCanvas'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import { addJobApi, deleteJobApi, getAllJobApplicationApi, getAllJobsApi } from '../../services/allApi'
import { useEffect } from 'react'
import { Link } from "react-router-dom";
import { serverUrl } from '../../services/serverURL'

const AdminCareers = () => {
    const [activeTab, setActiveTab] = useState("jobPosts");
    const [modalStatus, setModalStatus] = useState(false);
    const [allJobs, setAllJobs] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const activeTabStyle = "text-blue-600 bg-white border border-gray-300 px-2 py-0.5 hover:cursor-pointer";
    const inactiveTabStyle = "bg-gray-100 text-black px-2 py-0.5 hover:cursor-pointer";
    const [rerender, setRerender] = useState(true);
    const [allApplications, setAllApplications] = useState([]);
    const [jobDetails, setJobDetails] = useState({
        title: "",
        location: "",
        jType: "",
        salary: "",
        qualification: "",
        experience: "",
        description: ""
    });
    const handleFormData = (e) => {
        const [name, value] = [e.target.name, e.target.value];
        setJobDetails(prev => ({ ...prev, [name]: value }));
    }
    const handleReset = () => {
        setJobDetails({
            title: "",
            location: "",
            jType: "",
            salary: "",
            qualification: "",
            experience: "",
            description: ""
        });
    };
    const handleClose = () => {
        setModalStatus(false);
        handleReset();
    };
    const handleSubmit = async () => {
        const { title, location, jType, salary, qualification, experience, description } = jobDetails;
        if (!title || !location || !jType || !salary || !qualification || !experience || !description) {
            toast.info("Please fill the form completely");
        } else {
            const result = await addJobApi({ title, location, jType, salary, qualification, experience, description });
            if (result.status == 200) {
                toast.success("Job posted successfully");
                handleClose();
                // getAllJobs(searchKey);
                setRerender(!rerender);
            } else if (result.status == 400) {
                toast.warning(result.response.data);
                handleReset();
            } else {
                toast.error("Something went wrong");
                handleReset();
            }
        }

    };
    const getAllJobs = async (searchKey) => {
        const result = await getAllJobsApi(searchKey);
        if (result.status == 200) {
            setAllJobs(result.data);
        }
    };

    const getAllApplications = async () => {
        const result = await getAllJobApplicationApi();
        if (result.status == 200) {
            setAllApplications(result.data);
        }
    }

    // console.log(allJobs);
    // console.log(allApplications);

    useEffect(() => {
        if (activeTab == "jobPosts") {
            getAllJobs(searchKey);

        } else if (activeTab == "applicants") {
            getAllApplications();
        }
    }, [searchKey, rerender, activeTab]);

    const handleJobDelete = async (id) => {
        const result = await deleteJobApi(id);
        console.log(result);

        if (result.status == 200) {
            toast.success(result.data);
            setRerender(!rerender);
        } else {
            toast.error("Something went wrong");
        }

    }
    return (
        <>
            <AdminHeader />
            <main className="grow flex py-6">
                <OffCanvas activeTabs="careers" />
                <section className='w-full py-6'>
                    <h2 className='text-center mt-6 font-bold text-2xl'>All Books</h2>
                    <div className="mt-4 flex justify-center">
                        <button onClick={() => setActiveTab("jobPosts")} className={activeTab === "jobPosts" ? activeTabStyle : inactiveTabStyle}>Job Posts</button>
                        <button onClick={() => setActiveTab("applicants")} className={activeTab === "applicants" ? activeTabStyle : inactiveTabStyle}>View Applicant</button>
                    </div>
                    {activeTab === "jobPosts" && <div>
                        <div className='flex justify-between px-3 items-center mt-4'>
                            <div>
                                <input value={searchKey} onChange={(e) => setSearchKey(e.target.value)} type="text" placeholder='Search Openings' className='border py-1 px-3 outline-0' />
                                <button className='bg-blue-700 py-1 px-3 hover:opacity-75 ms-2 text-white'>Search</button>
                            </div>
                            <button className='bg-green-600 rounded-md py-1 px-4 hover:opacity-75 text-sm text-white font-medium' onClick={() => setModalStatus(true)}>Add Job</button>
                        </div>
                        <div className='flex flex-col gap-6 mt-6'>
                            {allJobs?.length > 0 ?
                                allJobs?.map((job) => (
                                    <div key={job._id} className='w-full p-2 text-sm shadow text-left'>
                                        <div className='flex justify-between items-center'>
                                            <span className='text-xl font-bold mt-3 ms-4'>{job.title}</span>
                                            <button className='bg-red-700 hover:opacity-75 px-2 py-0.5 text-white' onClick={() => handleJobDelete(job._id)} >Delete</button>
                                        </div>
                                        <p className='mt-3 ms-4'><span className='font-bold text-'>Location: </span> {job.location}</p>
                                        <p className='mt-3 ms-4'><span className='font-bold text-'>Job Type: </span>{job.jType}</p>
                                        <p className='mt-3 ms-4'><span className='font-bold text-'>Salary: </span>{job.salary}</p>
                                        <p className='mt-3 ms-4'><span className='font-bold text-'>Qualification: </span>{job.qualification}</p>
                                        <p className='mt-3 ms-4'><span className='font-bold text-'>Experience: </span>{job.experience}</p>
                                        <p className='mt-3 ms-4'><span className='font-bold text-'>Description: </span>{job.description}</p>
                                    </div>
                                )) :
                                <p className='text-center text-2xl font-bold mt-6'>No Jobs Posted</p>
                            }
                        </div>
                    </div>}
                    {
                        activeTab == "applicants" && (
                            <table className='border-collapse table-auto text-center mt-8'>
                                <thead>
                                    <tr>
                                        <th className='w-[200px]'>Sl. </th>
                                        <th className='w-[200px]'>Job Title</th>
                                        <th className='w-[200px]'>Name</th>
                                        <th className='w-[200px]'>Email</th>
                                        <th className='w-[200px]'>Phone</th>
                                        <th className='w-[200px]'>Qualification</th>
                                        <th className='w-[200px]'>Resume</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allApplications?.length ?
                                            allApplications?.map((application, index) => (
                                                <tr key={application._id}>
                                                    <td className='pt-1.5'>{index + 1}</td>
                                                    <td className='pt-1.5'>{application.jobTitle}</td>
                                                    <td className='pt-1.5'>{application.fullname}</td>
                                                    <td className='pt-1.5'>{application.email}</td>
                                                    <td className='pt-1.5'>{application.phone}</td>
                                                    <td className='pt-1.5'>{application.qualification}</td>
                                                    <td className='pt-1.5'><Link className='text-blue-700' target='_blank' to={`${serverUrl}/pdfUploads/${application.resume}`}>resume</Link></td>
                                                </tr>
                                            )) :
                                            <p className='text-center mt-10 font-bold text-3xl'>No Job Applications</p>
                                    }
                                </tbody>
                            </table>
                        )
                    }
                    {/* modal */}
                    {modalStatus && (<section
                        className="relative z-10"
                        aria-labelledby="modal-title"
                        role="dialog"
                        aria-modal="true"
                    >
                        <div
                            className="fixed inset-0 bg-gray-500/75 transition-opacity"
                            aria-hidden="true"
                        ></div>

                        <div className="fixed top-[5%] z-10 w-screen overflow-y-auto left-0">
                            <div className="flex md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    {/* title */}
                                    <div className="bg-gray-900 p-4 flex  sm:px-6 justify-between">
                                        <h1 className="text-white text-2xl">Post A New Job</h1>
                                        <FontAwesomeIcon
                                            onClick={handleClose}
                                            icon={faXmark}
                                            className="text-white fa-2x"
                                        />
                                    </div>

                                    {/* body */}
                                    <div className="bg-white px-4 pt-3 pb-4 sm:p-6 sm:pb-4">
                                        <div className="">

                                            <div className="mb-3">
                                                <input
                                                    type="text"

                                                    placeholder="Job Title"
                                                    className="p-2 border border-gray-400 rounded placeholder-gray-500 w-full"
                                                    value={jobDetails.title}
                                                    id='title'
                                                    name='title'
                                                    onChange={handleFormData}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <input
                                                    type="text"

                                                    placeholder="Location"
                                                    className="p-2 border border-gray-400 rounded placeholder-gray-500 w-full"
                                                    value={jobDetails.location}
                                                    id='location'
                                                    name='location'
                                                    onChange={handleFormData}
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <input
                                                    type="text"

                                                    placeholder="Job Type"
                                                    className="p-2 border border-gray-400 rounded placeholder-gray-500 w-full"
                                                    value={jobDetails.jType}
                                                    id='jType'
                                                    name='jType'
                                                    onChange={handleFormData}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <input
                                                    type="text"

                                                    placeholder="Salary"
                                                    className="p-2 border border-gray-400 rounded placeholder-gray-500 w-full"
                                                    value={jobDetails.salary}
                                                    id='salary'
                                                    name='salary'
                                                    onChange={handleFormData}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <input
                                                    type="text"

                                                    placeholder="Qualifications"
                                                    className="p-2 border border-gray-400 rounded placeholder-gray-500 w-full"
                                                    value={jobDetails.qualification}
                                                    id='qualification'
                                                    name='qualification'
                                                    onChange={handleFormData}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <input
                                                    type="text"

                                                    placeholder="Experience"
                                                    className="p-2 border border-gray-400 rounded placeholder-gray-500 w-full"
                                                    value={jobDetails.experience}
                                                    id='experience'
                                                    name='experience'
                                                    onChange={handleFormData}
                                                />
                                            </div>

                                        </div>
                                        <div className="mb-3 w-full">
                                            <textarea


                                                placeholder="Description" rows={5}
                                                className="p-2 border border-gray-400 rounded placeholder-gray-500 w-full"
                                                value={jobDetails.description}
                                                id='description'
                                                name='description'
                                                onChange={handleFormData}
                                            ></textarea>
                                        </div>

                                    </div>
                                    {/* footer of modal */}
                                    <div className="bg-gray-200 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button

                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-white sm:ml-3 sm:w-auto hover:text-black hover:border hover:border-gray-300"
                                            onClick={handleSubmit}
                                        >
                                            Submit
                                        </button>
                                        <button

                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto hover:text-black"
                                            onClick={handleReset}
                                        >
                                            Reset
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>)}

                </section>
            </main>
            <ToastContainer theme='colored' autoClose={2000} position='top-center' />
            <Footer />
        </>
    )
}

export default AdminCareers