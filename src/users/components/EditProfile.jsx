import { faPen, faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useState } from 'react'
import { updateUserProfileApi } from '../../services/allApi'
import { useEffect } from 'react'
import { serverUrl } from '../../services/serverURL'
import { ToastContainer, toast } from 'react-toastify'
import { userProfileUpdateContext } from '../../context/ContextSearch'
import { useContext } from 'react'

const EditProfile = () => {
    const [offCanvasStatus, setOffCanvasStatus] = useState(false);
    const [token, setToken] = useState("");
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        profile: "",
        bio: ""
    });
    const { userProfileUpdateStatus, setUserProfileUpdateStatus } = useContext(userProfileUpdateContext);

    const [profilePreview, setProfilePreview] = useState("");
    const [existingProfilePic, setExistingProfilePic] = useState("");
    const [googlePic, setGooglePic] = useState(false);
    const handleUserFormData = (e) => {
        const [name, value] = [e.target.name, e.target.value];
        setUserDetails(prev => ({ ...prev, [name]: value }));
    }
    const handleUserFileUpload = (e) => {
        setUserDetails(prev => ({ ...prev, profile: e.target.files[0] }));
        if (e.target.files[0] != "") {
            const url = URL.createObjectURL(e.target.files[0])
            setProfilePreview(url);
        }
    }
    const handleReset = () => {
        const user = JSON.parse(sessionStorage.getItem("Existing User"));
        setUserDetails({ email: user.email, password: user.password, confirmPassword: user.password, bio: user.bio });
        setExistingProfilePic(user.profile);
        setProfilePreview("");
    }
    const handleUpdate = async () => {
        const { email, password, confirmPassword, profile, bio } = userDetails;
        if (!email || !password || !confirmPassword) {
            toast.info("Please fill the form");
            const user = JSON.parse(sessionStorage.getItem("Existing User"));
            setUserDetails({ email: user.email, password: user.password, confirmPassword: user.password, bio: user.bio });
            setExistingProfilePic(user.profile);
        } else {
            if (password === confirmPassword) {

                if (profilePreview) {
                    const reqBody = new FormData();
                    for (let key in userDetails) {
                        reqBody.append(key, userDetails[key]);
                    }
                    const reqHeader = {
                        Authorization: `Bearer ${token}`
                    };
                    const result = await updateUserProfileApi(reqBody, reqHeader);
                    console.log(result);
                    if (result.status === 200) {
                        setUserProfileUpdateStatus(prev => !prev);
                        sessionStorage.setItem("Existing User", JSON.stringify(result.data));
                        toast.success("Profile updated successfully");
                    } else {
                        toast.error("Something went wrong");
                        const user = JSON.parse(sessionStorage.getItem("Existing User"));
                        setUserDetails({ email: user.email, password: user.password, confirmPassword: user.password, bio: user.bio });
                        setExistingProfilePic(user.profile);
                    }
                } else {

                    const reqHeader = {
                        Authorization: `Bearer ${token}`
                    };
                    const result = await updateUserProfileApi({ email, password, profile: existingProfilePic, bio }, reqHeader);
                    console.log(result);
                    if (result.status === 200) {
                        setUserProfileUpdateStatus(prev => !prev);
                        sessionStorage.setItem("Existing User", JSON.stringify(result.data));
                        toast.success("Profile updated successfully");
                    } else {
                        toast.error("Something went wrong");
                        const user = JSON.parse(sessionStorage.getItem("Existing User"));
                        setUserDetails({ email: user.email, password: user.password, confirmPassword: user.password, bio: user.bio });
                        setExistingProfilePic(user.profile);
                    }
                }

            } else {
                toast.warning("Passwords do not match.");
                const user = JSON.parse(sessionStorage.getItem("Existing User"));
                setUserDetails({ email: user.email, password: user.password, confirmPassword: user.password, bio: user.bio });
                setExistingProfilePic(user.profile);
            }
        }
    }
    const handleCloseCanvas = () => {
        handleReset();
        setOffCanvasStatus(false);
    }
    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"));
            const user = JSON.parse(sessionStorage.getItem("Existing User"));
            setUserDetails({ email: user.email, password: user.password, confirmPassword: user.password, bio: user.bio });
            setExistingProfilePic(user.profile);
            if (user.profile.startsWith("https")) {
                setGooglePic(true);
            }
        }
    }, [userProfileUpdateStatus]);
    return (
        <div>
            <div>
                <button onClick={() => (setOffCanvasStatus(true))} className='me-4 bg-blue-700 text-white hover:opacity-75 px-4 py-1 rounded-md'><FontAwesomeIcon icon={faPenToSquare} />Edit</button>
            </div>
            {offCanvasStatus && <div>
                <div
                    className="fixed inset-0 bg-gray-500/75 transition-opacity"
                    aria-hidden="true"
                ></div>
                <div className='w-90 h-full bg-white fixed top-0 left-0 z-50'>
                    <div className='bg-gray-900 flex justify-between px-3 py-4 text-white text-2xl items-center'>
                        <h2>Edit User Profile</h2>
                        <FontAwesomeIcon onClick={handleCloseCanvas} icon={faXmark} />
                    </div>

                    <form className='px-4 py-6 flex flex-col gap-6 mt-6'>
                        <input type="file" id="profile" name="profile" onChange={handleUserFileUpload} className="hidden" />
                        <label htmlFor="profile" className='block w-full text-center relative'>
                            {existingProfilePic == "" ? <img src={profilePreview ? profilePreview : "https://static.vecteezy.com/system/resources/previews/019/879/186/large_2x/user-icon-on-transparent-background-free-png.png"} alt="upload image" className="w-[150px] aspect-square rounded-[50%] object-cover mt-6 cursor-pointer inline-block" /> :
                                <img src={profilePreview ? profilePreview : googlePic ? existingProfilePic : `${serverUrl}/uploads/${existingProfilePic}`} alt="upload image" className="w-[150px] aspect-square rounded-[50%] object-cover mt-6 cursor-pointer inline-block" />
                            }
                            <FontAwesomeIcon icon={faPen} className='absolute bottom-0 right-24 bg-amber-400 rounded-[50%] text-white p-1.5 cursor-pointer' />
                        </label>
                        <input onChange={handleUserFormData} value={userDetails.email} type="text" name='email' id='email' placeholder='Email' className='border px-2 py-1 rounded-md' />
                        <input onChange={handleUserFormData} value={userDetails.password} type="password" name='password' id='password' placeholder='Password' className='border px-2 py-1 rounded-md' />
                        <input onChange={handleUserFormData} value={userDetails.confirmPassword} type="password" name='confirmPassword' id='confirmPassword' placeholder='Confirm Password' className='border px-2 py-1 rounded-md' />
                        <textarea onChange={handleUserFormData} value={userDetails.bio} name="bio" id="bio" placeholder='Bio' rows={5} className='border px-2 py-1 rounded-md'></textarea>
                        <div className='flex gap-3 justify-end'>
                            <button onClick={handleReset} type='button' className='bg-red-600 hover:opacity-75 text-white px-3 py-1 rounded'>Reset</button>
                            <button onClick={handleUpdate} type='button' className='bg-green-600 hover:opacity-75 text-white px-3 py-1 rounded'>Update</button>
                        </div>
                    </form>

                </div>
            </div>}
            <ToastContainer position='top-center' autoClose={2000} theme='colored' />
        </div>
    )
}

export default EditProfile