import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { addApplicationApi, getAllJobsApi } from '../../services/allApi'
import { ToastContainer, toast } from 'react-toastify';


const Career = () => {
    const [modalStatus, setModalStatus] = useState(false);
    const [allJobs, setAllJobs] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const [token, setToken] = useState("");
    const [applicationDetails, setApplicationDetails] = useState({
        fullname: "",
        email: "",
        phone: "",
        qualification: "",
        coverletter: "",
        resume: ""
    });
    const [jobTitle, setJobTitle] = useState("");
    // console.log(applicationDetails);

    const getAllJobs = async (searchKey) => {
        const result = await getAllJobsApi(searchKey);
        if (result.status == 200) {
            setAllJobs(result.data);
        }
    }
    const handleFormReset = () => {
        setApplicationDetails({
            fullname: "",
            email: "",
            phone: "",
            qualification: "",
            coverletter: "",
            resume: ""
        })
        document.getElementById("resume").value = "";
    }
    const handleFormData = (e) => {
        const [name, value] = [e.target.name, e.target.value];
        setApplicationDetails(prev => ({ ...prev, [name]: value }));
    }
    const handleFormSubmit = async (jobTitle) => {
        const { fullname, email, phone, qualification, coverletter, resume } = applicationDetails;
        if (!fullname || !email || !phone || !qualification || !coverletter || !resume || !jobTitle) {
            toast.info("Please fill the form completely");
        } else {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            };
            const reqBody = new FormData();
            for (let key in applicationDetails) {
                reqBody.append(key, applicationDetails[key]);
            }
            reqBody.append("jobTitle", jobTitle);
            const result = await addApplicationApi(reqBody, reqHeader);
            // console.log(result);
            handleFormReset();
            if (result.status == 200) {
                toast.success("Job Application Sent Successfully");
                setModalStatus(false);
            } else if (result.status == 400) {
                toast.warning(result.response.data);
            } else {
                toast.error("Something went wrong");
            }

        }

    }
    useEffect(() => {
        getAllJobs(searchKey);
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"));
        }
    }, [searchKey]);
    return (

        <>
            <Header />
            <main className='grow px-4 py-8 text-center'>
                <h1 className='font-bold text-4xl'>Careers</h1>
                <p className='text-justify text-sm mt-4'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet deleniti doloribus aliquam quaerat quod ratione, hic quos error ipsa unde eaque non officiis soluta quasi? Aliquid porro vitae neque deserunt!</p>
                <section>
                    <h2 className='mt-8 text-2xl font-bold'>Current Openings</h2>
                    <div className='text-center mt-4'>
                        <input type="text" placeholder='Search Openings' className='border py-1 px-3 outline-0' onChange={(e) => setSearchKey(e.target.value)} value={searchKey} />
                        <button className='bg-blue-700 py-1 px-3 hover:opacity-75 ms-2 text-white'>Search</button>
                    </div>
                    {
                        allJobs?.length ?
                            allJobs?.map((job) => (
                                <div key={job._id} className='w-full p-2 text-sm shadow text-left'>
                                    <div className='flex justify-between items-center'>
                                        <span className='mt-2 ms-4 font-bold text-lg'>{job.title}</span>
                                        <button className='bg-blue-700 hover:opacity-75 px-2 py-0.5 text-white' onClick={() => { setModalStatus(true); setJobTitle(job.title); }} >Apply</button>
                                    </div>
                                    <p className='mt-3 ms-4'><span className='font-bold text-'>Location: </span>{job.location}</p>
                                    <p className='mt-3 ms-4'><span className='font-bold text-'>Job Type: </span>{job.jType}</p>
                                    <p className='mt-3 ms-4'><span className='font-bold text-'>Salary: </span>{job.salary}</p>
                                    <p className='mt-3 ms-4'><span className='font-bold text-'>Qualification: </span>{job.qualification}</p>
                                    <p className='mt-3 ms-4'><span className='font-bold text-'>Experience: </span>{job.experience}</p>
                                    <p className='mt-3 ms-4'><span className='font-bold text-'>Description: </span>{job.description}</p>
                                </div>
                            )) :
                            <p className='mt-16 font-bold text-3xl'>No Jobs Posted</p>
                    }
                </section>

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

                    <div className="fixed top-[15%] z-10 w-screen overflow-y-auto">
                        <div className="flex md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                {/* title */}
                                <div className="bg-gray-900 p-4 flex  sm:px-6 justify-between">
                                    <h1 className="text-white text-2xl">Application form</h1>
                                    <FontAwesomeIcon
                                        onClick={() => { setModalStatus(false); handleFormReset(); setJobTitle(""); }}
                                        icon={faXmark}
                                        className="text-white fa-2x"
                                    />
                                </div>

                                {/* body */}
                                <div className="bg-white px-4 pt-3 pb-4 sm:p-6 sm:pb-4">
                                    <div className="grid grid-cols-2">
                                        <div className="p-3">
                                            <div className="mb-3">
                                                <input
                                                    type="text"
                                                    value={applicationDetails.fullname}
                                                    name='fullname'
                                                    id='fullname'
                                                    onChange={handleFormData}
                                                    placeholder="Full Name"
                                                    className="p-2 border border-gray-400 rounded placeholder-gray-500 w-full"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <input
                                                    type="text"
                                                    value={applicationDetails.email}
                                                    name='email'
                                                    id='email'
                                                    onChange={handleFormData}
                                                    placeholder="Email Id"
                                                    className="p-2 border border-gray-400 rounded placeholder-gray-500 w-full"
                                                />
                                            </div>
                                        </div>

                                        <div className="p-3">
                                            <div className="mb-3">
                                                <input
                                                    type="text"
                                                    value={applicationDetails.qualification}
                                                    name='qualification'
                                                    id='qualification'
                                                    onChange={handleFormData}
                                                    placeholder="Qualification"
                                                    className="p-2 border border-gray-400 rounded placeholder-gray-500 w-full"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <input
                                                    type="text"
                                                    value={applicationDetails.phone}
                                                    name='phone'
                                                    id='phone'
                                                    onChange={handleFormData}
                                                    placeholder="Phone"
                                                    className="p-2 border border-gray-400 rounded placeholder-gray-500 w-full"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3 px-3 w-full">
                                        <textarea

                                            value={applicationDetails.coverletter}
                                            name='coverletter'
                                            id='coverletter'
                                            onChange={handleFormData}
                                            placeholder="Cover Letter"
                                            className="p-2 border border-gray-400 rounded placeholder-gray-500 w-full"
                                        ></textarea>
                                    </div>
                                    <div className="mb-3 px-3 w-full">
                                        <p className="text-gray-400">Resume</p>
                                        <input
                                            type="file"
                                            name='resume'
                                            id='resume'
                                            onChange={(e) => setApplicationDetails(prev => ({ ...prev, resume: e.target.files[0] }))}
                                            className=" border border-gray-400 rounded placeholder-gray-500 w-full file:bg-gray-400 file:p-2 file:text-white"
                                        />
                                    </div>
                                </div>
                                {/* footer of modal */}
                                <div className="bg-gray-200 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        onClick={() => handleFormSubmit(jobTitle)}
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-white sm:ml-3 sm:w-auto hover:text-black hover:border hover:border-gray-300"
                                    >
                                        Submit
                                    </button>
                                    <button
                                        onClick={handleFormReset}
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto hover:text-black"
                                    >
                                        Reset
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>)}

            </main>
            <ToastContainer theme='colored' autoClose={2000} position='top-center' />
            <Footer />
        </>

    )
}

export default Career