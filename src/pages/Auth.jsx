import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { googleLoginApi, loginApi, registerApi } from '../services/allApi'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from "jwt-decode"
const Auth = ({ hasAccount }) => {
    // const [hasAccount, setHasAccount] = useState(true);
    const [userDetails, setUserDetails] = useState({
        username: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const handleUserDetails = (e) => {
        const [name, value] = [e.target.name, e.target.value];
        setUserDetails(prev => ({ ...prev, [name]: value }));
    };
    const handleUserRegister = async () => {
        const { username, email, password } = userDetails;
        if (username && email && password) {
            const result = await registerApi({ username, email, password });
            // console.log(result);
            if (result.status == 200) {
                toast.success("Register successful");
                setUserDetails({
                    username: "",
                    email: "",
                    password: ""
                });
                navigate("/login");
            } else if (result.status == 400) {
                toast.warning(result.response.data);
                setUserDetails({
                    username: "",
                    email: "",
                    password: ""
                });
            } else {
                toast.error("Something went wrong");
                setUserDetails({
                    username: "",
                    email: "",
                    password: ""
                });
            }

        } else {
            toast.info("Please fill the form");
        }
    }
    const handleLogin = async () => {
        const { username, password } = userDetails;
        if (username && password) {
            const result = await loginApi({ username, password });
            // console.log(result);
            if (result.status == 200) {
                toast.success("Login Successful");
                sessionStorage.setItem("Existing User", JSON.stringify(result.data.existingUser));
                sessionStorage.setItem("token", result.data.token);
                setTimeout(() => {
                    if (result.data.existingUser.username === "Admin") {
                        navigate("/admin-home");
                    } else {
                        navigate("/");
                    }
                }, 1000);
            } else if (result.status == 401 || result.status == 404) {
                toast.warning(result.response.data);
                setUserDetails({
                    username: "",
                    password: "",
                    email: ""
                });
            } else {
                toast.error(result.response.data);
                setUserDetails({
                    username: "",
                    password: "",
                    email: ""
                });
            }
        } else {
            toast.info("Please fill the forms");
        }
    }

    const handleGoogleLogin = async (credentialResponse) => {
        const details = jwtDecode(credentialResponse.credential);
        // console.log(details);
        const result = await googleLoginApi({ username: details.name, email: details.email, password: "password", photo: details.picture });
        // console.log(result);
        if (result.status == 200) {
            toast.success("Login Successful");
            sessionStorage.setItem("Existing User", JSON.stringify(result.data.existingUser));
            sessionStorage.setItem("token", result.data.token);
            setTimeout(() => {
                if (result.data.existingUser.username === "Admin") {

                    navigate("/admin-home");
                } else {
                    navigate("/");
                }
            }, 1000);
        } else {
            toast.error("Something went wrong");
            setUserDetails({
                username: "",
                password: "",
                email: ""
            });
        }
    };

    return (
        <main id='login__page' className=' h-screen bg-cover grid place-items-center'>
            <div className='transform -translate-y-8'>
                <h1 className='mb-7 text-center text-white text-5xl font-bold'>Bookstore</h1>
                <section className='w-[380px] bg-gray-900 text-center text-white px-8 py-10 rounded-xl shadow'>
                    <h2 className='font-bold text-2xl'>{hasAccount ? "Login" : "Register"}</h2>
                    <div className='p-4 bg-gray-700 w-fit rounded-[50%] mt-4 mx-auto'><FontAwesomeIcon icon={faUser} className='text-2xl' /></div>
                    <form>
                        <input type="text" className='w-full bg-white mt-6 px-2 py-1 rounded-lg text-black outline-0' placeholder='Username' name='username' onChange={handleUserDetails} value={userDetails.username} />
                        {!hasAccount && <input type="email" className='w-full bg-white mt-3 px-2 py-1 rounded-lg text-black outline-0' placeholder='Email' name='email' onChange={handleUserDetails} value={userDetails.email} />}
                        <input type="password" className='w-full bg-white mt-3 px-2 py-1 rounded-lg text-black outline-0' placeholder='Password' name='password' onChange={handleUserDetails} value={userDetails.password} />
                        {hasAccount && <p className='text-xs text-right underline mt-1'>Forgot Password?</p>}
                        {hasAccount ? (<button className='bg-green-700 w-full mt-3 py-1 rounded-lg hover:opacity-75' type='button' onClick={handleLogin}>Login</button>) :
                            (!hasAccount && <button className='bg-green-700 w-full mt-3 py-1 rounded-lg hover:opacity-75' type='button' onClick={handleUserRegister}>Sign In</button>)}
                    </form>
                    {hasAccount ? (<p className='text-xs mt-2'>Don&apos;t have an acoount? <Link to={"/register"} className='text-blue-600 cursor-pointer'>Sign In</Link></p>) :
                        (!hasAccount && <p className='text-xs mt-2'>Already have an account? <Link to={"/login"} className='text-blue-600 cursor-pointer'>Log In</Link></p>)}

                    <p className='my-6 text-sm'>------------------or------------------</p>
                    {/* <div className='bg-white py-1 rounded-lg mt-4'>
                        <span className='text-sm text-black font-medium'>Sign in with google</span><FontAwesomeIcon className='text-blue-700 ms-2' icon={faGoogle} />
                    </div> */}
                    <GoogleLogin width={"315px"}
                        onSuccess={credentialResponse => {
                            // console.log(credentialResponse);
                            handleGoogleLogin(credentialResponse);
                        }}
                        onError={() => {
                            toast.error('Login Failed');
                        }}
                    />
                </section>
            </div>
            <ToastContainer theme='colored' autoClose={2000} position='top-center' />
        </main>
    )
}

export default Auth