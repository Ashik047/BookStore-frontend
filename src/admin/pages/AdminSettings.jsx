import React from 'react'
import AdminHeader from '../components/AdminHeader'
import Footer from '../../components/Footer'
import OffCanvas from '../components/OffCanvas'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { updateAdminProfileApi } from '../../services/allApi'
import { useEffect } from 'react'
import { serverUrl } from '../../services/serverURL'
import { useContext } from 'react'
import { adminProfileUpdateContext } from '../../context/ContextSearch'

const AdminSettings = () => {
    const [adminDetails, setAdminDetails] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        profile: "",
        bio: ""
    });
    const [profilePreview, setProfilePreview] = useState("");
    const [existingProfilePic, setExistingProfilePic] = useState("");
    const [token, setToken] = useState("");
    const handleFormData = (e) => {
        const [name, value] = [e.target.name, e.target.value];
        setAdminDetails(prev => ({ ...prev, [name]: value }));
    }
    const { adminProfileUpdateStatus, setAdminProfileUpdateStatus } = useContext(adminProfileUpdateContext);
    const handleFileUpload = (e) => {
        setAdminDetails(prev => ({ ...prev, profile: e.target.files[0] }));
        if (e.target.files[0] != "") {
            const url = URL.createObjectURL(e.target.files[0])
            setProfilePreview(url);
        }
    }
    const handleReset = () => {
        const user = JSON.parse(sessionStorage.getItem("Existing User"));
        setAdminDetails({ email: user.email, password: user.password, confirmPassword: user.password });
        setExistingProfilePic(user.profile);
        setProfilePreview("");
    }
    const handleUpdate = async () => {
        const { email, password, confirmPassword, profile } = adminDetails;
        if (!email || !password || !confirmPassword) {
            toast.info("Please fill the form");
            const user = JSON.parse(sessionStorage.getItem("Existing User"));
            setAdminDetails({ email: user.email, password: user.password, confirmPassword: user.password });
            setExistingProfilePic(user.profile);
        } else {
            if (password === confirmPassword) {

                if (profilePreview) {
                    const reqBody = new FormData();
                    for (let key in adminDetails) {
                        reqBody.append(key, adminDetails[key]);
                    }
                    const reqHeader = {
                        Authorization: `Bearer ${token}`
                    };
                    const result = await updateAdminProfileApi(reqBody, reqHeader);
                    // console.log(result);
                    if (result.status == 200) {
                        sessionStorage.setItem("Existing User", JSON.stringify(result.data));
                        setAdminProfileUpdateStatus(prev => !prev);
                        toast.success("Profile updated successfully");
                    } else {
                        const user = JSON.parse(sessionStorage.getItem("Existing User"));
                        setAdminDetails({ email: user.email, password: user.password, confirmPassword: user.password });
                        setExistingProfilePic(user.profile);
                        toast.error("Something went wrong");
                    }
                } else {

                    const reqHeader = {
                        Authorization: `Bearer ${token}`
                    };
                    const result = await updateAdminProfileApi({ email, password, profile: existingProfilePic }, reqHeader);
                    // console.log(result);
                    if (result.status == 200) {
                        sessionStorage.setItem("Existing User", JSON.stringify(result.data));
                        setAdminProfileUpdateStatus(prev => !prev);
                        toast.success("Profile updated successfully");
                    } else {
                        const user = JSON.parse(sessionStorage.getItem("Existing User"));
                        setAdminDetails({ email: user.email, password: user.password, confirmPassword: user.password });
                        setExistingProfilePic(user.profile);
                        toast.error("Something went wrong");
                    }
                }

            } else {
                toast.warning("Passwords do not match.");
                const user = JSON.parse(sessionStorage.getItem("Existing User"));
                setAdminDetails({ email: user.email, password: user.password, confirmPassword: user.password });
                setExistingProfilePic(user.profile);
            }
        }
    }
    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"));
            const user = JSON.parse(sessionStorage.getItem("Existing User"));
            setAdminDetails({ email: user.email, password: user.password, confirmPassword: user.password });
            setExistingProfilePic(user.profile);
        }
    }, [adminProfileUpdateStatus]);
    return (
        <>
            <AdminHeader />
            <main className="grow flex">
                <OffCanvas activeTabs="settings" />
                <section className='w-full p-4'>
                    <h2 className='text-center font-bold text-2xl mt-4'>Settings</h2>
                    <div className='md:grid grid-cols-2 gap-4'>
                        <div>
                            <p className='text-sm mt-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor quos vitae perspiciatis cum recusandae molestiae neque maxime ipsa at, modi sequi, harum porro, iusto voluptatum possimus doloremque impedit nemo. Delectus.</p>
                            <p className='text-sm mt-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor quos vitae perspiciatis cum recusandae molestiae neque maxime ipsa at, modi sequi, harum porro, iusto voluptatum possimus doloremque impedit nemo. Delectus.</p>
                        </div>
                        <form className='px-4 py-6 flex flex-col gap-6 mt-6 bg-blue-200 rounded-lg'>
                            <input type="file" id="profile" name="profile" className="hidden" onChange={handleFileUpload} />
                            <label htmlFor="profile" className='block w-full text-center relative'>
                                {existingProfilePic == "" ? <img src={profilePreview ? profilePreview : "https://static.vecteezy.com/system/resources/previews/019/879/186/large_2x/user-icon-on-transparent-background-free-png.png"} alt="upload image" className="w-[150px] aspect-square rounded-[50%] object-cover mt-6 cursor-pointer inline-block" /> :
                                    <img src={profilePreview ? profilePreview : `${serverUrl}/uploads/${existingProfilePic}`} alt="upload image" className="w-[150px] aspect-square rounded-[50%] object-cover mt-6 cursor-pointer inline-block" />
                                }
                                <FontAwesomeIcon icon={faPen} className='absolute bottom-0 right-42 bg-amber-400 rounded-[50%] text-white p-1.5 cursor-pointer' />
                            </label>
                            <input value={adminDetails.email} onChange={handleFormData} type="email" name='email' id='email' placeholder='Email' className='border px-2 py-1 rounded-md bg-white' />
                            <input value={adminDetails.password} onChange={handleFormData} type="password" name='password' id='password' placeholder='Password' className='border px-2 py-1 rounded-md bg-white' />
                            <input value={adminDetails.confirmPassword} onChange={handleFormData} type="password" name='confirmPassword' id='confirmPassword' placeholder='Confirm Password' className='border px-2 py-1 rounded-md bg-white' />
                            <div className='flex gap-3 justify-end'>
                                <button type='button' onClick={handleReset} className='bg-red-600 hover:opacity-75 text-white px-3 py-1 rounded'>Reset</button>
                                <button type='button' onClick={handleUpdate} className='bg-green-600 hover:opacity-75 text-white px-3 py-1 rounded'>Update</button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
            <ToastContainer theme='colored' position='top-center' autoClose={2000} />
            <Footer />
        </>
    )
}

export default AdminSettings