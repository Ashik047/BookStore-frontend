import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from "react-router-dom"
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { userProfileUpdateContext } from "../../context/ContextSearch"
import { serverUrl } from '../../services/serverURL'

const Header = () => {
    const [menuStatus, setMenuStatus] = useState(false);
    const [dropdownStatus, setDropdownStatus] = useState(false);
    const [token, setToken] = useState("");
    const { userProfileUpdateStatus } = useContext(userProfileUpdateContext);
    const [userDetails, setUserDetails] = useState({
        profile: ""
    });
    const [googlePic, setGooglePic] = useState(false);
    useEffect(() => {
        const token1 = sessionStorage.getItem("token");
        if (token1) {
            // console.log(token1);
            setToken(token1);
            const user = JSON.parse(sessionStorage.getItem("Existing User"));
            setUserDetails({ profile: user.profile });
            if (user.profile.startsWith("https")) {
                setGooglePic(true);
            }
        }
    }, [userProfileUpdateStatus]);
    const navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.removeItem("Existing User");
        sessionStorage.removeItem("token");
        navigate("/");
    }
    return (
        <>
            <header className='flex flex-nowrap justify-between items-center p-3'>
                <img src="https://openclipart.org/download/275692/1489798288.svg" alt="icon" className='w-[50px] aspect-square' />
                <span className='font-bold text-3xl sm:transform sm:translate-x-20 cursor-pointer'>BookStore</span>
                <div className='text-xl hidden sm:flex items-center'>
                    <a href="" target='_blank' className='me-2'><FontAwesomeIcon icon={faFacebook} /></a>
                    <a href="" target='_blank' className='me-2'><FontAwesomeIcon icon={faTwitter} /></a>
                    <a href="" target='_blank' className='me-2'><FontAwesomeIcon icon={faInstagram} /></a>
                    {!token ? <Link to={"/login"} className='border rounded-lg p-1.5 hover:text-white hover:bg-black'><button className='font-bold cursor-pointer'><FontAwesomeIcon icon={faUser} className='me-1' />Login</button></Link> :
                        <div className='inline relative'>
                            <button onClick={() => setDropdownStatus(!dropdownStatus)}><img src={userDetails.profile == "" ? "https://cdn-icons-png.flaticon.com/512/9187/9187604.png" : googlePic ? userDetails.profile : `${serverUrl}/uploads/${userDetails.profile}`} alt="icon" className='w-[40px] aspect-square rounded-[50%] object-cover' /></button>
                            {dropdownStatus && <div className='w-[100px] px-3 py-1 absolute z-20 bg-white text-center text-sm top-[145%] -right-2.5 font-semibold shadow shadow-black'>
                                <Link to={"/profile"} className='block cursor-pointer text-left'>Profile</Link>
                                <button onClick={handleLogout} className='block mt-1 cursor-pointer'>Logout</button>
                            </div>}
                        </div>}

                </div>
            </header>
            <nav className='p-3 w-full bg-gray-900 text-white flex flex-col sm:flex-row justify-center items-center relative'>
                <div className='flex sm:hidden items-center justify-between w-full'>
                    <FontAwesomeIcon icon={faBars} className='text-2xl cursor-pointer' onClick={() => setMenuStatus(!menuStatus)} />
                    {!token ? <Link to={"/login"} className='border rounded-lg p-1.5 hover:text-white hover:bg-black'><button className='font-bold cursor-pointer'><FontAwesomeIcon icon={faUser} className='me-1' />Login</button></Link> :
                        <div className='relative'>
                            <button onClick={() => setDropdownStatus(!dropdownStatus)}><img src={userDetails.profile == "" ? "https://cdn-icons-png.flaticon.com/512/9187/9187604.png" : googlePic ? userDetails.profile : `${serverUrl}/uploads/${userDetails.profile}`} alt="icon" className='w-[40px] aspect-square rounded-[50%] object-cover' /></button>
                            {dropdownStatus && <div className='w-[100px] px-3 py-1 absolute z-20 bg-white text-center text-sm text-black top-[105%] -right-2.5 font-semibold shadow shadow-black'>
                                <Link to={"/profile"} className='block cursor-pointer text-left'>Profile</Link>
                                <button onClick={handleLogout} className='block mt-1 cursor-pointer'>Logout</button>
                            </div>}
                        </div>}
                </div>
                <ul className={menuStatus ? 'sm:flex justify-center text-xl gap-6 text-center absolute top-14 bg-gray-900 w-full z-10 py-4' : 'sm:flex justify-center text-xl gap-6 text-center hidden'}>
                    <li><Link to={"/"} className='cursor-pointer' >Home</Link></li>
                    <li><Link to={"/all-books"} className='cursor-pointer' >Books</Link></li>
                    <li><Link to={"/career"} className='cursor-pointer' >Career</Link></li>
                    <li><Link to={"/contact"} className='cursor-pointer' >Contact</Link></li>
                </ul>
            </nav>
        </>
    )
}

export default Header