import React from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faEye, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getOneBooksApi, makePaymentApi } from '../../services/allApi'
import { useEffect } from 'react'
import { serverUrl } from '../../services/serverURL'
import { loadStripe } from '@stripe/stripe-js';
import { toast, ToastContainer } from 'react-toastify'


const ViewBook = () => {
    const [eyeStatus, setEyeStatus] = useState(false);
    const [token, setToken] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    const [viewBookDetails, setViewBookDetails] = useState("");

    const viewBook = async (id) => {
        const result = await getOneBooksApi(id);
        // console.log(result.data);
        if (result.status == "200") {
            setViewBookDetails(result.data);
        }
    }
    // console.log(viewBookDetails);

    const makePayment = async () => {
        // create an object instance of stripe
        const stripe = await loadStripe('pk_test_51SMjiMRp1gLFff7cGzw43hNMGzm5puKMyocFtpTpHIP8mLKJEZSLnAfy8iMznnaZnQlPp7cGYtxdQoGfhVwHBjow00SmCjh8Oj');

        const reqHeader = {
            "Authorization": `Bearer ${token}`
        };
        const reqBody = viewBookDetails;
        const result = await makePaymentApi(reqBody, reqHeader);
        // console.log(result);
        const checkoutUrl = result?.data?.url;
        if (checkoutUrl) {
            window.location.href = checkoutUrl;
        } else {
            toast.error("Something went wrong.");
        }
    }

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            const tok = sessionStorage.getItem("token");
            setToken(tok);
        }
        viewBook(id);
    }, []);

    return (

        <>
            <Header />
            <main className='grow p-6 relative'>
                <div className='shadow mt-2 w-full p-6 border-gray-300 border'>
                    <button className='ms-auto block cursor-pointer' onClick={() => setEyeStatus(true)}><FontAwesomeIcon icon={faEye} className='text-gray-500' /></button>
                    <div className='grid grid-cols-[1fr_4fr] gap-8'>
                        <img src={viewBookDetails?.imageUrl} alt={viewBookDetails?.title} className='w-full aspect-5/6 object-cover' />
                        <div className='text-center'>
                            <div>
                                <h3 className='text-3xl font-bold'>{viewBookDetails?.title}</h3>
                                <p className='mt-2 text-sm text-gray-500'>- <span className='text-blue-500'>{viewBookDetails?.author}</span></p>
                            </div>
                            <div className='text-left grid grid-cols-3 gap-4 mt-12'>
                                <p>Publisher: <span>{viewBookDetails?.publisher}</span></p>
                                <p>Language: <span>{viewBookDetails?.language}</span></p>
                                <p>No. of Pages: <span>{viewBookDetails?.noOfPages}</span></p>
                                <p>Seller Name: <span>{viewBookDetails?.userName}</span></p>
                                <p>Real Price: <span>{viewBookDetails?.price}</span></p>
                                <p>ISBN: <span>{viewBookDetails?.isbn}</span></p>
                            </div>
                            <p className='text-left mt-12'>{viewBookDetails?.abstract}</p>
                            <div className='mt-10 text-right'>
                                <Link to={"/all-books"}><button className='cursor-pointer bg-blue-700 hover:opacity-75 px-4 py-1 rounded-md text-white me-2'>Back</button></Link>
                                <button className='cursor-pointer bg-green-700 hover:opacity-75 px-4 py-1 rounded-md text-white' type='button' onClick={makePayment}>Buy $<span>{viewBookDetails?.dPrice}</span></button>
                            </div>
                        </div>
                    </div>
                </div>
                {eyeStatus && <div className='absolute top-[50%] left-[50%] transform -translate-[50%] rounded-md shadow-2xl bg-white'>
                    <div className='bg-gray-900 text-white flex justify-between w-full p-6 rounded-t-md'>
                        <span>Book Photos</span><button className='cursor-pointer' onClick={() => setEyeStatus(false)}><FontAwesomeIcon icon={faXmark} /></button>
                    </div>
                    <div className='p-6'>
                        <p className='text-blue-600 mt-2'><FontAwesomeIcon icon={faCamera} /> Camera Click of the book in the hand of the seller</p>
                        <div className='h-[300px] overflow-y-scroll'>
                            {
                                viewBookDetails?.uploadImg?.map((item, index) => (
                                    <img key={index} src={`${serverUrl}/uploads/${item}`} alt={`Book Photo ${index + 1}`} className='w-[240px] aspect-5/6 block mx-auto mt-6' />
                                ))
                            }
                        </div>

                    </div>
                </div>}
            </main>
            <ToastContainer theme='colored' autoClose={2000} position='top-center' />
            <Footer />
        </>
    )
}

export default ViewBook