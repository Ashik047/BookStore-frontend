import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

const PaymentCancel = () => {
    return (
        <main className='container'>
            <div className='md:grid grid-cols-2 px-20 justify-center items-center flex-col h-screen'>
                <div>
                    <h1 className='md:text-4xl text-blue-800'>Sorry</h1>
                    <p className="my-4 text-2xl">Your payment was unsuccessful</p>
                    <Link to={"/all-books"} className='text-white my-5 hover:bg-white hover:text-blue-800 bg-blue-800 px-4 py-3 hover:border hover:border-blue-800 mt-1 rounded-md inline-block'><FontAwesomeIcon icon={faBackward} /> We apologice for your inconvienence</Link>
                </div>
                <div className='flex justify-center items-center'>
                    <img src="https://tse3.mm.bing.net/th/id/OIP.Cj9ARdjBcMj57lUpgEe8fQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" alt="Payment Error" className='w-full' />
                </div>
            </div>
        </main>
    )
}

export default PaymentCancel